const jwt = require('jsonwebtoken');

module.exports = (_id) => {
  return jwt.sign({ _id }, process.env.JWT_SECRET, { expiresIn: '3d' });
};
