function getReviewToBeEdited(req, bookReviews){

    reviewInQuestion = bookReviews.find(function(review){

        console.log("review id", review.id)
        console.log("req.query.reviewId", req.query.reviewId)

        if(review.id === parseInt(req.query.reviewId)){

            return review
        }
    });

    return reviewInQuestion;
}

module.exports = getReviewToBeEdited;