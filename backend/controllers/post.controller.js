const Post = require("../models/post.model");
const Reply = require("../models/reply.model");
const User = require("../models/user.model");

const createPost = async (req, res) => {
  try {
    const { content } = req.body;
    const { _id } = req.user;
    const user = await User.findById(_id);
    if (user?.isGuest) {
      return res.status(400).json({ message: "Guest users can't post" });
    }
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    if (!content && !req.files.length) {
      return res
        .status(400)
        .json({ message: "Content or images are required" });
    }

    const content_ = content ? content : "";
    const images_ = req.files.map((file) => ({
      url: file.path,
      filepath: file.filename,
    }));

    const newPost = new Post({
      content: content_,
      images: images_,
      postedBy: _id,
    });

    await newPost.save();
    res.status(200).json({ newPost, message: "Post created successfully" });
  } catch (error) {
    console.log("Error in createPost: ", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const getPost = async (req, res) => {
  try {
    const { id } = req.params;
    const post = await Post.findById(id)
      .populate("postedBy", "username name profilePicture")
      .populate("replies")
      .populate({
        path: "replies",
        populate: {
          path: "repliedBy",
          select: "username name profilePicture",
        },
      });

    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }

    post.views += 1;
    await post.save();

    res.status(200).json(post);
  } catch (error) {
    console.log("Error in getPost: ", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const deletePost = async (req, res) => {
  try {
    const { id } = req.params;
    const post = await Post.findById(id);
    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }
    if (post.postedBy.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: "Unauthorized" });
    }
    await Post.findByIdAndDelete(id);
    res.status(200).json({ message: "Post deleted successfully" });
  } catch (error) {
    console.log("Error in deletePost: ", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const likeUnlikePost = async (req, res) => {
  try {
    const { id } = req.params;
    const post = await Post.findById(id);
    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }
    const { _id } = req.user;
    if (req.user?.isGuest) {
      return res.status(400).json({ message: "Guest users can't like" });
    }
    if (post.likes.includes(_id)) {
      post.likes = post.likes.filter(
        (like) => like.toString() !== _id.toString()
      );
      post.uniqueEngagements = post.uniqueEngagements.filter(
        (engagement) =>
          !(
            engagement.userId.toString() === _id.toString() &&
            engagement.engagementType === "like"
          )
      );
    } else {
      post.likes.push(_id);
      if (post.postedBy.toString() !== _id.toString()) {
        await User.findByIdAndUpdate(post.postedBy, {
          $push: {
            notifications: {
              type: "like",
              postId: post._id,
              userId: _id,
            },
          },
        });
      }
      post.uniqueEngagements.push({
        userId: _id,
        engagementType: "like",
      });
    }
    await post.save();
    res.status(200).json({ message: "Post liked/unliked successfully" });
  } catch (error) {
    console.log("Error in likeUnlikePost: ", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const replyPost = async (req, res) => {
  try {
    const { content } = req.body;
    const { id } = req.params;
    const post = await Post.findById(id);
    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }
    const { _id } = req.user;
    if (req.user?.isGuest) {
      return res.status(400).json({ message: "Guest users can't reply" });
    }
    const user = await User.findById(_id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    if (!content) {
      return res.status(400).json({ message: "Text is required" });
    }
    const newReply = new Reply({
      content,
      repliedBy: _id,
    });
    post.replies.push(newReply);

    post.uniqueEngagements.push({
      userId: _id,
      engagementType: "reply",
    });

    if (post.postedBy.toString() !== _id.toString()) {
      await User.findByIdAndUpdate(post.postedBy, {
        $push: {
          notifications: {
            type: "comment",
            postId: post._id,
            userId: _id,
          },
        },
      });
    }

    await newReply.save();
    await post.save();
    res.status(200).json({ message: "Reply posted successfully" });
  } catch (error) {
    console.log("Error in replyPost: ", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const getFeed = async (req, res) => {
  try {
    const { _id } = req.user;
    const id = req.params.id;
    const user = await User.findById(_id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    if (_id.toString() !== id.toString()) {
      return res.status(403).json({ message: "Unauthorized" });
    }
    const following = user.following;
    let feed = [];
    if (req.user?.isGuest) {
      feed = await Post.find({})
        .sort({ createdAt: -1 })
        .populate("postedBy", "username name profilePicture")
        .populate({
          path: "replies",
          populate: {
            path: "repliedBy",
            select: "username name profilePicture",
          },
        });
    } else {
      feed = await Post.find({ postedBy: { $in: following } })
        .sort({ createdAt: -1 })
        .populate("postedBy", "username name profilePicture")
        .populate({
          path: "replies",
          populate: {
            path: "repliedBy",
            select: "username name profilePicture",
          },
        });
    }
    if (feed.length === 0) {
      feed = await Post.find({ postedBy: _id })
        .sort({ createdAt: -1 })
        .populate("postedBy", "username name profilePicture")
        .populate({
          path: "replies",
          populate: {
            path: "repliedBy",
            select: "username name profilePicture",
          },
        });
    }
    res.status(200).json(feed);
  } catch (error) {
    console.log("Error in getFeed: ", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const getPostsByUser = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    const posts = await Post.find({ postedBy: id })
      .sort({ createdAt: -1 })
      .populate("postedBy", "username name profilePicture")
      .populate({
        path: "replies",
        populate: {
          path: "repliedBy",
          select: "username name profilePicture",
        },
      });

    res.status(200).json(posts);
  } catch (error) {
    console.log("Error in getPostsByUser: ", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const getRepliesByUser = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id);
    if (user?.isGuest) {
      return res
        .status(400)
        .json({ message: "Guest users can't view replies" });
    }
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    const posts = await Post.find({}).populate("replies");
    const posts_ = posts.filter((post) => {
      return post.replies.filter((reply) => reply.repliedBy.toString() === id);
    });

    // .sort({ createdAt: -1 })
    // .populate("postedBy", "username name profilePicture")
    // .populate("replies.repliedBy", "profilePicture");
    // console.log(posts_);
    res.status(200).json(posts_);
  } catch (error) {
    console.log("Error in getPostsByUser: ", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const likeUnlikeReply = async (req, res) => {
  try {
    const { replyId } = req.params;
    const reply = await Reply.findById(replyId);
    if (!reply) {
      return res.status(404).json({ message: "Reply not found" });
    }
    const { _id } = req.user;
    if (req.user?.isGuest) {
      return res.status(400).json({ message: "Guest users can't like" });
    }
    if (reply.likes.includes(_id)) {
      reply.likes = reply.likes.filter(
        (like) => like.toString() !== _id.toString()
      );
    } else {
      reply.likes.push(_id);
    }
    await reply.save();
    res.status(200).json({ message: "Reply liked/unliked successfully" });
  } catch (error) {
    console.log("Error in likeUnlikeReply: ", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const replyOnaReply = async (req, res) => {
  try {
    const { content } = req.body;
    const { replyId } = req.params;

    const reply = await Reply.findById(replyId).populate("replies");

    if (!reply) {
      return res.status(404).json({ message: "Reply not found" });
    }

    if (!content) {
      return res.status(400).json({ message: "Content is required" });
    }

    if (req.user?.isGuest) {
      return res.status(400).json({ message: "Guest users can't reply" });
    }

    const newReply = new Reply({
      content,
      repliedBy: req.user._id,
    });

    reply.replies.push(newReply);

    const post = await Post.findOne({ replies: reply._id });
    if (post) {
      post.uniqueEngagements.push({
        userId: req.user._id,
        engagementType: "reply",
      });
      await post.save();
    }

    await newReply.save();
    await reply.save();

    res.status(200).json({ message: "Reply posted successfully" });
  } catch (error) {
    console.error("Error in replyOnaReply: ", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const getRepliesOfaReply = async (req, res) => {
  try {
    const { replyId } = req.params;
    if (req.user?.isGuest) {
      return res
        .status(400)
        .json({ message: "Guest users can't view replies" });
    }
    const reply = await Reply.findById(replyId).populate({
      path: "replies",
      populate: {
        path: "repliedBy",
        select: "username name profilePicture",
      },
    });
    if (!reply) {
      return res.status(404).json({ message: "Reply not found" });
    }
    res.status(200).json(reply.replies);
  } catch (error) {
    console.error("Error in getRepliesOfaReply: ", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = {
  createPost,
  getPost,
  deletePost,
  likeUnlikePost,
  replyPost,
  getFeed,
  getPostsByUser,
  getRepliesByUser,
  likeUnlikeReply,
  replyOnaReply,
  getRepliesOfaReply,
};
