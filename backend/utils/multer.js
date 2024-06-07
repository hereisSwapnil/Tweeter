const multer = require("multer");
const storage = require("./cloudinary.js");

const upload = multer({ storage });

module.exports = upload;
