const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const courseSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
      minlength: [3, 'Course title must be atleast 3 character long'],
      maxlength: 50,
      uppercase: true,
      trim: true,
    },
    author: {
      type: String,
      required: true,
      minlength: [3, 'Course title must be atleast 3 character long'],
      maxlength: 50,
    },
    ratings: {
      type: Number,
      default: 0,
      min: 0,
      max: [10, 'Ratings must be in the scale of 10'],
    },
    isPublished: {
      type: Boolean,
      default: false,
    },
    category: {
      type: String,
      required: true,
      enum: ['web', 'mobile', 'desktop'],
      lowercase: true,
    },
    price: {
      type: Number,
      required: function () {
        return this.isPublished;
      },
    },
    //custom validation
    tags: {
      type: Array,
      validate: {
        validator: function (v) {
          return v && v.length > 0;
        },
        message: 'A course should have atelast one tag...',
      },
    },
  },
  { timestamps: true }
);

const Course = mongoose.model('Course', courseSchema);
module.exports = Course;
