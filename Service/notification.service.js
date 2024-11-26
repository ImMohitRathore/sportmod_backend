const notificationModel = require("../Model/notification.model");
const { paginate } = require("../helper");

exports.getNotification = async (req, res) => {
  const { page, limit } = req.query;

  const userId = req.params?.id;
  console.log("ddd", userId);

  const pipeline = [
    { $match: { userId: userId } },
    {
      $addFields: {
        fromId: {
          $convert: {
            input: "$fromId",
            to: "objectId",
            onError: "$fromId",
            onNull: "$fromId",
          },
        },
      },
    },

    {
      $lookup: {
        from: "users", // Collection name for users
        localField: "fromId", // Field in Notifications
        foreignField: "_id", // Field in Users
        as: "fromUser", // Alias for joined data
      },
    },
    { $unwind: "$fromUser" },
    {
      $project: {
        _id: 1,
        type: 1,
        message: 1,
        sourceId: 1,
        seenStatus: 1,
        countStatus: 1,
        "fromUser.fname": 1,
        "fromUser.lname": 1,
        "fromUser.profile": 1,
      },
    },
  ];

  try {
    const paginatedUsers = await paginate(notificationModel, pipeline, {
      page,
      limit,
    });

    res.status(200).json(paginatedUsers);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.addNotification = async (req, res) => {
  const { userId, fromId, type, message, sourceId } = req.body;

  // Input validation
  if (!userId || !fromId || !type || !message) {
    return res.status(400).json({
      message:
        "Missing required fields: userId, fromId, type, and message are mandatory.",
    });
  }

  try {
    // Create a new notification document
    const newNotification = new notificationModel({
      userId,
      fromId,
      type,
      message,
      sourceId,
      seenStatus: false, // Default value
      countStatus: true, // Default value
    });

    // Save to database
    const savedNotification = await newNotification.save();

    // Respond with success
    res.status(201).json({
      message: "Notification created successfully",
      data: savedNotification,
    });
  } catch (err) {
    console.error("Error adding notification:", err);
    res.status(500).json({
      message: "An error occurred while adding the notification",
      error: err.message,
    });
  }
};
