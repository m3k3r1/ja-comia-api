export default {
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: process.env.AWS_REGION,
  bucket: process.env.AWS_S3_BUCKET_NAME,
  fileSize: 1 * 1024 * 1024,
  acl: 'public-read',
  basePath: `images`,
};
