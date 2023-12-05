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
        res.render('homepage', {books}); 
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
        res.render('books', {books});
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
    res.render('all', {reviews});
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

// Villy: render the login page
router.get('/login', async (req, res) => {
    try {
        res.set('Cache-Control', 'no-store');

        let errorMessage = "";
        
        if(req.query.valid === "false"){

            errorMessage = "Your username or password is incorrect.  Try again!!";
        
        } else if (req.query.nullField === "true"){

            errorMessage = "You must enter both the username and the password.  Try again!!";
        
        }
        

        res.render('login-signup', {

            errorMessage,
            loggedInUser: req.session.loggedInUser,
            logInOrSignUp: "Log In"
        });
    }
    catch (err) {
        res.status(500).json(err);
    }
});

// Villy: render the signup page
router.get('/signup', async (req, res) => {
    try {

        res.set('Cache-Control', 'no-store');
        let errorMessage = "";
        
        if(req.query.invalidUsername === "true"){

            errorMessage = "A username can only contain letters and numbers.  Try again!!";
        
        } else if(req.query.duplicateUser === "true"){

            errorMessage = "This username is already taken.  Try again!!";
        
        } else if (req.query.nullField === "true"){

            errorMessage = "You must enter both the username and the password.  Try again!!";
        
        }
        
        res.render('login-signup', {

            errorMessage,

            logInOrSignUp: "Sign Up",
            loggedInUser: req.session.loggedInUsername
        })
    }
    catch (err) {
        res.status(500).json(err);
    }
});

router.get('/dashboard', async (req, res) => {
    

    try {

        res.set('Cache-Control', 'no-store');
        res.render('dashboard', {

        
            loggedInUser: req.session.loggedInUser,
            loggedInUsername: req.session.loggedInUser.username
        })
    }
    catch (err) {
        res.status(500).json(err);
    }
});

// Villy: sorry I don't know how the passport tool works,
//        can you make this route go through the passport verification?
router.get('/create-review', async (req, res) => {
    try {
        res.render('create-review', {
            loggedInUser: req.session.loggedInUser,
            loggedInUsername: req.session.loggedInUser.username
        })
    }
    catch (err) {
        res.status(500).json(err);
    }
})

module.exports = router;