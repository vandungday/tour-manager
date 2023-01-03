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

exports.getTour = asyncHandler(async (req, res, next) => {
  const tour = await Tour.findOne({ slug: req.params.slug }).populate({
    path: 'reviews',
    fields: 'review rating user',
  });

  if (!tour) {
    return next(new ErrorResponse('There is no tour with that name.', 404));
  }
  res.status(200).render('tour', {
    title: `${tour.name} Tour`,
    tour,
  });
});
