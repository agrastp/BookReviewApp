//Create a review page

const buttons = document.querySelectorAll('.add-review-button-homepage');
const bookImage = document.querySelectorAll('.book-image-redirect');

const redirectToCreateReview = (event) => {
    
    event.preventDefault();

    const id = event.target.getAttribute('data');
    console.log(id);

    document.location.replace(`/book/${id}`);
}

const redirectToBookPage = (event) => {
    event.preventDefault();

    const id = event.target.getAttribute('data');
    console.log(id);

    document.location.replace(`/book/${id}`);
}

buttons.forEach((button) => button.addEventListener('click', redirectToCreateReview));
bookImage.forEach((button) => button.addEventListener('click', redirectToBookPage))