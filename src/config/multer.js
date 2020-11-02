require('dotenv').config();
const multer = require('multer');
const multerS3 = require('multer-s3');
const aws = require('aws-sdk');
const path = require('path');
const crypto = require('crypto');
const { STORAGE_TYPE, AWS_BUCKET_NAME } = process.env;

const pathFolder = path.resolve(__dirname, '..', '..', 'tmp', 'uploads');

const storageTypes = {
  local: multer.diskStorage({
    destination: (req, file, callback) => {
      callback(null, pathFolder);
    },
    filename: (req, file, callback) => {
      crypto.randomBytes(16, (err, hash) => {
        if (err) {
          callback(err);
        }

        file.key = `${hash.toString('hex')}-${file.originalname}`;
        callback(null, file.key);
      });
    },
  }),
  s3: multerS3({
    s3: new aws.S3(),
    bucket: AWS_BUCKET_NAME,
    contentType: multerS3.AUTO_CONTENT_TYPE,
    acl: 'public-read',
    key: (req, file, callback) => {
      crypto.randomBytes(16, (err, hash) => {
        if (err) {
          callback(err);
        }

        const fileName = `${hash.toString('hex')}-${file.originalname}`;
        callback(null, fileName);
      });
    }
  })
};

module.exports = {
  dest: pathFolder,
  storage: storageTypes[STORAGE_TYPE],
  limits: {
    fileSize: 2 * 1024 * 1024,
  },
  fileFilter: (req, file, callback) => {
    const allowedMimeTypes = [
      'image/jpeg',
      'image/pjpeg',
      'image/png',
      'image/jpg'
    ];

    if (allowedMimeTypes.includes(file.mimetype)) {
      callback(null, true);
    } else {
      callback(new Error('Invalid file type.'));
    }
  }
};
