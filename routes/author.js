const express = require('express');
const Author = require('../models/authorSchema');

const router = express.Router();

router.get('/', async (req, res) => {
  if (req.query.id) {
    try {
      const author = await Author.findById(req.query.id);
      res.send(author);
    } catch (e) {
      res.send(e.message);
    }
  } else {
    const author = await Author.find();
    res.send(author);
  }
});

router.post('/', async (req, res) => {
  const author = await Author.create(req.body);
  res.send(author);
});

module.exports = router;
