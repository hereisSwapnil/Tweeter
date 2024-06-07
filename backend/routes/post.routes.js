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
  likeUnlikeReply,
  replyOnaReply,
  getRepliesOfaReply,
} = require("../controllers/post.controller");
const upload = require("../utils/multer");
const router = Router();

router.post(
  "/",
  protectRoute,
  upload.single("image"),
  (req, res, next) => {
    console.log("OKOKOK");
    next();
  },
  createPost
);

router.get("/:id", protectRoute, getPost);

router.delete("/:id", protectRoute, deletePost);

router.get("/like/:id", protectRoute, likeUnlikePost);

router.post("/reply/:id", protectRoute, replyPost);

router.get("/feed/:id", protectRoute, getFeed);

router.get("/user/:id", protectRoute, getPostsByUser);

router.get("/user/replies/:id", protectRoute, getRepliesByUser);

router.get("/reply/like/:replyId", protectRoute, likeUnlikeReply);

router.post("/reply/reply/:replyId", protectRoute, replyOnaReply);

router.get("/reply/replies/:replyId", protectRoute, getRepliesOfaReply);

module.exports = router;
