const pug = require('pug');
const { userService } = require('../services');
const ErrorResponse = require('../middlewares/ErrorResponse');
const User = require('../models/User');

/**
 * Login with username and password
 * @param {string} email
 * @param {string} password
 * @returns {Promise<User>}
 */
const loginUser = async (email, password) => {
  const user = await userService.getUserByEmail(email);

  if (!user || !(await user.checkPasswordMatch(password))) {
    throw new ErrorResponse('Incorrect email or password', 400);
  }

  return user;
};

const forgotPassword = async (email) => {
  const user = await User.findOne({ email });

  if (!user) {
    throw new ErrorResponse('Not fount email', 404);
  }

  return user;
};

const mailLogin = (user, req) => {
  const url = `${req.protocol}://${req.get('host')}/me`;

  const html = pug.renderFile(`${__dirname}/../views/email/welcome.pug`, {
    url,
    username: user.username,
  });

  const options = {
    email: user.email,
    subject: 'Welcome to the Natours Family!',
    html,
  };
  return options;
};

const mailForgotPassword = (user, req, resetToken) => {
  const url = `${req.protocol}://${req.get(
    'host'
  )}/api/v1/users/reset-password/${resetToken}`;

  const html = pug.renderFile(`${__dirname}/../views/email/passwordReset.pug`, {
    url,
    username: user.username,
  });

  const options = {
    email: user.email,
    subject: 'Your password reset token (valid for only 10 minutes)',
    html,
  };
  return options;
};

module.exports = {
  loginUser,
  mailLogin,
  forgotPassword,
  mailForgotPassword,
};
