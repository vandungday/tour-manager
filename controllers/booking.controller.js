const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const Tour = require('../models/Tour');
const Booking = require('../models/Booking');
const asyncHandler = require('../middlewares/asyncHandler');
const ErrorResponse = require('../middlewares/ErrorResponse');
const APIFeatures = require('../middlewares/APIFeatures');

exports.getCheckoutSession = asyncHandler(async (req, res, next) => {
  // 1) Get the currently booked tour
  const tour = await Tour.findById(req.params.tourId);
  // 2) Create checkout session
  const session = await stripe.checkout.sessions.create({
    payment_method_types: ['card'],
    success_url: `${req.protocol}://${req.get('host')}/?tour=${
      req.params.tourId
    }&user=${req.user.id}&price=${tour.price}`,
    cancel_url: `${req.protocol}://${req.get('host')}/tours/${tour.slug}`,
    customer_email: req.user.email,
    client_reference_id: req.params.tourId,
    line_items: [
      {
        name: `${tour.name} Tour`,
        description: tour.summary,
        images: [`https://www.natours.dev/img/tours/${tour.imageCover}`],
        amount: tour.price * 100,
        currency: 'usd',
        quantity: 1,
      },
    ],
  });

  // 3) Create session as response
  res.status(200).json({
    status: 'success',
    session,
  });
});

exports.createBookingCheckout = asyncHandler(async (req, res, next) => {
  // This is only TEMPORARY, because it's UNSECURE: everyone can make bookings without paying
  const { tour, user, price } = req.query;

  if (!tour || !user || !price) return next();
  await Booking.create({ tour, user, price });

  res.redirect(req.originalUrl.split('?')[0]);
});

exports.createBooking = asyncHandler(async (req, res, next) => {
  const newBooking = await Booking.create(req.body);

  res.status(201).json({
    status: 'success',
    data: {
      booking: newBooking,
    },
  });
});

exports.getAllBookings = asyncHandler(async (req, res, next) => {
  const features = new APIFeatures(Booking.find(), req.query)
    .filter()
    .sort()
    .limitFields()
    .paginate();

  const bookings = await features.query;

  res.status(200).json({
    status: 'success',
    total: bookings.length,
    data: {
      bookings,
    },
  });
});

exports.getBooking = asyncHandler(async (req, res, next) => {
  const booking = await Booking.findById(req.params.id);

  if (!booking) {
    return next(new ErrorResponse('No booking found with that ID', 404));
  }

  res.status(200).json({
    status: 'success',
    data: {
      booking,
    },
  });
});

exports.updateBooking = asyncHandler(async (req, res, next) => {
  const booking = await Booking.findByIdAndUpdate(req.params.id, req.body);

  if (!booking) {
    return next(new ErrorResponse('No booking found with that ID', 404));
  }

  res.status(200).json({
    status: 'success',
    data: {
      booking,
    },
  });
});

exports.deleteBooking = asyncHandler(async (req, res, next) => {
  const booking = await Booking.findByIdAndDelete(req.params.id);

  if (!booking) {
    return next(new ErrorResponse('No booking found with that ID', 404));
  }

  res.status(204).json({
    status: 'success',
    data: null,
  });
});
