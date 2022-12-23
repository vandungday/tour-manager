const Tour = require('../models/Tour');
const asyncHandler = require('../middlewares/asyncHandler');
const ErrorResponse = require('../middlewares/ErrorResponse');
const APIFeatures = require('../middlewares/APIFeatures');

exports.createTour = asyncHandler(async (req, res, next) => {
  const newTour = await Tour.create(req.body);

  res.status(201).json({
    status: 'success',
    data: {
      tour: newTour,
    },
  });
});

exports.getAllTours = asyncHandler(async (req, res, next) => {
  const features = new APIFeatures(Tour.find(), req.query)
    .filter()
    .sort()
    .limitFields()
    .paginate();

  const tours = await features.query;

  res.status(200).json({
    status: 'success',
    total: tours.length,
    data: {
      tours,
    },
  });
});

exports.getTour = asyncHandler(async (req, res, next) => {
  const tour = await Tour.findById(req.params.id);

  if (!tour) {
    return next(new ErrorResponse('No tour found with that ID', 404));
  }

  res.status(200).json({
    status: 'success',
    data: {
      tour,
    },
  });
});

exports.updateTour = asyncHandler(async (req, res, next) => {
  const tour = await Tour.findByIdAndUpdate(req.params.id, req.body);

  if (!tour) {
    return next(new ErrorResponse('No tour found with that ID', 404));
  }

  res.status(200).json({
    status: 'success',
    data: {
      tour,
    },
  });
});

exports.deleteTour = asyncHandler(async (req, res, next) => {
  const tour = await Tour.findByIdAndDelete(req.params.id);

  if (!tour) {
    return next(new ErrorResponse('No tour found with that ID', 404));
  }

  res.status(204).json({
    status: 'success',
    data: null,
  });
});
