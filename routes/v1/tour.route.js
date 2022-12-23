const express = require('express');
const router = express.Router();

const tourController = require('../../controllers/tour.controller');
const authMiddleware = require('../../middlewares/auth');
const reviewRouter = require('./review.route');

router.use('/:tourId/reviews', reviewRouter);

router
  .route('/')
  .get(tourController.getAllTours)
  .post(tourController.createTour);

router
  .route('/:id')
  .get(tourController.getTour)
  .patch(authMiddleware.protect, tourController.updateTour)
  .delete(authMiddleware.protect, tourController.deleteTour);

module.exports = router;
