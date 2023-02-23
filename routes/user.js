const express = require('express');
const { signup, login, logout } = require('../controller/userController');

const router = express.Router();
//signup
router.post('/signup', signup);
//login
router.post('/login', login);
//logout
router.post('/logout', logout);

module.exports = router;
