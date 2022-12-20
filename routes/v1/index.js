const tourRouter = require('./tour.route');

module.exports = (app) => {
  app.use('/api/v1/tours', tourRouter);
};
