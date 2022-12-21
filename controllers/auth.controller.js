const asyncHandler = require('../middlewares/asyncHandler');
const { userService, authService, mailService } = require('../services');

exports.register = asyncHandler(async (req, res, next) => {
  const user = await userService.createNewUser(req.body);
  const accessToken = user.signToken();
  const options = authService.mailLogin(user, req);

  await mailService(options);

  res.status(201).json({
    status: 'success',
    token: accessToken,
    data: {
      user,
    },
  });
});

exports.login = asyncHandler(async (req, res, next) => {
  const { email, password } = req.body;

  const user = await authService.loginUser(email, password);
  const accessToken = user.signToken();

  res.status(200).json({
    status: 'success',
    token: accessToken,
  });
});

exports.forgotPassword = asyncHandler(async (req, res, next) => {
  const user = await authService.forgotPassword(req.body.email);
  const resetToken = user.createPasswordResetToken();
  user.save({ validateBeforeSave: false });

  const options = authService.mailForgotPassword(user, req, resetToken);

  await mailService(options);

  res.status(200).json({
    status: 'success',
    message: 'Token sent to email',
  });
});

exports.resetPassword = asyncHandler(async (req, res, next) => {});
