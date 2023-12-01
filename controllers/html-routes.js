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
        res.render('homepage', books ); 
        // res.status(200).json(books);
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
        const books = bookData.get({ plain: true });
        // res.status(200).json(books);
        res.render('books', books);
    } catch (err) {
        res.status(500).json(err);
    };
});


//GET all reviews
router.get('/review', async (req, res) => {
    const reviewData = await Review.findAll().catch((err) => {
        res.json(err);
    });
    const review = reviewData.map((review) => review.get({ plain: true }));
    res.render('all', reviews);
    // res.status(200).json(review);
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
        // res.status(200).json(review);
      } catch (err) {
          res.status(500).json(err);
      };     
});



module.exports = router;