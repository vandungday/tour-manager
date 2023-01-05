const express = require('express');
const bookingController = require('../../controllers/booking.controller');
const authMiddleware = require('../../middlewares/auth');

const router = express.Router();

router.use(authMiddleware.protect);

router.get('/checkout-session/:tourId', bookingController.getCheckoutSession);

router.use(authMiddleware.restrictTo('admin', 'lead-guide'));

router
  .route('/')
  .get(bookingController.getAllBookings)
  .post(bookingController.createBooking);

router
  .route('/:id')
  .get(bookingController.getBooking)
  .patch(bookingController.updateBooking)
  .delete(bookingController.deleteBooking);

module.exports = router;
