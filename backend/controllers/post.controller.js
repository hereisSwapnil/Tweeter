const Post = require("../models/post.model");
const User = require("../models/user.model");
const { getUserProfile } = require("./user.controller");

const createPost = async (req, res) => {
  try {
    const { content, image } = req.body;
    const { _id } = req.user;
    const user = await User.findById(_id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    if (!content && !image) {
      return res.status(400).json({ message: "Content or image is required" });
    }
    content_ = content ? content : "";
    image_ = image ? image : "";
    const newPost = new Post({
      content: content_,
      image: image_,
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
    const post = await Post.findById(id).populate("postedBy", "username name");
    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }
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
    if (post.likes.includes(_id)) {
      post.likes = post.likes.filter(
        (like) => like.toString() !== _id.toString()
      );
    } else {
      post.likes.push(_id);
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
    const user = await User.findById(_id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    if (!content) {
      return res.status(400).json({ message: "Text is required" });
    }
    const newReply = {
      username: user.username,
      UserProfileImage: user.profilePicture,
      content,
      repliedBy: _id,
    };
    post.replies.push(newReply);
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
    const feed = await Post.find({ postedBy: { $in: following } })
      .sort({ createdAt: -1 })
      .populate("postedBy", "username name profilePicture");
    res.status(200).json(feed);
  } catch (error) {
    console.log("Error in getFeed: ", error);
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
};
