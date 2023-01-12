const express = require("express");
require("dotenv").config();
const { S3Client } = require("@aws-sdk/client-s3");
const app = express();
const multer = require("multer");
const multerS3 = require("multer-s3");
const { AUTO_CONTENT_TYPE } = require("multer-s3");

const s3 = new S3Client();
// aws.config.update({
//   secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
//   accessKeyId: process.env.AWS_ACCESS_KEY_ID,
//   region: process.env.AWS_REGION,
// });

const Bucket = process.env.AWS_BUCKET_NAME;
const upload = multer({
  storage: multerS3({
    s3: s3,
    bucket: Bucket,
    acl: "public-read",
    metadata: function (req, file, cb) {
      cb(null, { fieldName: file.fieldname });
    },
    key: function (req, file, cb) {
      console.log(file);
      cb(null, file.originalname);
    },
  }),
});

// upload a single file
app.post("/upload", upload.array("files", 3), (req, res) => {
  res.json({ message: `${req.file.location}  location` });
});

// Get list of files from the bucket
app.get("/list", async (req, res) => {
  let result = await s3.listObjectsV2(Bucket).promise();
  let fileNames = result.Contents.map((item) => item.key);

  res.json({ fileNames });
});

// get file via file name from s3
app.get("/download/:filename", async (req, res) => {
  const Key = req.params.filename;
  const result = await s3.getObject({ Bucket, Key }).promise();

  res.json({ result: result.body });
});

app.delete("/delete/:filename", async (req, res) => {
  const Key = req.params.filename;
  const result = await s3.deleteObject({ Bucket, Key }).promise();

  res.json({ message: "file deleted", result });
});
app.listen(3001, () => console.log("running on 3001"));
