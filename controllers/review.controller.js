const Review = require('../models/Review');
const APIFeatures = require('../middlewares/APIFeatures');
const asyncHandler = require('../middlewares/asyncHandler');

exports.getAllReview = asyncHandler(async (req, res, next) => {
  const features = new APIFeatures(Review.find(), req.query)
    .filter()
    .sort()
    .limitFields()
    .paginate();

  const reviews = await features.query;

  res.status(200).json({
    status: 'success',
    total: reviews.length,
    data: {
      reviews,
    },
  });
});
