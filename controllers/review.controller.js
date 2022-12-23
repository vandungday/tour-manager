const Review = require('../models/Review');
const APIFeatures = require('../middlewares/APIFeatures');
const asyncHandler = require('../middlewares/asyncHandler');

exports.setTourUserByIds = (req, res, next) => {
  if (!req.body.tour) req.body.tour = req.params.tourId;
  if (!req.body.user) req.body.user = req.user.id;
  console.log(req.body);
  next();
};

exports.getAllReviews = asyncHandler(async (req, res, next) => {
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

exports.getReview = asyncHandler(async (req, res, next) => {
  const review = await Review.findById(req.params.id);

  if (!review) {
    return next(new ErrorResponse('No review found with that ID', 404));
  }

  res.status(200).json({
    status: 'success',
    data: {
      review,
    },
  });
});

exports.createReview = asyncHandler(async (req, res, next) => {
  const newReview = await Review.create(req.body);

  res.status(201).json({
    status: 'success',
    data: {
      review: newReview,
    },
  });
});

exports.updateReview = asyncHandler(async (req, res, next) => {
  const review = await Review.findByIdAndUpdate(req.params.id, req.body);

  if (!review) {
    return next(new ErrorResponse('No review found with that ID', 404));
  }

  res.status(200).json({
    status: 'success',
    data: {
      review,
    },
  });
});

exports.deleteReview = asyncHandler(async (req, res, next) => {
  const review = await Review.findByIdAndDelete(req.params.id);

  if (!review) {
    return next(new ErrorResponse('No review found with that ID', 404));
  }

  res.status(204).json({
    status: 'success',
    data: null,
  });
});
