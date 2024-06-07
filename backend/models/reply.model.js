const mongoose = require("mongoose");

const replySchema = new mongoose.Schema(
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
    replies: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Reply",
      },
    ],
  },
  {
    timestamps: true,
  }
);

const Reply = mongoose.model("Reply", replySchema);

module.exports = Reply;
