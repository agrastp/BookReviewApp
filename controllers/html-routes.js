const router = require('express').Router();
const { Book, Review, User } = require('../models');
const baseAuthenticateWhetherLoggedIn = require('../utils/basic-authentication.js');
const getReviewToBeEdited = require('../utils/get-review-to-be-edited.js');
// Import the custom middleware
// const withAuth = require('../utils/auth'); 

// GET all books for homepage sorted by name
router.get('/', async (req, res) => {
    try {
        const bookData = await Book.findAll({
            order: [['title', 'ASC']],
        });
        const books = bookData.map((book) => book.get({ plain: true }));

        let invalidRedirection = undefined;

        if(req.query.invalidRedirection === "true"){

            invalidRedirection = "You have attempted an invalid redirection.  This isn't allowed."

            console.log(invalidRedirection);
        }
      
        res.render('homepage', {
            books, 
            invalidRedirection,
            loggedInUser: req.session.loggedInUser
        }); 
        
      
    } catch (err) {
        res.status(500).json(err);
    }

});

// GET one book
router.get('/book/:id', async (req, res) => {
    try {
        let displayCudForm = false;
        let newElement = false;
        let reviewInQuestion = undefined;
        let errorMessage = undefined;

        const bookData = await Book.findByPk(req.params.id, {
            include: [
                { model: Review, include: [
                    { model: User }
                ]}
            ]
        });

        if (!bookData) {

            res.status(404).json({ message: 'No book with this id!' });
            return;
        }
        const book = bookData.get({ plain: true });

        if(req.query.displayCudForm === "true"){

            displayCudForm = true;
        }

        

        if(req.query.newElement === "true"){

            newElement = true;

        } else if(req.query.newElement === "false"){

            newElement = false;

            let reviewId = req.query.reviewId

            reviewInQuestion = getReviewToBeEdited(reviewId, book.reviews);

            console.log("reviewInQuestion", reviewInQuestion);

            if((reviewInQuestion === null )){

                res.redirect( "/?invalidRedirection=true");
                
            
            } else if(reviewInQuestion.user_id !== req.session.loggedInUser.id){

                res.redirect( "/?invalidRedirection=true");
            }
        }

        if(req.query.valid === "false"){

            errorMessage = `The title and content of a post must not be left blank. A post title can only contain the special characters '!', ':', '?', and '-'
                            and can't start with those characters or end with ':' or '-'.  Try again !!!`
        }
        
        res.render('book', {
            displayCudForm,
            newElement, 
            ...book,
            reviewInQuestion,
            errorMessage,
            loggedInUser: req.session.loggedInUser,

            user_id: req.session.user_id
        });

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

// GET one review by ID
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

//Renders the login page
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

//Renders the signup page
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
        
        } else if (req.query.invalidEmail === "true"){

            errorMessage = "Email addresses must be entered in the format of someone@example.com, with no less than two and no" + 
                           "more than six characters for the top-level domain.  Try again."
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

//Renders the dashboard 
router.get('/dashboard', baseAuthenticateWhetherLoggedIn, async (req, res) => {
    
    try {

        const userData = await User.findByPk(req.session.loggedInUser.id, {
            order: [['createdAt', 'DESC']],
            attributes: {exclude: ['password']},
            include: [{model: Review, include: [{model: Book}]}]
        });

        const user = userData.get({plain: true});

        let reviewInQuestion = undefined;

        let displayCudForm = undefined;

        if(req.query.editReview === "true"){

            displayCudForm = true;
            reviewInQuestion = getReviewToBeEdited(req.query.reviewId, user.reviews);
            user.reviews = [reviewInQuestion];
        }

        if (user.reviews.length === 0){

            user.reviews = null;
        }

        let dashboard = true;

        

        console.log(user);

        // res.set('Cache-Control', 'no-store');
        res.render('dashboard', {
            ...user,
            displayCudForm,
            dashboard,
            reviewInQuestion,
            loggedInUser: req.session.loggedInUser,
            loggedInUsername: req.session.loggedInUser.username
        })
    }
    catch (err) {
        res.status(500).json(err);
    }
});

router.get('/create-update-delete-review/:id', baseAuthenticateWhetherLoggedIn, async (req, res) => {
    try {
        console.log(req.params);
        const bookData = await Book.findByPk(req.params.id);
        
        const book = bookData.get({plain: true});
        console.log(book);

        res.render('create-update-delete-review', {
            book: book,
            loggedInUser: req.session.loggedInUser,
            newElement: true
        });
    }
    catch (err) {
        res.status(500).json(err);
    }
})

module.exports = router;