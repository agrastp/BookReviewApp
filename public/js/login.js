let passport = require('passport');
let User = require('../../models/User')

let  username = document.querySelector('#username-input').value.trim();
let password = document.querySelector('#password-input').value.trim();

const loginFormHandler = async (e) => {
    e.preventDefault();



    if (username && password) {
        const response = await fetch('/api/users/login', {
            method: 'POST',
            body: JSON.stringify({email, password}),
            headers: {'Content-Type': 'application/json'}
        });

        if (response.ok) {
            document.location.replace('/dashboard');
        }
        else {
            alert(response.statusText);
        }
    }
};

const signupFormHandler = async (e) => {
    e.preventDefault();

    const email = document.querySelector('#email-input').value.trim();

    if (name && email && password) {
        const response = await fetch('api/users', {
            method: 'POST',
            body: JSON.stringify({name, email, password}),
            headers: {'Content-Type': 'application/json'}
        })

        if (response.ok) {
            document.location.replace('/dashboard');
        }
        else {
            alert(response.statusText);
        }
    }
};

document.querySelector('#login-signup-button').addEventListener('submit', loginFormHandler);
//document.querySelector('#signup-submit').addEventListener('submit', signupFormHandler);