const express = require('express');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const MongoDBSession = require('connect-mongodb-session')(session);

//router
const courseRouter = require('./routes/course');
const userRouter = require('./routes/user');

const store = new MongoDBSession({
  uri: 'mongodb://localhost:27017/sipalaya',
  collection: 'session',
});

const PORT = 3000;
const app = express();
app.use(express.json());
// app.use(cookieParser('1234-56789-01234-56789'));
app.use(
  session({
    secret: '1234-56789-01234-56789',
    resave: false,
    saveUninitialized: false,
    store,
  })
);
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
