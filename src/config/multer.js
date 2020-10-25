const multer = require('multer');
const path = require('path');
const crypto = require('crypto');

const pathFolder = path.resolve(__dirname, '..', '..', 'tmp', 'uploads');

module.exports = {
  dest: pathFolder,
  storage: multer.diskStorage({
    destination: (req, file, callback) => {
      callback(null, pathFolder);
    },
    filename: (req, file, callback) => {
      crypto.randomBytes(16, (err, hash) => {
        if (err) {
          callback(err);
        }

        const fileName = `${hash.toString('hex')}-${file.originalname}`;
        callback(null, fileName);
      });
    },
  }),
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
