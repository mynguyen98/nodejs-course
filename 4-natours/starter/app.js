const express = require('express');
const morgan = require('morgan');
const tourRouter = require('./routes/tourRoutes');
const userRouter = require('./routes/userRoutes');
const app = express();

// MIDDLEWARE
app.use(express.json());

app.use(morgan('dev'));
// setting up middleware
app.use((req, res, next) => {
  console.log('middleware running');
  next();
});
app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  next();
});

// ROUTE
app.use('/api/v1/tours', tourRouter);
app.use('/api/v1/users', userRouter);

module.exports = app;
