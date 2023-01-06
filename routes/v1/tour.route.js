const express = require('express');
const router = express.Router();

const tourController = require('../../controllers/tour.controller');
const authMiddleware = require('../../middlewares/auth');
const reviewRouter = require('./review.route');
const { uploadService } = require('../../services');

router.use('/:tourId/reviews', reviewRouter);

router
  .route('/')
  .get(tourController.getAllTours)
  .post(tourController.createTour);

router
  .route('/:id')
  .get(tourController.getTour)
  .patch(
    authMiddleware.restrictTo('admin', 'lead-guide'),
    uploadService.uploadTourImages,
    uploadService.resizeTourImages,
    tourController.updateTour
  )
  .delete(
    authMiddleware.protect,
    authMiddleware.restrictTo('admin', 'lead-guide'),
    tourController.deleteTour
  );

module.exports = router;
