// Firebase Server Key (Get it from Firebase Console -> Project Settings -> Cloud Messaging)
const SERVER_KEY = "YOUR_FIREBASE_SERVER_KEY_HERE"; // Replace with your FCM Server Key

/**
 * Sends a notification using Firebase Cloud Messaging (FCM)
 * @param {string} deviceToken - The device token to send the notification to
 * @param {Object} notification - Notification content (title, body)
 * @param {Object} data - Additional data payload (optional)
 * @returns {Promise<Object>} - Returns FCM response
 */
const sendNotification = async (deviceToken, notification, data = {}) => {
  try {
    const payload = {
      to: deviceToken,
      notification: {
        title: notification.title,
        body: notification.body,
        sound: "default", // Notification sound
        click_action: notification.clickAction || "FCM_PLUGIN_ACTIVITY", // Optional action
      },
      data: data, // Custom data payload
    };

    const response = await fetch("https://fcm.googleapis.com/fcm/send", {
      method: "POST",
      headers: {
        Authorization: `key=${SERVER_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error("Failed to send notification:", errorData);
      throw new Error(errorData.error || "Failed to send notification");
    }

    const responseData = await response.json();
    console.log("Notification sent successfully:", responseData);
    return responseData;
  } catch (error) {
    console.error("Error sending notification:", error.message);
    throw error;
  }
};

module.exports = { sendNotification };
