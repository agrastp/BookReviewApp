let editReviewButtons = document.querySelectorAll("[id^='edit-button']")
let deleteReviewButtons = document.getElementById("[id^='delete-button']");

editReviewButtons.forEach((button) => button.addEventListener("click", editReview));
deleteReviewButtons.forEach((button) => button.addEventListener("click", deleteReview));

function editReview(event){

    document.location.href = `/dashboard?editReview=true&reviewId=${event.target.dataset.reviewId}`
}

function deleteReview(){

}