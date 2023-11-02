const express = require('express');
const userRouter = require('./routers/userRoutes');
const expensesRouter = require('./routers/expenseRoutes');
const globalErrorHandler = require('./controllers/errorController');
const morgan = require('morgan');
const AppError = require('./utils/appError');

const app = express();

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

app.all('*', (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
});

app.use(globalErrorHandler);

module.exports = app;