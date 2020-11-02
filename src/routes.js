const routes = require('express').Router();
const multer = require('multer');
const multerConfig = require('./config/multer');

const Upload = require('./models/Upload');

routes.get('/', (req, res) => {
  res.json({ message: 'Great start! Now its progress focus' });
});

routes.get('/upload', async (req, res) => {
  const uploads = await Upload.find();
  return res.json(uploads);
});

routes.delete('/upload/:id', async (req, res) => {
  const upload = await Upload.findById(req.params.id)
  await upload.remove();

  return res.json({ message: `The file ${req.params.id} has been deleted` });
});

routes.post(
  '/upload',
  multer(multerConfig).single('file'),
  async (req, res) => {
    const {
      originalname: name,
      size,
      key,
      url = ''
    } = req.file;

    const upload = await Upload.create({
      name,
      size,
      key,
      url
    });

    return res.status(201).json(upload);
  });

module.exports = routes;
