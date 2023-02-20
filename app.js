const express = require('express');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');

//router
const courseRouter = require('./routes/course');
const userRouter = require('./routes/user');

const PORT = 3000;
const app = express();
app.use(express.json());
app.use(cookieParser('1234-56789-01234-56789'));
//connecting to db
mongoose.set('strictQuery', true);
mongoose
  .connect('mongodb://localhost:27017/sipalaya')
  .then(() => {
    console.log('Connection made to mongodb');
    app.listen(PORT, () =>
      console.log(`Server is running on http://localhost:${PORT}/`)
    );
  })
  .catch((err) => console.log(err.message));
app.get('/', (req, res) => res.send('Server is running'));
app.use('/api/courses/', courseRouter);
app.use('/api/user/', userRouter);
