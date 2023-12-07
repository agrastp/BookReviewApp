let editReviewButtons = document.querySelectorAll("[id^='edit-button']")
let deleteReviewButtons = document.querySelectorAll("[id^='delete-button']");

editReviewButtons.forEach((button) => button.addEventListener("click", editReview));
deleteReviewButtons.forEach((button) => button.addEventListener("click", deleteReview));

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