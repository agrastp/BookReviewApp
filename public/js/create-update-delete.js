let enteredTitle = document.getElementById("review-title");
let enteredContent = document.getElementById("review-content");
let createReviewButton = document.getElementById("create-new-review-button");
let updateReviewButton = document.getElementById("update-review-button");
let deleteReviewButton = document.getElementById("delete-review-button");

let trimmedTitle = undefined;
let trimmedContent = undefined;

if((document.location.href.includes("displayCudForm=true")) || (document.location.href.includes("editReview=true"))){

    let createEditReviewForm = document.getElementById("create-review-form");
    createEditReviewForm.scrollIntoView({behavior: "smooth"});
}


//Listeners for buttons
if(createReviewButton){
    
    createReviewButton.addEventListener("click", createReview);
}


if(updateReviewButton){

    updateReviewButton.addEventListener("click", updateReview);
}

if(deleteReviewButton){

    deleteReviewButton.addEventListener("click", deleteReview);
}


async function createReview(event){

    event.preventDefault();

    try{

        if(performValidation() === true){

            let requestBody = generateBody(event)
    
            let response = await fetch ('/api/reviews', {
    
                method: "POST",
                headers: {"Content-Type": "application/json"},
                body: requestBody
            });

            handleRedirection(event, response, "Create");
    
        } else {
    
            document.location.href = `/book/${event.target.dataset.bookId}?displayCudForm=true&newElement=true&valid=false`;
        }
    
    } catch (error){

        console.log(error)
    }

    
}

//Fetch to update a review
async function updateReview(event){
    
    event.preventDefault();

    try {

        if(performValidation() === true){

            let requestBody = generateBody(event)

            let id = event.target.dataset.reviewId;

            let response = await fetch(`/api/reviews/${id}`, {

                method: "PUT",
                headers: {"Content-Type": "application/json"},
                body: requestBody
            });

            handleRedirection(event, response, "Update");

        } else {

            if(document.location.href.includes("/dashboard")){

                document.location.href = `/dashboard/?editReview=true&reviewId=${event.target.dataset.reviewId}&valid=false`;
            
            } else if(document.location.href.includes("/book")){

                document.location.href = `/book/${event.target.dataset.bookId}?displayCudForm=true&newElement=false&reviewId=${event.target.dataset.reviewId}&valid=false`
            }
        }

            

    } catch (error){

        console.log(error)
    }
}

//Fetch to delete a review
async function deleteReview(event){

    event.preventDefault();

    let id = event.target.dataset.reviewId;
    
    try {

        let response = await fetch(`/api/reviews/${id}`, {

            method: "DELETE",
            headers: {"Content-Type": "application/json"},
        });

        handleRedirection(event, response, "Delete");
    
    } catch(error){

        console.log(error)
    }
}

//Directs to either login or homepage
async function handleRedirection(event, response, actionType){

    let appendToRedirection = undefined;

    if(actionType === "Update"){

        appendToRedirection = `/?cuReviewId=${event.target.dataset.reviewId}`
    
    } else if (actionType === "Create"){

        actualReview = await response.json();

        appendToRedirection = `/?cuReviewId=${actualReview.id}`

    } else {

        appendToRedirection = "";
    }

    if(response.url.slice(-5) === "login"){

        document.location.href = "/login";

    } else if(document.location.href.includes("/dashboard")){

        document.location.href = "/dashboard" + appendToRedirection;
    
    } else{

        document.location.href = `/book/${event.target.dataset.bookId}` + appendToRedirection;
    }
}


function performValidation(){

    trimmedTitle = enteredTitle.value.trim();

    trimmedContent = enteredContent.value.trim();

    let titleRegex = /^[a-zA-Z0-9 ][a-zA-Z0-9-:!? ]*[a-zA-Z0-9!? ]?$/

    let passingRegex = titleRegex.test(trimmedTitle.value); 

    if((passingRegex !== false) && (trimmedContent !== "") && (trimmedTitle !== "")){

        return true;

    } else {

        return false;
    }
}

//Generates Book Review
function generateBody(event){

    let body = undefined;

        body = JSON.stringify({title: trimmedTitle, content: trimmedContent, book_id: 
                               event.target.dataset.bookId, user_id: event.target.dataset.userId})
    return body;
}

