const tourRouter = require('./tour.route');
const userRouter = require('./user.route');
const authRouter = require('./auth.route');
const reviewRouter = require('./review.route');
const viewRouter = require('./view.route');
const errorController = require('../../controllers/error.controller');
const ErrorResponse = require('../../middlewares/ErrorResponse');

module.exports = (app) => {
  app.use('/', viewRouter);
  app.use('/api/v1/auth', authRouter);
  app.use('/api/v1/users', userRouter);
  app.use('/api/v1/tours', tourRouter);
  app.use('/api/v1/reviews', reviewRouter);

  app.all('*', (req, res, next) => {
    next(
      new ErrorResponse(`Can't find ${req.originalUrl} on this server!`, 404)
    );
  });

  app.use(errorController);
};
