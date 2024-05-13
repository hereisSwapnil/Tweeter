const mongoose = require("mongoose");

const postSchema = new mongoose.Schema(
  {
    postedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    content: {
      type: String,
      maxLength: [500, "Content must be at most 500 characters long"],
      required: "Content is required",
    },
    image: {
      type: String,
    },
    likes: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
    replies: [
      {
        content: {
          type: String,
          maxLength: [500, "Reply must be at most 500 characters long"],
          required: "Reply is required",
        },
        repliedBy: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "User",
        },
        likes: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
        createdAt: {
          type: Date,
          default: Date.now,
        },
      },
    ],
  },
  {
    timestamps: true,
  }
);

const Post = mongoose.model("Post", postSchema);

module.exports = Post;
