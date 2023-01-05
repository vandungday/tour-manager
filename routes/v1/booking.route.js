const express = require('express');
const bookingController = require('../../controllers/booking.controller');
const authMiddleware = require('../../middlewares/auth');

const router = express.Router();

router.get(
  '/checkout-session/:tourId',
  authMiddleware.protect,
  bookingController.getCheckoutSession
);

module.exports = router;
