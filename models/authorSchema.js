const mongoose = require('mongoose');

module.exports = mongoose.model(
  'Author',
  new mongoose.Schema({
    fullname: String,
    email: {
      type: String,
      required: true,
      unique: true,
    },
  })
);
