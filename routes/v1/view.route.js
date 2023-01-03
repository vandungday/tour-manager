const express = require('express');
const router = express.Router();
const viewController = require('../../controllers/view.controller');

router.route('/').get(viewController.getOverView);
router.route('/tours/:slug').get(viewController.getTour);

module.exports = router;
