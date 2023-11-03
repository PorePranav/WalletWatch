const express = require('express');
const userRouter = require('./routers/userRoutes');
const expenseRouter = require('./routers/expenseRoutes');
const globalErrorHandler = require('./controllers/errorController');
const morgan = require('morgan');
const AppError = require('./utils/appError');

const app = express();

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

app.use(express.json({ limit: '10kb' }));

app.use('/api/v1/expenses', expenseRouter);
// app.use('/api/v1/users', userRouter);

app.all('*', (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
});

app.use(globalErrorHandler);

module.exports = app;
