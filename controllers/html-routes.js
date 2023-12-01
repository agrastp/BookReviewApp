const router = require('express').Router();
const { Book, Review } = require('../models');
// Import the custom middleware
// const withAuth = require('../utils/auth'); Do we need this?

// GET all books for homepage sorted by name
router.get('/', async (req, res) => {
    try {
        const bookData = await Book.findAll({
            order: [['title', 'ASC']],
        });

        const books = bookData.map((book) => book.get({ plain: true }));

        res.render('homepage', { books });
    } catch (err) {
        res.status(500).json(err);
    }
});

// GET one book
router.get('/books/:id', async (req, res) => {
    try {
        const bookData = await Book.findByPk(req.params.id);
        if (!bookData) {
            res.status(404).json({ message: 'No book with this id!' });
            return;
        }
        const book = bookData.get({ plain: true });
        res.render('book', book);
    } catch (err) {
        res.status(500).json(err);
    };
});


//GET all reviews
router.get('/review', async (req, res) => {
    const reviewData = await Review.findAll().catch((err) => {
        res.json(err);
    });
    const reviews = reviewData.map((review) => review.get({ plain: true }));
    res.render('all', { reviews });
});

// GET one review
router.get('/review/:id', async (req, res) => {
    try{ 
        const reviewData = await Review.findByPk(req.params.id);
        if(!reviewData) {
            res.status(404).json({message: 'No review with this id!'});
            return;
        }
        const review = reviewData.get({ plain: true });
        res.render('review', review);
      } catch (err) {
          res.status(500).json(err);
      };     
});

// Villy: render the login page
router.get('/login', async (req, res) => {
    try {
        res.render('login');
    }
    catch (err) {
        res.status(500).json(err);
    }
});

// Villy: render the signup page
router.get('/signup', async (req, res) => {
    try {
        res.render('signup');
    }
    catch (err) {
        res.status(500).json(err);
    }
});


module.exports = router;