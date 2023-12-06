let enteredTitle = document.getElementById("review-title");
let enteredContent = document.getElementById("review-content");
let createReviewButton = document.getElementById("create-new-review-button");
let updateReviewButton = document.getElementById("update-review-button");
let deleteReviewButton = document.getElementById("delete-review-button");

let trimmedTitle = undefined;
let trimmedContent = undefined;


//Listeners for buttons
createReviewButton.addEventListener("click", createReview);


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

            let requestBody = generateBody()
    
            let response = await fetch ('/api/reviews', {
    
                method: "POST",
                headers: {"Content-Type": "application/json"},
                body: requestBody
            });

            handleRedirection(response);
    
        } else {
    
            document.location.href = "/create-review?valid=false";
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

            let requestBody = generateBody()

            let id = event.target.dataset.editReviewId;

            let response = await fetch (`/api/reviews/${id}`, {

                method: "UPDATE",
                headers: {"Content-Type": "application/json"},
                body: requestBody
            });

            handleRedirection(response);

        } else {

            document.location.href = "/create-review?valid=false";
        }

    } catch (error){

        console.log(error)
    }
}

//Fetch to delete a review
async function deleteReview(event){

    event.preventDefault();

    let id = event.target.dataset.editElementId;
    
    try {

        let response = await fetch(`/api/reviews${id}`, {

            method: "DELETE",
            headers: {"Content-Type": "application/json"},
        });

        handleRedirection(response);
    
    } catch(error){

        console.log(error)
    }
}

//Directs to either login or homepage
function handleRedirection(response){

    if(response.url.slice(-5) === "login"){

        document.location.href = "/login";
    
    } else{

        document.location.href = "/";
    }
}


function performValidation(){

    trimmedTitle = enteredTitle.value.trim();

    trimmedContent = enteredContent.value.trim();

    let titleRegex = /^[a-zA-Z0-9 ][a-zA-Z0-9-:!? ]*[a-zA-Z0-9!? ]?$/

    let passingRegex = titleRegex.test(trimmedTitle.value); 

    if((passingRegex !== false) && (trimmedContent !== "")){

        return true;

    } else {

        return false;
    }
}

//Generates Book Review
function generateBody(){

    let body = undefined;

        body = JSON.stringify({title: trimmedTitle, content: trimmedContent, book_id: 
                                createReviewButton.dataset.bookId, user_id: createReviewButton.dataset.userId})
    return body;
}

