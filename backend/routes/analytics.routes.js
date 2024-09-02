const Router = require("express");
const protectRoute = require("../middlewares/protectRoute");
const { getAnalytics } = require("../controllers/analytics.controller");

const router = Router();

router.get("", protectRoute, getAnalytics);

module.exports = router;
