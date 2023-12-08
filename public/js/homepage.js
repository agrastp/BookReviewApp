/*This page contains the front end Javascript for the homepage, for adding event listeners
for redirecting the user to the page with a single book.*/


const buttons = document.querySelectorAll('.add-review-button-homepage');
const bookImage = document.querySelectorAll('.book-image-redirect');

// const redirectToCreateReview = (event) => {
    
//     event.preventDefault();

//     const id = event.target.getAttribute('data');

//     document.location.replace(`/book/${id}`);
// }

const redirectToBookPage = (event) => {
    event.preventDefault();

    const id = event.target.getAttribute('data');

    document.location.replace(`/book/${id}`);
}

buttons.forEach((button) => button.addEventListener('click', redirectToBookPage));
bookImage.forEach((button) => button.addEventListener('click', redirectToBookPage))