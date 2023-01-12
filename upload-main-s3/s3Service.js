const { S3 } = require("aws-sdk");
const { S3Client, PutObjectCommand } = require("@aws-sdk/client-s3");
const uuid = require("uuid").v4;

exports.s3Uploadv2 = async (files) => {
  const s3 = new S3();
  // single param
  //   const param = {
  //     Bucket: process.env.AWS_BUCKET_NAME,
  //     Key: `upload/${uuid()}-${file.originalname}`,
  //     Body: file.buffer,
  //   };

  const params = files.map((file) => {
    return {
      Bucket: process.env.AWS_BUCKET_NAME,
      Key: `upload/${uuid()}-${file.originalname}`,
      Body: file.buffer,
    };
  });

  const results = await Promise.all(
    params.map((param) => s3.upload(param).promise())
  );

  return results;
};
exports.s3Uploadv3 = async (files) => {
  const s3client = new S3Client();
  const params = files.map((file) => {
    return {
      Bucket: process.env.AWS_BUCKET_NAME,
      Key: `upload/${uuid()}-${file.originalname}`,
      Body: file.buffer,
    };
  });
  return await Promise.all(
    params.map((param) => s3client.send(new PutObjectCommand(param)))
  );
};
