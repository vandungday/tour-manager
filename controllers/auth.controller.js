const User = require('../models/User');
const asyncHandler = require('../middlewares/asyncHandler');
const { userService, authService } = require('../service');

exports.register = asyncHandler(async (req, res, next) => {
  const user = await userService.createNewUser(req.body);
  const token = user.signToken();

  res.status(201).json({
    status: 'success',
    token,
    data: {
      user,
    },
  });
});

exports.login = asyncHandler(async (req, res, next) => {
  const { email, password } = req.body;

  const user = await authService.loginUser(email, password);
  const token = user.signToken();

  res.status(200).json({
    status: 'success',
    token,
  });
});
