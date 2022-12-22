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

const filterOject = (obj, ...allowField) => {
  newObject = {};

  Object.keys(obj).map((el) => {
    if (allowField.includes(el)) {
      newObject[el] = obj[el];
    }
  });

  return newObject;
};

const updateMe = async (req, filterOject) => {
  if (req.body.password || req.body.passwordConfirm) {
    throw new ErrorResponse(
      'This route is not for password updates. Please use /update-my-password.',
      400
    );
  }
  const updatedUser = await User.findByIdAndUpdate(req.user.id, filterOject, {
    new: true,
    runValidators: true,
  }).select('-__v');

  return updatedUser;
};

module.exports = {
  createNewUser,
  getUserByEmail,
  filterOject,
  updateMe,
};
