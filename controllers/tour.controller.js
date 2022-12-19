const Tour = require('../models/Tours');
const asyncHandler = require('../middlewares/asyncHandler');

exports.createTour = asyncHandler(async (req, res, next) => {
  const newTour = await Tour.create(req.body);

  return res.status(201).json({
    status: 'success',
    data: {
      tour: newTour,
    },
  });
});

exports.getAllTours = asyncHandler(async (req, res, next) => {
  const tours = await Tour.find();

  return res.status(200).json({
    status: 'success',
    total: tours.length,
    data: {
      tours,
    },
  });
});
