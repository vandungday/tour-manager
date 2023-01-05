const express = require('express');
const router = express.Router();
const authMiddleware = require('../../middlewares/auth');
const viewController = require('../../controllers/view.controller');

router.route('/').get(authMiddleware.isLogged, viewController.getOverView);
router
  .route('/me')
  .get(authMiddleware.protect, viewController.accountPage)
  .patch(authMiddleware.protect, viewController.accountPage);

router.route('/login').get(authMiddleware.isLogged, viewController.loginPage);

router
  .route('/register')
  .get(authMiddleware.isLogged, viewController.registerPage);

router
  .route('/tours/:slug')
  .get(authMiddleware.isLogged, viewController.getTour);

module.exports = router;
