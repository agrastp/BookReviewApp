/* This function takes a review ID and an array of reviews and finds the review that the ID belongs to/*/ 
function getReviewToBeEdited(reviewId, bookReviews){

    reviewInQuestion = bookReviews.find(function(review){

        if(review.id === parseInt(reviewId)){

            return review.id
        }
    });

    if(reviewInQuestion){

        return reviewInQuestion;
    }

    else {

        return null;
    }

    
}

module.exports = getReviewToBeEdited;