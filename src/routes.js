const routes = require('express').Router();

routes.get('/', (req, res) => {
  res.json({ message: 'Great start! Now its progress focus'});
});

module.exports = routes;
