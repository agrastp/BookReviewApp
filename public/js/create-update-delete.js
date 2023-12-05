let enteredTitle = document.getElementById("title");
let enteredContent = document.getElementById("content");
let createReviewButton = document.getElementById("create-review-button");
let updateReviewButton = document.getElementById("update-review-button");
let deleteReviewButton = document.getElementById("delete-review-button");


createReviewButton.addEventListener("click", createReview);
updateReviewButton.addEventListener("click", updateReview);
deleteReviewButton.addEventListener("click", deleteReview);

async function createReview(){

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

async function updateReview(event){
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

async function deleteReview(event){

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

function handleRedirection(response){

    if(response.url.slice(-5) === "login"){

        document.location.href = "/login";
    
    } else {

        document.location.href = "/";

    }
}

function performValidation(){

    let trimmedTitle = enteredTitle.trim();

    let trimmedContent = enteredContent.trim();

    let titleRegex = /^[a-zA-Z0-9 ][a-zA-Z0-9-:!? ]*[a-zA-Z0-9!? ]?$/

    let passingRegex = titleRegex.test(trimmedTitle.value); 

    if((passingRegex !== false) && (trimmedContent !== "")){

        return true;

    } else {

        return false;
    }
}

function generateBody(){

    let body = undefined;

        body =  JSON.stringify({title: trimmedTitle.value, content: trimmedContent.value, book_id: 
                                createReviewButton.dataset.book_id, user_id: createReviewButton.dataset.user_id})
    return body;
}

// if(performValidation())