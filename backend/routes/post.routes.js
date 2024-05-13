const Router = require("express");
const protectRoute = require("../middlewares/protectRoute");
const {
  createPost,
  getPost,
  deletePost,
  likeUnlikePost,
  replyPost,
  getFeed,
  getPostsByUser,
  getRepliesByUser,
} = require("../controllers/post.controller");
const router = Router();

router.post("/", protectRoute, createPost);

router.get("/:id", protectRoute, getPost);

router.delete("/:id", protectRoute, deletePost);

router.get("/like/:id", protectRoute, likeUnlikePost);

router.post("/reply/:id", protectRoute, replyPost);

router.get("/feed/:id", protectRoute, getFeed);

router.get("/user/:id", protectRoute, getPostsByUser);

router.get("/user/replies/:id", protectRoute, getRepliesByUser);

module.exports = router;
