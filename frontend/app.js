const signUpForm = document.querySelector("#signUpForm");
const signUpName = document.querySelector("#name");
const signUpEmail = document.querySelector("#signUpEmail");
const signUpPassword = document.querySelector("#signUpPassword");
const signUpError = document.querySelector("#signUpError");

const loginForm = document.querySelector("#loginForm");
const loginEmail = document.querySelector("#loginEmail");
const loginPassword = document.querySelector("#loginPassword");
const loginError = document.querySelector("#loginError");

signUpForm.addEventListener("submit", e => {
    e.preventDefault()
    const signUpDetails = {
        name: signUpName.value,
        email: signUpEmail.value,
        password: signUpPassword.value
    };

    fetch("api/user/register", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(signUpDetails)
    })
        .then(res => res.json())
        .then(response => {
            if (response.error) {
                signUpError.innerHTML = response.error;
            } else {
                signUpError.innerHTML = "";
                localStorage.setItem("auth-token", response.token);
                location.href = response.redirect;
            }
        });
});

loginForm.addEventListener("submit", e => {
    e.preventDefault();
    const loginDetails = {
        email: loginEmail.value,
        password: loginPassword.value
    }

    fetch("api/user/login", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(loginDetails)
    })
        .then(res => res.json())
        .then(response => {
            if (response.error) {
                loginError.innerHTML = response.error;
            } else {
                loginError.innerHTML = "";
                localStorage.setItem("auth-token", response.token);
                location.href = response.redirect;
            }
        });
});