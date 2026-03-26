const express = require("express");
const cors = require("cors");
const multer = require("multer");
const morgan = require("morgan");
require("dotenv").config();

const app = express();

// middleware
app.use(cors());
app.use(morgan("dev"));

// storage config
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

// multer upload
const upload = multer({ storage: storage });

// route
app.post("/api/upload", upload.single("file"), (req, res) => {
  console.log(req.file); // VERY IMPORTANT (for checking)

  res.json({
    message: "File uploaded successfully",
  });
});

// start server
const PORT = process.env.PORT || 8000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});