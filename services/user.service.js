const ErrorResponse = require('../middlewares/ErrorResponse');
const User = require('../models/User');

/**
 * Create a user
 * @param {Object} newUser
 * @returns {Promise<User>}
 */
const createNewUser = async (newUser) => {
  return await User.create(newUser);
};

/**
 * Create a user
 * @param {String} email
 * @returns {Promise<User>}
 */
const getUserByEmail = async (email) => {
  return await User.findOne({ email }).select('+password');
};

module.exports = {
  createNewUser,
  getUserByEmail,
};
