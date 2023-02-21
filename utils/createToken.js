const jwt = require('jsonwebtoken');

module.exports = (_id) => {
  return jwt.sign({ _id }, '1234queorn32984usadh34', { expiresIn: '3d' });
};
