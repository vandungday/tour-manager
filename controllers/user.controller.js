const asyncHandler = require('../middlewares/asyncHandler');
const User = require('../models/User');

exports.createUser = asyncHandler(async (req, res, next) => {
  const newUser = await User.create(req.body);

  res.status(201).json({
    status: 'success',
    data: {
      user: newUser,
    },
  });
});

exports.getAllUsers = asyncHandler(async (req, res, next) => {
  const user = await User.find();

  res.status(200).json({
    status: 'success',
    total: user.length,
    data: {
      user,
    },
  });
});
