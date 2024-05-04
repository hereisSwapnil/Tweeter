const Router = require("express");
const {
  register,
  login,
  getUser,
  logout,
  followUnfollowUser,
  updateUser,
  getUserProfile,
} = require("../controllers/user.controller");
const protectRoute = require("../middlewares/protectRoute");

const router = Router();

router.post("/register", register);

router.post("/login", login);

router.get("/get", getUser);

router.get("/logout", logout);

router.post("/follow-unfollow/:id", protectRoute, followUnfollowUser);

router.post("/update", protectRoute, updateUser);

router.get("/:username", getUserProfile);

module.exports = router;
