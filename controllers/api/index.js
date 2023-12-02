const router = require('express').Router();

const userRoutes = require('./user-routes');
const bookRoutes = require('./book-routes');
const reviewRoutes = require('./book-routes');

router.use('/users', userRoutes);
router.use('/books', bookRoutes);
router.use('/reviews', reviewRoutes);

module.exports = router;