// This function scrolls to a review that was just created or updated.
export function potentiallyScrollToReview(){

    if(window.location.href.includes("cuReview")){

        let reviewList = undefined;

        if(window.location.href.includes("dashboard")){

            reviewList = document.querySelectorAll('[id^="dashboard-book-review"]');
        
        } else if (window.location.href.includes("book")){

            reviewList = document.querySelectorAll('[id^="single-book-review"]');
        }

        let urlParams = new URLSearchParams(window.location.search)
        let cuReviewParam = urlParams.get('cuReviewId');
    
        reviewList.forEach(review => {
    
            if(review.id.endsWith(cuReviewParam)){
    
                review.scrollIntoView({behavior: "smooth"});
            }
        });
    }
}

