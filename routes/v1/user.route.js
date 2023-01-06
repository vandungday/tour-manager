const express = require('express');
const router = express.Router();
const { uploadService } = require('../../services');
const userController = require('../../controllers/user.controller');
const authMiddleware = require('../../middlewares/auth');

router.use(authMiddleware.protect);
// để trước router /:id
router
  .route('/me')
  .get(userController.getMe, userController.getUser)
  .patch(
    uploadService.uploadUserPhoto,
    uploadService.resizeUserPhoto,
    userController.updateMe
  )
  .delete(userController.deleteMe);

router.route('/update-my-password').patch(userController.updateMyPassword);

router.use(authMiddleware.restrictTo('admin'));

router
  .route('/')
  .get(userController.getAllUsers)
  .post(userController.createUser);

router
  .route('/:id')
  .get(userController.getUser)
  .patch(userController.updateUser)
  .delete(userController.deleteUser);

module.exports = router;
