const express = require('express');
const router = express.Router();
const authMiddleware = require('../../middlewares/auth');
const viewController = require('../../controllers/view.controller');

router.use(authMiddleware.isLogged);

router.route('/').get(viewController.getOverView);
router.route('/login').get(viewController.loginPage);
router.route('/register').get(viewController.registerPage);
router.route('/tours/:slug').get(viewController.getTour);

module.exports = router;
