/* This function takes a review ID and an array of reviews and finds the review that the ID belongs to
If it doesn't find one, the system displays a message to the user that they have performed an invalid redirection.
This error message is for if the user edits the URL to try to gain access to a specific review.*/ 
function getReviewToBeEdited(req, res, bookReviews){

    reviewInQuestion = bookReviews.find(function(review){

        if (review.id === parseInt(req.query.reviewId)){

            return review.id
        }
    });

    if (reviewInQuestion){

        if (reviewInQuestion.user_id !== req.session.loggedInUser.id){

            res.redirect( "/?invalidRedirection=true");
            return;

        } else {

            return reviewInQuestion;
        }

    } else {

        res.redirect( "/?invalidRedirection=true");
        return;
    }
}

module.exports = getReviewToBeEdited;