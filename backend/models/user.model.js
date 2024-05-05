const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: "First name is required",
      trim: true,
    },
    lastName: {
      type: String,
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
      default:
        "https://imgs.search.brave.com/JEX9wCQXli3FBPaH-FVW0FoTwFLn_d8-O_HCM5FEGU8/rs:fit:860:0:0/g:ce/aHR0cHM6Ly90d2ly/cHouZmlsZXMud29y/ZHByZXNzLmNvbS8y/MDE1LzA2L3R3aXR0/ZXItYXZpLWdlbmRl/ci1iYWxhbmNlZC1m/aWd1cmUucG5nP3c9/MTI4MA",
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
