const loginForm = document.querySelector("#loginForm");
const loginEmail = document.querySelector("#loginEmail");
const loginPassword = document.querySelector("#loginPassword");
const loginError = document.querySelector("#loginError");

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
