const asyncHandler = require('../middlewares/asyncHandler');
const User = require('../models/User');
const APIFeatures = require('../middlewares/APIFeatures');
const ErrorResponse = require('../middlewares/ErrorResponse');
const { userService } = require('../services');

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
  const features = new APIFeatures(User.find(), req.query)
    .filter()
    .sort()
    .limitFields()
    .paginate();

  const users = await features.query;

  res.status(200).json({
    status: 'success',
    total: users.length,
    data: {
      users,
    },
  });
});

exports.getUser = asyncHandler(async (req, res, next) => {
  const user = await User.findById(req.params.id);

  if (!user) {
    return next(new ErrorResponse('No user found with that ID', 404));
  }

  res.status(200).json({
    status: 'success',
    data: {
      user,
    },
  });
});

exports.updateUser = asyncHandler(async (req, res, next) => {
  const user = await User.findByIdAndUpdate(req.params.id, req.body);

  if (!user) {
    return next(new ErrorResponse('No user found with that ID', 404));
  }

  res.status(200).json({
    status: 'success',
    data: {
      user,
    },
  });
});

exports.deleteUser = asyncHandler(async (req, res, next) => {
  const user = await User.findByIdAndDelete(req.params.id);

  if (!user) {
    return next(new ErrorResponse('No user found with that ID', 404));
  }

  res.status(204).json({
    status: 'success',
    data: null,
  });
});

exports.getMe = asyncHandler(async (req, res, next) => {
  req.params.id = req.user.id;
  next();
});

exports.updateMe = asyncHandler(async (req, res, next) => {
  // chỉ update name và email
  const filterOject = userService.filterOject(req.body, 'name', 'email');
  const updatedUser = await userService.updateMe(req, filterOject);

  res.status(200).json({
    status: 'success',
    data: {
      user: updatedUser,
    },
  });
});

exports.deleteMe = asyncHandler(async (req, res, next) => {
  await User.findByIdAndUpdate(req.user.id, { active: false });

  res.status(204).json({
    status: 'success',
    data: null,
  });
});

exports.updateMyPassword = asyncHandler(async (req, res, next) => {
  const { passwordCurrent, password, passwordConfirm } = req.body;

  const user = await userService.updateMyPassword(
    passwordCurrent,
    password,
    passwordConfirm,
    req
  );

  res.status(200).json({
    status: 'success',
    data: {
      user,
    },
  });
});
