const mongoose = require("mongoose");

const postSchema = new mongoose.Schema(
  {
    postedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: "Posted by is required",
    },
    content: {
      type: String,
      maxLength: [500, "Content must be at most 500 characters long"],
      required: "Content is required",
    },
    images: [
      {
        url: {
          type: String,
          required: "Image is required",
        },
        filepath: {
          type: String,
          required: "Public id is required",
        },
      },
    ],
    likes: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
    replies: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Reply",
      },
    ],
    views: {
      type: Number,
      default: 0,
    },
    uniqueEngagements: [
      {
        userId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "User",
        },
        engagementType: {
          type: String,
          enum: ["like", "reply"],
        },
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
