const User = require("../models/user.model");
const jwt = require("jsonwebtoken");

const protectRoute = async (req, res, next) => {
  try {
    const token =
      req.cookies.token ||
      (req.headers.authorization && req.headers.authorization.split(" ")[1]);
    console.log(`Token: ${token}`);
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    if (!decoded) {
      return res.status(401).json({ message: "Unauthorized" });
    }
    const user = await User.findById(decoded._id).select("-password");
    if (user) {
      req.user = user;
      next();
    } else {
      res.status(404).json({ message: "User not found" });
    }
  } catch (error) {
    console.log(`Error during user authentication: ${error.message}`);
    res.status(500).json({ message: error.message });
  }
};

module.exports = protectRoute;
