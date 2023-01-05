const express = require('express');
const router = express.Router();
const authMiddleware = require('../../middlewares/auth');
const viewController = require('../../controllers/view.controller');
const bookingController = require('../../controllers/booking.controller');

router
  .route('/')
  .get(
    bookingController.createBookingCheckout,
    authMiddleware.isLogged,
    viewController.getOverView
  );

router
  .route('/me')
  .get(authMiddleware.protect, viewController.accountPage)
  .patch(authMiddleware.protect, viewController.accountPage);

router
  .route('/my-tours')
  .get(authMiddleware.protect, viewController.myTourPage);

router.route('/login').get(authMiddleware.isLogged, viewController.loginPage);

router
  .route('/register')
  .get(authMiddleware.isLogged, viewController.registerPage);

router
  .route('/tours/:slug')
  .get(authMiddleware.isLogged, viewController.getTour);

module.exports = router;
