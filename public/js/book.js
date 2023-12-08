let addReviewButton = document.getElementById('add-new-review-button');
let editReviewButtons = document.querySelectorAll("[id^='edit-delete-review-button']");

if(window.location.href.endsWith('false')){

    let cudErrorMessage = document.getElementById("cud-error-message");
    cudErrorMessage.scrollIntoView({behavior: "smooth"});
}

/*This function displays the form for creating, updating, and deleting reviews 
when the user is creating a review. */
function redirectToCreateReview (event){
    event.preventDefault();

    const id = event.target.getAttribute('data');
    console.log(id);

    document.location.href = `/book/${id}/?displayCudForm=true&newElement=true`;
}

/*This function displays the form for creating, updating, and deleting reviews 
when the user is creating a review. */
function displayEditDeleteForm(event){
    event.preventDefault();

    let bookId = event.target.dataset.bookId
    let reviewId = event.target.dataset.reviewId

    document.location.href = `/book/${bookId}/?displayCudForm=true&newElement=false&reviewId=${reviewId}`
}

if(addReviewButton){

    addReviewButton.addEventListener('click', redirectToCreateReview);

}

if(editReviewButtons){

    editReviewButtons.forEach((button) => button.addEventListener('click', displayEditDeleteForm));
}






