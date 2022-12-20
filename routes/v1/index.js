const tourRouter = require('./tour.route');
const userRouter = require('./user.route');
const authRouter = require('./auth.route');

module.exports = (app) => {
  app.use('/api/v1/tours', tourRouter);
  app.use('/api/v1/users', userRouter);
  app.use('/api/v1/auth', authRouter);
};
