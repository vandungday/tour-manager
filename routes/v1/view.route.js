const express = require('express');
const router = express.Router();
const viewController = require('../../controllers/view.controller');

router.route('/').get(viewController.getOverView);

module.exports = router;
