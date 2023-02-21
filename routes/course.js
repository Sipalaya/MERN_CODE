const express = require('express');
const Course = require('../models/courseSchema');
const checkAuth = require('../middleware/checkAuth');

const router = express.Router();

router.get('/', checkAuth, async (req, res) => {
  if (req.query.id) {
    try {
      const course = await Course.findById(req.query.id);
      res.send(course);
    } catch (e) {
      res.send(e.message);
    }
  } else {
    const course = await Course.find().select('title ratings author tags -_id');
    console.log(req.user);
    res.send(course);
  }
});

router.post('/', (req, res) => {
  const course = req.body;
  errMessage = null;
  if (course.title == '') {
    errMessage = 'title must not be empty string';
    res.status(400).send({ error: errMessage });
    return;
  } else if (course.ratings < 0)
    Course.create(course)
      .then((c) =>
        res.send({
          msg: 'Course added successfully',
          course: c,
        })
      )
      .catch((err) => res.send(err.message));
});

router.put('/:id', (req, res) => {
  Course.findByIdAndUpdate(
    req.params.id,
    {
      $set: req.body,
    },
    { new: true }
  )
    .then((c) =>
      res.send({
        msg: 'Course updated!',
        course: c,
      })
    )
    .catch((err) => res.send(err.message));
});
router.put('/updateRatings/:id', (req, res) => {
  Course.findByIdAndUpdate(
    req.params.id,
    {
      $inc: { ratings: 1 },
    },
    { new: true }
  )
    .then((c) =>
      res.send({
        msg: 'Course updated!',
        course: c,
      })
    )
    .catch((err) => res.send(err.message));
});
router.delete('/:id', (req, res) => {
  Course.findByIdAndRemove(req.params.id)
    .then((c) =>
      res.send({
        msg: 'Course deleted!',
        course: c,
      })
    )
    .catch((err) => res.send(err.message));
});

module.exports = router;
