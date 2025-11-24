const express = require("express");
const app = express();
const cookieParser = require("cookie-parser");
const cors = require("cors");
const methodOverride = require("method-override");

const connectDB = require("./db/index");

app.use(cors({ origin: process.env.ORIGIN, credentials: true }));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(methodOverride("_method"));

// Middleware to ensure DB connection
app.use(async (req, res, next) => {
  await connectDB();
  next();
});

app.get("/", (req, res) => {
  res.send("Server is running 🚀");
});

userRouter = require("./routes/user.routes");
app.use("/api/user", userRouter);

postRouter = require("./routes/post.routes");
app.use("/api/post", postRouter);

notificationRouter = require("./routes/notification.routes");
app.use("/api/notifications", notificationRouter);

analyticsRouter = require("./routes/analytics.routes");
app.use("/api/analytics", analyticsRouter);

module.exports = app;
