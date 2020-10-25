const mongoose = require('mongoose');

const Uploadchema = new mongoose.Schema({
  name: String,
  size: Number,
  key: String,
  url: String,
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('Upload', Uploadchema);
