const User = require("../models/user.model");

const getNotifications = async (req, res) => {
  try {
    const userId = req.user._id;

    // Fetch the user and populate notifications
    const user = await User.findById(userId)
      .sort({ "notifications.createdAt": -1 })
      .populate({
        path: "notifications.userId",
        select: "username profilePicture",
      })
      .populate({
        path: "notifications.postId",
        select: "content",
      });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const sortedNotifications = user.notifications.sort((a, b) => {
      return new Date(b.createdAt) - new Date(a.createdAt);
    });

    // Send the response immediately
    res.status(200).json(sortedNotifications);

    // Update the notifications as "read" after 60 seconds
    setTimeout(async () => {
      try {
        await User.updateOne(
          { _id: userId },
          { $set: { "notifications.$[elem].read": true } },
          { arrayFilters: [{ "elem.read": false }] }
        );
      } catch (error) {
        console.error("Error updating notifications: ", error);
      }
    }, 20000);
  } catch (error) {
    console.error("Error in getNotifications: ", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = { getNotifications };
