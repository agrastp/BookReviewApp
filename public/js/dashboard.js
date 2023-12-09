import {potentiallyScrollToReview} from './helpers/potentially-scroll-to-review.js';

/* This page contains the front-end javascript logic for when the edit*/
let editReviewButtons = document.querySelectorAll("[id^='edit-button']")
let deleteReviewButtons = document.querySelectorAll("[id^='delete-button']");

editReviewButtons.forEach((button) => button.addEventListener("click", editReview));
deleteReviewButtons.forEach((button) => button.addEventListener("click", deleteReview));

if(window.location.href.endsWith('false')){

    let cudErrorMessage = document.getElementById("cud-error-message");
    cudErrorMessage.scrollIntoView({behavior: "smooth"});
}

potentiallyScrollToReview();

function editReview(event){

    document.location.href = `/dashboard?editReview=true&reviewId=${event.target.dataset.reviewId}`
}

async function deleteReview(event){

    event.preventDefault();

    let id = event.target.dataset.reviewId;
    
    try {

        let response = await fetch(`/api/reviews/${id}`, {

            method: "DELETE",
            headers: {"Content-Type": "application/json"},
        });

        if(response.url.slice(-5) === "login"){
    
            document.location.href = "/login";
    
        } else {
    
            document.location.href = "/dashboard";
        }
        
    } catch(error){

        console.log(error)
    }
}