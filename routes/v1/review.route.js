const express = require('express');
const router = express.Router({ mergeParams: true });

const reviewController = require('../../controllers/review.controller');
const authMiddleware = require('../../middlewares/auth');

router.use(authMiddleware.protect);

router
  .route('/')
  .get(reviewController.getAllReviews)
  .post(
    authMiddleware.restrictTo('user'),
    reviewController.setTourUserByIds,
    reviewController.createReview
  );

router
  .route('/:id')
  .get(reviewController.getReview)
  .patch(reviewController.updateReview)
  .delete(reviewController.deleteReview);

module.exports = router;
