// document.getElementById("signUp").addEventListener("click", () => {
//     console.log("system....");
//     // event.preventDefault(); // prevent form from submitting

//     const username = document.getElementById('username').value;
//     const password = document.getElementById('password').value;
//     const email=document.getElementById('email').value;

//     // add more fields here if needed
//     let obj={
//         name:username,
//         pass:password,
//         email:email
//     }

//     let detail = JSON.parse(localStorage.getItem('All_users'))
//     if (detail == null) {
//         detail = [];
//         detail.push(obj);
//     } else {
//         detail.push(obj);
//     }
//     // console.log(details);
//     localStorage.setItem('All_users', JSON.stringify(detail));
//     });


// signup.js


// document.addEventListener('DOMContentLoaded', function() {
//     // Get the form element
//     var signupForm = document.getElementById('signup-form');

//     // Add submit event listener to the form
//     signupForm.addEventListener('submit', function(event) {
//         event.preventDefault(); // Prevent the default form submission

//         // Get the form data
//         var formData = new FormData(signupForm);

//         // Create an XMLHttpRequest object
//         var xhr = new XMLHttpRequest();

//         // Configure the request
//         xhr.open('POST', 'signup/'); // Replace '/signup/' with the URL of your Django signup view

//         // Set the response type
//         xhr.responseType = 'json';

//         // Handle the request completion
//         xhr.onload = function() {
//             if (xhr.status === 200) {
//                 // Signup was successful
//                 var response = xhr.response;
//                 // Handle the response data
//                 // You can redirect the user to the login page
//                 window.location.assign("tarun_login.html");// Replace '/login/' with the URL of your login page
//                 // Replace '/login/' with the URL of your login page
//             } else {
//                 // Signup failed
//                 console.error('Error: ' + xhr.status);
//                 // Handle the error response
//                 // You can show an error message to the user
//             }
//         };

//         // Send the request
//         xhr.send(formData);
//     });
// });



// Signup Form Event Listener
const signupForm = document.getElementById('signup-form');
signupForm.addEventListener('submit', function(event) {
  event.preventDefault();
  
  // Retrieve form data
  const username = document.getElementById('username').value;
  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;
  
  // Create user object
  const user = { username, email, password };
  
  // Store user data in session storage
  sessionStorage.setItem('user', JSON.stringify(user));
  
  // Redirect to login page or perform any desired action
  window.location.href = '/';
});








