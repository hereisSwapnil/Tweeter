const Router = require("express");
const { getNotifications } = require("../controllers/notification.controller");
const protectRoute = require("../middlewares/protectRoute");

const router = Router();

router.get("", protectRoute, getNotifications);

module.exports = router;
