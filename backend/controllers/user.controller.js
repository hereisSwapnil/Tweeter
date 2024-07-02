const User = require("../models/user.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const getUserProfile = async (req, res) => {
  try {
    const { username } = req.params;
    console.log(username);
    const user = await User.findOne({ username }).select(
      "-password -__v -updatedAt"
    );
    if (user) {
      res.status(200).json(user);
    } else {
      res.status(404).json({ message: "User not found" });
    }
  } catch (error) {
    console.log(`Error during get user profile: ${error.message}`);
    res.status(500).json({ message: error.message });
  }
};

const register = async (req, res) => {
  try {
    const { firstName, lastName, email, username, password } = req.body;
    if (!firstName || !email || !username || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }
    const user = await User.findOne({ $or: [{ email }, { username }] });
    if (user) {
      return res.status(400).json({ message: "User already exists" });
    }
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    const newUser = new User({
      firstName,
      lastName,
      email,
      username,
      password: hashedPassword,
    });
    await newUser.save();
    if (newUser) {
      const token = jwt.sign({ _id: newUser._id }, process.env.JWT_SECRET, {});
      res.cookie("token", token, { httpOnly: true, secure: true });

      res.status(201).json({
        _id: newUser._id,
        token,
      });
    } else {
      res.status(400).json({ message: "Invalid user data" });
    }
  } catch (error) {
    console.error(`Error during register user: ${error.message}`);
    res.status(500).json({ message: error.message });
  }
};

const login = async (req, res) => {
  try {
    const { username, password } = req.body;
    if (!username || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(400).json({ message: "User does not exist" });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }
    const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET, {});
    res.cookie("token", token, { httpOnly: true, secure: true });
    res.status(200).json({
      _id: user._id,
      token,
    });
  } catch (error) {
    console.error(`Error during login user: ${error.message}`);
    res.status(500).json({ message: error.message });
  }
};

const getUser = async (req, res) => {
  try {
    const token =
      req.cookies.token ||
      (req.headers.authorization && req.headers.authorization.split(" ")[1]);
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    if (!decoded) {
      return res.status(401).json({ message: "Unauthorized" });
    }
    const user = await User.findById(decoded._id).select("-password");
    if (user) {
      res.status(200).json(user);
    } else {
      res.status(404).json({ message: "User not found" });
    }
  } catch (error) {
    console.error(`Error during get user: ${error.message}`);
    res.status(500).json({ message: error.message });
  }
};

const logout = (req, res) => {
  res.clearCookie("token");
  res.status(200).json({ message: "Logged out" });
};

const followUnfollowUser = async (req, res) => {
  try {
    const { id } = req.params;
    const currentUser = req.user;
    const userToFollow = await User.findById(id);
    if (id === currentUser._id) {
      return res.status(400).json({ message: "You can't follow yourself" });
    }
    if (!userToFollow || !currentUser) {
      return res.status(404).json({ message: "User not found" });
    }
    if (currentUser.following.includes(id)) {
      await currentUser.updateOne({ $pull: { following: id } });
      await userToFollow.updateOne({
        $pull: {
          followers: currentUser._id,
        },
      });
      return res.status(201).json({ message: "User unfollowed" });
    } else {
      await currentUser.updateOne({ $push: { following: id } });
      await userToFollow.updateOne({
        $push: {
          followers: currentUser._id,
        },
      });
      return res.status(201).json({ message: "User followed" });
    }
  } catch (error) {
    console.log(`Error during follow/unfollow user: ${error.message}`);
    res.status(500).json({ message: error.message });
  }
};

const updateUser = async (req, res) => {
  try {
    const { name, email, username, bio } = req.body;
    const userId = req.user._id;
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    if (name) user.name = name;
    if (email) user.email = email;
    if (username) user.username = username;
    if (req.file) user.profilePicture = req.file.path;
    if (bio) user.bio = bio;
    await user.save();
    res.status(200).json({ message: "User updated" });
  } catch (error) {
    console.error(`Error during update user: ${error.message}`);
    res.status(500).json({ message: error.message });
  }
};

const getUserFollowers = async (req, res) => {
  try {
    const { id } = req.params;
    if (id != req.user._id) {
      return res.status(401).json({ message: "Unauthorized" });
    }
    const user = await User.findById(id).populate(
      "followers",
      "-password -__v -updatedAt -email -bio -followers -following -createdAt -firstName -lastName"
    );
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json(user.followers);
  } catch (error) {
    console.error(`Error during get user followers: ${error.message}`);
    res.status(500).json({ message: error.message });
  }
};

const getUserFollowing = async (req, res) => {
  try {
    const { id } = req.params;
    if (id != req.user._id) {
      return res.status(401).json({ message: "Unauthorized" });
    }
    const user = await User.findById(id).populate(
      "following",
      "-password -__v -updatedAt -email -bio -followers -following -createdAt -firstName -lastName"
    );
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json(user.following);
  } catch (error) {
    console.error(`Error during get user following: ${error.message}`);
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  register,
  login,
  getUser,
  logout,
  followUnfollowUser,
  updateUser,
  getUserProfile,
  getUserFollowers,
  getUserFollowing,
};
