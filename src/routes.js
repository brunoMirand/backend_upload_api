const routes = require('express').Router();
const multer = require('multer');
const multerConfig = require('./config/multer');

const Upload = require('./models/Upload');

routes.get('/', (req, res) => {
  res.json({ message: 'Great start! Now its progress focus' });
});

routes.post(
  '/upload',
  multer(multerConfig).single('file'),
  async (req, res) => {
    const {
      originalname: name,
      size,
      filename: key
    } = req.file;

    const upload = await Upload.create({
      name,
      size,
      key,
      url: ''
    });

    return res.status(201).json(upload);
  });

module.exports = routes;
