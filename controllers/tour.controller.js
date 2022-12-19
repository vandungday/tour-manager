const Tour = require('../models/Tours');
const asyncHandler = require('../middlewares/asyncHandler');

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
