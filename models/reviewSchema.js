const mongoose = require('mongoose');

module.exports = mongoose.model(
  'Review',
  new mongoose.Schema({
    reviewedBy: String,
    comment: String,
  })
);
