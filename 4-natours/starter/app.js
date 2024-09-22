const express = require('express');
const morgan = require('morgan');
const tourRouter = require('./routes/tourRoutes');
const userRouter = require('./routes/userRoutes');
const app = express();

// MIDDLEWARE
console.log(process.env.NODE_ENV);
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}
app.use(express.json());
app.use(express.static(`${__dirname}/assets`));
app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  next();
});

// Param middleware for 'id'
app.param('tourId', (req, res, next, id) => {
  console.log(`Request received with global id: ${id}`);
  next();
});
// ROUTE
app.use('/api/v1/tours', tourRouter);
app.use('/api/v1/users', userRouter);

module.exports = app;
