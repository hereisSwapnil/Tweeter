const Router = require("express");
const {
  register,
  login,
  getUser,
  logout,
  followUnfollowUser,
  updateUser,
  getUserProfile,
  getUserFollowers,
  getUserFollowing,
} = require("../controllers/user.controller");
const protectRoute = require("../middlewares/protectRoute");
const upload = require("../utils/multer");

const router = Router();

router.post("/register", register);

router.post("/login", login);

router.get("/get", getUser);

router.get("/logout", logout);

router.post("/follow-unfollow/:id", protectRoute, followUnfollowUser);

router.post("/update", upload.single("image"), protectRoute, updateUser);

router.get("/:username", getUserProfile);

router.get("/followers/:id", protectRoute, getUserFollowers);

router.get("/following/:id", protectRoute, getUserFollowing);

module.exports = router;
