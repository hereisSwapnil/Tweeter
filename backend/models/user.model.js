const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: "Name is required",
      trim: true,
    },
    email: {
      type: String,
      required: "Email is required",
      trim: true,
      unique: true,
    },
    username: {
      type: String,
      required: "Username is required",
      trim: true,
      unique: true,
    },
    password: {
      type: String,
      minLength: [6, "Password must be at least 6 characters long"],
      required: "Password is required",
    },
    profilePicture: {
      type: String,
    },
    followers: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
    following: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
    bio: {
      type: String,
      default: "",
    },
  },
  {
    timestamps: true,
  }
);

const User = mongoose.model("User", userSchema);

module.exports = User;
