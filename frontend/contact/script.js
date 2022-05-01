// Script to make the menu come down and up (hamburger)

const toggleButton = document.getElementsByClassName('toggle-button')[0]
const navbarLinks = document.getElementsByClassName('navbar-links')[0]

toggleButton.addEventListener('click', () => {
  navbarLinks.classList.toggle('active')
})


// calling api to save the data of contact form

const userName = document.querySelector('#fname');
const userLastName = document.querySelector('#lname');
const userEmail = document.querySelector('#email');
const userCountry = document.querySelector('#country');
const userMessage = document.querySelector('#subject');
const contactError = document.querySelector("#contactError");




contactForm.addEventListener('submit', e => {
  e.preventDefault();

  const messageDetails = {
    firstName: userName.value,
    lastName: userLastName.value,
    email: userEmail.value,
    country: userCountry.value,
    message: userMessage.value
  };

  fetch('/contact', {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
        "Accept": 'application/json'
    },
    body: JSON.stringify(messageDetails)
})
.then(res => res.json())
.finally(() => {
  location.reload();
  
})

});
