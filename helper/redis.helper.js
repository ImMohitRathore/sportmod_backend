const redis = require("redis");

// Create a Redis client
const client = redis.createClient({
  url: "redis://localhost:6379", // Replace with your Redis server URL
});

// Connect to Redis
client
  .connect()
  .then(() => {
    console.log("Connected to Redis!");
  })
  .catch((err) => {
    console.error("Redis connection error:", err);
  });

// Handle errors
client.on("error", (err) => {
  console.error("Redis error:", err);
});
