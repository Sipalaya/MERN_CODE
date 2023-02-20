const express = require('express');
const User = require('../models/userSchema');
const bcrypt = require('bcryptjs');
const validator = require('validator');

const router = express.Router();

//signup
router.post('/signup', async (req, res) => {
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
      res.cookie('user', user.email, {
        signed: true,
        maxAge: 2 * 60 * 1000,
      });
      res.send({
        status: 200,
        message: 'User registered successfully',
      });
    } catch (e) {
      res.status(400).send({
        status: 400,
        error: e.message,
      });
    }
  }
});

//login
router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  if (req.signedCookies.user) {
    res.status(400).send('You are already signedin');
    return;
  }
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
        res.cookie('user', user.email, {
          signed: true,
          maxAge: 2 * 60 * 1000,
        });
        res.send({ status: 200, message: 'Login Successful' });
      } else {
        res.status(400).send({ status: 400, error: 'Incorrect password' });
      }
    }
  } catch (e) {
    res.status(400).send({ status: 400, error: e.message });
  }
});

//logout
router.post('/logout', (req, res) => {
  if (req.signedCookies.user) {
    res.clearCookie('user');
    res.send('You are logged out');
  } else {
    res.status(400).send('You are not logged in');
  }
});
module.exports = router;
