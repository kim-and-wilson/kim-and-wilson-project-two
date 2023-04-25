
// pseudo code

// Locate form on page
const formElement = document.querySelector('form');
// when form is submitted, prevent form default on refreshing page
formElement.addEventListener('submit', function(e) {
    e.preventDefault();
    // Assign values to variable for each field type, can use these fields to collect information
    const firstNameElement = document.getElementById('first-name');
    const lastNameElement = document.getElementById('last-name');
    const phoneNumElement = document.getElementById('phone');
    const emailElement = document.getElementById('email');
    const messageElement = document.getElementById('message');
    
    // Error handling, alert user for each field that is missing starting with first name.  If user skips any fields, alert user of earliest missing field
    if (firstNameElement.value == '') {
        alert ('Please provide your first name!');
        return false;
    }
    if (lastNameElement.value == '') {
        alert ('Please provide your last name!');
        return false;
    }
    if (phoneNumElement.value == '') {
        alert ('Please provide your phone number!');
        return false;
    }    
    if (emailElement.value == '') {
        alert ('Please provide your email!');
        return false;
    }
    if (messageElement.value == '') {
        alert ('Please let us know what you are contacting us about!');
        return false;
    }
    else {
        // If all fields are filled in (correct format for phone number and email) then thank the user for their submission
        alert('Thank you for reaching out!  We appreciate your business and we look forward to getting back to you within 24 hours!');

        // Clear fields once form is submitted
        firstNameElement.value = '';
        lastNameElement.value = '';
        phoneNumElement.value = '';
        emailElement.value = '';
        messageElement.value = '';
    }
});


// HAMBURGER MENU

const button = document.getElementById("ham-button");
const nav = document.getElementById("main-menu");

button.addEventListener('click', () => {
  nav.classList.toggle('show');
});