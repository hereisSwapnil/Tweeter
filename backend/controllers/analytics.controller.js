const Post = require("../models/post.model");
const User = require("../models/user.model");

const getAnalytics = async (req, res) => {
  try {
    const userId = req.user._id;

    const postCount = await Post.countDocuments({ postedBy: userId });

    const likeCount = await Post.aggregate([
      {
        $match: { postedBy: userId },
      },
      {
        $project: {
          totalLikes: { $size: "$likes" },
        },
      },
      {
        $group: {
          _id: null,
          totalLikes: { $sum: "$totalLikes" },
        },
      },
    ]);

    const followerCount = await User.findById(userId).select("followers");

    const last7Days = new Date();
    last7Days.setDate(last7Days.getDate() - 7);
    last7Days.setHours(0, 0, 0, 0);

    const interactionsData = await Post.aggregate([
      {
        $match: {
          postedBy: userId,
          createdAt: { $gte: last7Days },
        },
      },
      {
        $project: {
          day: { $dayOfMonth: "$createdAt" },
          totalLikes: { $size: { $ifNull: ["$likes", []] } }, // Ensure 'likes' is an array
          totalComments: { $size: { $ifNull: ["$replies", []] } }, // Ensure 'replies' is an array
        },
      },
      {
        $group: {
          _id: "$day",
          totalLikes: { $sum: "$totalLikes" },
          totalComments: { $sum: "$totalComments" },
        },
      },
      {
        $sort: { _id: 1 }, // Sort by day in ascending order
      },
    ]);

    // Ensure all 7 days are represented in the interactions data
    const interactions = [];
    for (let i = 1; i < 8; i++) {
      const currentDay = new Date(last7Days);
      currentDay.setDate(last7Days.getDate() + i);
      currentDay.setHours(0, 0, 0, 0);
      const day = currentDay.getDate();

      const interaction = interactionsData.find((d) => d._id === day);
      interactions.push({
        day: currentDay.toLocaleDateString("en-US", {
          weekday: "short",
          day: "numeric",
        }),
        totalLikes: interaction ? interaction.totalLikes : 0,
        totalComments: interaction ? interaction.totalComments : 0,
      });
    }

    res.status(200).json({
      postCount,
      likeCount: likeCount.length ? likeCount[0].totalLikes : 0,
      followerCount: followerCount ? followerCount.followers.length : 0,
      interactions,
    });
  } catch (error) {
    console.error("Error fetching analytics: ", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = { getAnalytics };
