const express = require('express');
const userRouter = require('./routers/userRoutes');
const expenseRouter = require('./routers/expenseRoutes');
const dueRouter = require('./routers/dueRoutes');
const globalErrorHandler = require('./controllers/errorController');
const morgan = require('morgan');
const AppError = require('./utils/appError');
const cookieParser = require('cookie-parser');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(morgan('dev'));

app.use(express.json({ limit: '10kb' }));
app.use(cookieParser());

app.use('/api/v1/users', userRouter);
app.use('/api/v1/expenses', expenseRouter);
app.use('/api/v1/dues', dueRouter);

app.all('*', (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
});

app.use(globalErrorHandler);

module.exports = app;
