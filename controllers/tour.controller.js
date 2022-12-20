const Tour = require('../models/Tours');
const asyncHandler = require('../middlewares/asyncHandler');
const ErrorResponse = require('../middlewares/ErrorResponse');

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
  const tours = await Tour.find();

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

  console.log(tour);
  if (!tour) {
    return next(new ErrorResponse('No tour found with that ID', 404));
  }

  res.status(204).json({
    status: 'success',
    data: null,
  });
});
