const { userService } = require('../service');
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

module.exports = {
  loginUser,
};
