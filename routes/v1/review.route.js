const express = require('express');
const router = express.Router();

const reviewController = require('../../controllers/review.controller');

router.route('/').get(reviewController.getAllReview);

module.exports = router;
