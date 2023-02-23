const User = require('../models/userSchema');
const createToken = require('../utils/createToken');
const bcrypt = require('bcryptjs');
const validator = require('validator');

const signup = async (req, res) => {
  const { email, password } = req.body;
  if (!validator.isEmail(email)) {
    res.status(400).send({ status: 400, message: 'Invalid email' });
    return;
  }

  const user = await User.findOne({ email });
  if (user)
    res.status(400).send({
      status: 400,
      error: `User with email ${email} already registered...`,
    });
  else {
    try {
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);
      const user = await User.create({ email, password: hashedPassword });
      const token = createToken(user._id);
      res.send({
        status: 200,
        message: 'User registered successfully',
        token,
      });
    } catch (e) {
      res.status(400).send({
        status: 400,
        error: e.message,
      });
    }
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) {
      res.status(400).send({
        status: 400,
        error: `${email} is not registered`,
      });
    } else {
      const isMatch = await bcrypt.compare(password, user.password);
      if (isMatch) {
        const token = createToken(user._id);
        res.send({ status: 200, message: 'Login Successful', token });
      } else {
        res.status(400).send({ status: 400, error: 'Incorrect password' });
      }
    }
  } catch (e) {
    res.status(400).send({ status: 400, error: e.message });
  }
};

const logout = async (req, res) => {
  if (req.session.isAuth) {
    req.session.destroy();
    res.send('You are logged out');
  } else {
    res.status(400).send('You are not logged in');
  }
};

module.exports = { signup, login, logout };
