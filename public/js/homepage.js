//Create a review page

const buttons = document.querySelectorAll('.add-review-button-homepage');

const redirectToCreateReview = (event) => {
    
    event.preventDefault();

    const id = event.target.getAttribute('data');
    console.log(id);

    document.location.replace(`/book/${id}`);
}


buttons.forEach((button) => button.addEventListener('click', redirectToCreateReview));