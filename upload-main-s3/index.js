const express = require("express");
const { MulterError } = require("multer");
const multer = require("multer");
const { s3Uploadv2, s3Uploadv3 } = require("./s3Service");
const app = express();
const uuid = require("uuid").v4;
require("dotenv").config();
// uploading a single file
// const upload = multer({ dest: "uploads" });

// app.post("/upload", upload.single("file"), (req, res) => {
//   res.json({ status: "success" });
// });

// uploading multiple file
// const upload = multer({ dest: "uploads" });
// app.post("/upload", upload.array("file", 2), (req, res) => {
//   res.json({ status: "success" });
// });

// multiple fields upload
// const upload = multer({ dest: "uploads" });
// const multipUpload = upload.fields([
//   { name: "avatar", maxCount: 1 },
//   { name: "resume", maxCount: 1 },
// ]);
// app.post("/upload", multipUpload, (req, res) => {
//   console.log(req.files);
//   res.json({ status: "success" });
// });

// customize file names
// const storage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     cb(null, "uploads");
//   },
//   filename: (req, file, cb) => {
//     const { originalname } = file;
//     cb(null, `${uuid()}-${originalname}`);
//   },
// });

const storage = multer.memoryStorage();

const fileFilter = (req, file, cb) => {
  if (file.mimetype.split("/")[0] === "image") {
    cb(null, true);
  } else {
    cb(new MulterError("LIMIT_UNEXPECTED_FILE"), false);
  }
};
//uuid-originalName
const upload = multer({
  storage,
  fileFilter,
  limits: { fileSize: 1000000000, files: 2 },
});
// app.post("/upload", upload.array("file"), async (req, res) => {
//   try {
//     const results = await s3Uploadv2(req.files);
//     res.json({ status: "success", results });
//     console.log(results);
//   } catch (error) {
//     console.log(error);
//   }
// });

app.post("/upload", upload.array("file"), async (req, res) => {
  try {
    const results = await s3Uploadv3(req.files);
    res.json({ status: "success", results });
    console.log(results);
  } catch (error) {
    console.log(error);
  }
});

// middleware for multer errors
app.use((error, req, res, next) => {
  if (error instanceof multer.MulterError) {
    if (error.code === "LIMIT_FILE_SIZE") {
      return res.status(400).json({ message: "File is to large" });
    }
    if (error.code === "LIMIT_FILE_COUNT") {
      return res.status(400).json({ message: "File limit riched" });
    }
    if (error.code === "LIMIT_UNEXPECTED_FILE") {
      return res.status(400).json({ message: "File must me an image" });
    }
  }
});
app.listen(4000, () => {
  console.log("listening on port 4000");
});
