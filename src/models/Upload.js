const mongoose = require('mongoose');
const aws = require('aws-sdk');
const fs = require('fs');
const path = require('path');
const { promisify } = require('util');

const {
  BACKEND_UPLOAD_BASE_URL,
  SERVER_PORT,
  STORAGE_TYPE,
  AWS_BUCKET_NAME
} = process.env

const s3 = new aws.S3();

const UploadSchema = new mongoose.Schema({
  name: String,
  size: Number,
  key: String,
  url: String,
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

UploadSchema.pre('save', function() {
  if (!this.url) {
    this.url = `${BACKEND_UPLOAD_BASE_URL}:${SERVER_PORT}/files/${this.key}`;
  }
});

UploadSchema.pre('remove', function () {
  if (STORAGE_TYPE === 's3') {
    return s3.deleteObject({
      Bucket: AWS_BUCKET_NAME,
      Key: this.key
    }).promise()
  } else {
    return promisify(fs.unlink)(
      path.resolve(__dirname, '..', '..', 'tmp', 'uploads', this.key)
    );
  }
})

module.exports = mongoose.model('Upload', UploadSchema);
