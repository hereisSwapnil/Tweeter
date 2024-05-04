const connectDB = require("./db/index");
const app = require("./app");

connectDB()
  .then(() => {
    app.listen(process.env.PORT || 8000, () => {
      console.log(`Server is running 🚀 on port ${process.env.PORT || 8000}`);
    });
  })
  .catch((error) => {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  });
