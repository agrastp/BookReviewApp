// This file helps to modularize the API routes and keep them separate from each other.

const router = require('express').Router();

const userRoutes = require('./user-routes');
const reviewRoutes = require('./review-routes');

// All user routes are defined with /users, and all review routes are defined with /reviews.
router.use('/users', userRoutes);
router.use('/reviews', reviewRoutes);

module.exports = router;