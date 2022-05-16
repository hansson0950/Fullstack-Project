// Script to make the menu come down and up (hamburger)

const toggleButton = document.getElementsByClassName('toggle-button')[0];
const navbarLinks = document.getElementsByClassName('navbar-links')[0];

toggleButton.addEventListener('click', () => {
    navbarLinks.classList.toggle('active');
});

window.onload = function initialize() {
    const orderID = localStorage.getItem("order-id")
    console.log(orderID);
    fetch("/api/orders/" + orderID, { method: "GET" })
    .then(res => res.json())
    .then(response => {
        console.log(response);
    });
};