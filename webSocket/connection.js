const WebSocket = require("ws");
const redis = require("redis");

// Create Redis clients for publishing and subscribing
const redisPublisher = redis.createClient();
const redisSubscriber = redis.createClient();

// Connect to Redis
(async () => {
  try {
    await redisPublisher.connect();
    await redisSubscriber.connect();
    console.log("Connected to Redis");
  } catch (err) {
    console.error("Error connecting to Redis:", err);
  }
})();

// Map to store connected clients (userId -> socket)
const clients = new Map();

// Initialize WebSocket server
const initializeWebSocket = (server) => {
  const wss = new WebSocket.Server({ server });

  console.log("WebSocket server started");

  wss.on("connection", (ws, req) => {
    console.log("New client connected");

    // Extract userId from query params or headers
    const userId = req.url.split("?userId=")[1];
    if (!userId) {
      ws.close();
      return;
    }

    // Store the connection
    clients.set(userId, ws);

    // Listen for incoming messages from the client
    ws.on("message", (message) => {
      console.log(`Message from user ${userId}:`, message);
    });

    // Handle disconnection
    ws.on("close", () => {
      console.log(`User ${userId} disconnected`);
      clients.delete(userId);
    });
  });

  // Redis Subscriber listens for events
  redisSubscriber.subscribe("notifications", (err, count) => {
    if (err) console.error("Redis subscription error:", err);
    console.log(`Subscribed to ${count} Redis channels.`);
  });

  redisSubscriber.on("message", (channel, message) => {
    console.log(`Received message from Redis [${channel}]:`, message);

    // Broadcast to specific user
    const { userId, notification } = JSON.parse(message);
    const userSocket = clients.get(userId);
    if (userSocket && userSocket.readyState === WebSocket.OPEN) {
      userSocket.send(JSON.stringify(notification));
    }
  });
};

// Function to publish a notification
const publishNotification = async (userId, notification) => {
  try {
    console.log("Publishing notification to Redis:", { userId, notification });

    // Publish to Redis channel
    await redisPublisher.publish(
      "notifications", // Redis channel
      JSON.stringify({ userId, notification })
    );

    // Check if user is connected via WebSocket
    const userSocket = clients.get(userId);
    console.log("User Socket:", userSocket, clients);

    if (userSocket && userSocket.readyState === WebSocket.OPEN) {
      // If user is online, send notification real-time via WebSocket
      console.log(
        "Sending real-time notification via WebSocket:",
        notification
      );
      userSocket.send(JSON.stringify(notification));
    } else {
      // If user is offline, queue notification in Redis for later delivery
      console.log(`User ${userId} is offline. Notification queued in Redis.`);

      // Add notification to Redis queue with TTL (Time to Live)
      const ttl = 604800; // TTL for 1 week (7 days in seconds)
      const notificationData = JSON.stringify(notification);
      await redisPublisher.lPush(
        `notifications:queue:${userId}`,
        notificationData
      );
      await redisPublisher.expire(`notifications:queue:${userId}`, ttl); // Set TTL for 1 week
    }
  } catch (err) {
    console.error("Error publishing notification:", err);
  }
};

module.exports = { initializeWebSocket, publishNotification };
