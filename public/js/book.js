const buttons = document.querySelectorAll('.add-new-review-button');

// Villy: determined the ID
const redirectToCreateReview = (event) => {
    event.preventDefault();

    const id = event.target.getAttribute('data');
    console.log(id);

    document.location.replace(`/create-review/${id}`);
}


buttons.forEach((button) => button.addEventListener('click', redirectToCreateReview));