require('dotenv').config();
const express = require('express');
const routes = require('./src/routes');

const app = express();
const port = process.env.SERVER_PORT;

app.use(routes);

app.listen(port, () => {
  console.log(`Application available port ${port}`);
});
