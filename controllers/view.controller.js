const Tour = require('../models/Tour');
const Booking = require('../models/Booking');
const asyncHandler = require('../middlewares/asyncHandler');
const ErrorResponse = require('../middlewares/ErrorResponse');

exports.getOverView = asyncHandler(async (req, res, next) => {
  const tours = await Tour.find();

  res.status(200).render('overview', {
    title: 'All tours',
    tours,
  });
});

exports.getTour = asyncHandler(async (req, res, next) => {
  const tour = await Tour.findOne({ slug: req.params.slug }).populate({
    path: 'reviews',
    fields: 'review rating user',
  });

  if (!tour) {
    return next(new ErrorResponse('There is no tour with that name.', 404));
  }
  res.status(200).render('tour', {
    title: `${tour.name} Tour`,
    tour,
  });
});

exports.loginPage = asyncHandler(async (req, res, next) => {
  res.status(200).render('login', {
    title: 'Login',
  });
});

exports.registerPage = asyncHandler(async (req, res, next) => {
  res.status(200).render('register', {
    title: 'Register',
  });
});

exports.accountPage = asyncHandler(async (req, res) => {
  res.status(200).render('account', {
    title: 'Your account',
  });
});

exports.myTourPage = asyncHandler(async (req, res) => {
  const booking = await Booking.find({ user: req.user.id });
  const tourIds = booking.map((e) => e.tour);
  const tours = await Tour.find({ _id: { $in: tourIds } });

  res.status(200).render('overview', {
    title: 'Your tours',
    tours,
  });
});
