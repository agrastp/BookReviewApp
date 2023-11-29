const router = require('express').Router();
const { Book, Review } = require('../models');
// Import the custom middleware
// const withAuth = require('../utils/auth');

// GET all reviews for homepage
router.get('/', async (req, res) => {
   });

    

// GET one review
// Use the custom middleware before allowing the user to access the gallery
router.get('/reviews/:id', withAuth, async (req, res) => {
  
    });

    

// GET one book
// Use the custom middleware before allowing the user to access the painting
router.get('/book/:id', withAuth, async (req, res) => {
});


module.exports = router;
