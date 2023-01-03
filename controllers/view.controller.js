const Tour = require('../models/Tour');
const asyncHandler = require('../middlewares/asyncHandler');
const ErrorResponse = require('../middlewares/ErrorResponse');

exports.getOverView = asyncHandler(async (req, res, next) => {
  const tours = await Tour.find();

  res.status(200).render('overview', {
    title: 'All tours',
    tours,
  });
});
