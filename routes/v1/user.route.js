const express = require('express');
const router = express.Router();

const userController = require('../../controllers/user.controller');
const authMiddleware = require('../../middlewares/auth');

router.use(authMiddleware.protect);
// để trước router /:id
router.route('/me').get(userController.getMe, userController.getUser);

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
