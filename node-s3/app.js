require("dotenv").config();

const express = require("express");

const app = express();

app.listen(3001);

const aws = require("aws-sdk");
const multer = require("multer");
const multerS3 = require("multer-s3");

aws.config.update({
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  region: process.env.AWS_REGION,
});
const BUCKET = process.env.AWS_BUCKET_NAME;
const s3 = new aws.S3();

const upload = multer({
  storage: multerS3({
    s3: s3,
    acl: "private",
    bucket: BUCKET,
    key: function (req, file, cb) {
      cb(null, file.originalname);
    },
  }),
});

app.post("/upload", upload.single("file"), async function (req, res, next) {
  res.send("Successfully uploaded " + req.file.location + " location!");
});

app.get("/list", async (req, res) => {
  let r = await s3.listObjectsV2({ Bucket: BUCKET }).promise();
  // Item.key Key has file name
  let x = r.Contents.map((item) => item.Key);
  res.send(x);
});

app.get("/download/:filename", async (req, res) => {
  const filename = req.params.filename;
  // gets object by It's name
  let x = await s3.getObject({ Bucket: BUCKET, Key: filename }).promise();
  console.log(x.Body);
  res.send(x.Body);
});

app.delete("/delete/:filename", async (req, res) => {
  const filename = req.params.filename;
  await s3.deleteObject({ Bucket: BUCKET, Key: filename }).promise();
  res.send("File Deleted Successfully");
});
