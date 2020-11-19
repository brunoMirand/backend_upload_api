require('dotenv').config();
const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');
const routes = require('./src/routes');
const path = require('path');
const cors = require('cors');
const {
  APPLICATION_NAME,
  SERVER_PORT,
  DATABASE_NAME,
  DATABASE_USERNAME,
  DATABASE_PASSWORD,
  DATABASE_BASE_URL,
  DATABASE_PORT
} = process.env;

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan('dev'));
app.use(routes);
app.use(
  '/files',
  express.static(path.resolve(__dirname, 'tmp', 'uploads'))
);

const run = async () => {
  await mongoose.connect(
    `mongodb://${DATABASE_USERNAME}:${DATABASE_PASSWORD}@${DATABASE_BASE_URL}:${DATABASE_PORT}/${DATABASE_NAME}?authSource=admin`,
    {
      useUnifiedTopology: true,
      useNewUrlParser: true,
    }
  );

  await app.listen(SERVER_PORT, () => {
    console.log(`Application ${APPLICATION_NAME} available on port ${SERVER_PORT}`);
  });
}

run();
