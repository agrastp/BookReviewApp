
let loginSignupButton = document.getElementById('login-signup-button');

loginSignupButton.addEventListener('click', (event) =>{

    if(loginSignupButton.textContent === "Log In!"){

        loginFormHandler(event);

    } else if(loginSignupButton.textContent === "Sign Up!"){

        signupFormHandler(event);
    }
});

let  usernameInput = document.getElementById('username-input');
let passwordInput = document.getElementById('password-input');


async function loginFormHandler(event){

    event.preventDefault();

    let username = usernameInput.value.trim();
    let password = passwordInput.value.trim();
    


    if (username && password) {
        const response = await fetch('/api/users/login', {
            method: 'POST',
            body: JSON.stringify({username, password}),
            headers: {'Content-Type': 'application/json'}
        });

        if(response.url.slice(-9) === 'dashboard'){

            window.location.replace('./dashboard');
        }

        if(response.url.slice(-5) === 'false' && response.redirected === true){

            document.location.href = '/login?valid=false';
        }
    
    } else {

        document.location.href = '/login?nullField=true'
    }
};

async function signupFormHandler(event) {

    event.preventDefault()

    let username = usernameInput.value.trim();
    let password = passwordInput.value.trim();


    if (username && password) {
        const response = await fetch('api/users/login', {
            method: 'POST',
            body: JSON.stringify({username, password}),
            headers: {'Content-Type': 'application/json'}
        });

        if(response.url.slice(-9) === 'dashboard'){

            window.location.replace('./dashboard');
        }

        if(response.url.slice(-5) === 'false' && response.redirected === true){

            document.location.href = '/signup?taken=true';
        }

        if(response.url.slice(-5) === 'null' && response.redirected === true){

            document.location.href = '/signup?field=null';
        }
    }
};