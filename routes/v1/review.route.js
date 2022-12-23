const express = require('express');
const router = express.Router();

const reviewController = require('../../controllers/review.controller');

router.route('/').get(reviewController.getAllReviews);

router.route('/:id').get(reviewController.getReview);

module.exports = router;
