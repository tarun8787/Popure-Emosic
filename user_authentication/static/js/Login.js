// document.getElementById('LogIn').addEventListener("click", () => {
//     let value = false;
//     const username = document.getElementById('username').value;
//     const password = document.getElementById('password').value;
//     let users = JSON.parse(localStorage.getItem('All_users'));
//     console.log(users);
//     if (users != null) {
//         for (i = 0; i < users.length; i++) {
//             if (users[i].name == username) {
//                 if (users[i].pass == password) {
//                     value = true;
//                 }
//             }
//             // if (value == true) {
//             //     alert('Login Succesfully');
//             //     var a = document.getElementById('log'); //or grab it by tagname etc
//             //     a.href = "main.html"

//             //     return;
//             // }
//         }
//         if (value == false) {
//             alert('Incorrect Name and Password. You can sign Up if uh r visiting for the first Time');
//         }
//     }
//     else {
//         alert('User not exist');
//     }

// })



// signup.js

// login.js

// document.addEventListener('DOMContentLoaded', function() {
//     // Get the form element
//     var loginForm = document.getElementById('login-form');

//     // Add submit event listener to the form
//     loginForm.addEventListener('submit', function(event) {
//         event.preventDefault(); // Prevent the default form submission

//         // Get the form data
//         var formData = new FormData(loginForm);

//         // Create an XMLHttpRequest object
//         var xhr = new XMLHttpRequest();

//         // Configure the request
//         xhr.open('POST', '/login/'); // Replace '/login/' with the URL of your Django login view

//         // Set the request headers if necessary
//         // xhr.setRequestHeader('X-CSRFToken', '{{ csrf_token }}');

//         // Set the response type
//         xhr.responseType = 'json';

//         // Handle the request completion
//         xhr.onload = function() {
//             if (xhr.status === 200) {
//                 // Request was successful
//                 var response = xhr.response;
//                 // Handle the response data
//                 // You can redirect the user to a different page or show a success message
//             } else {
//                 // Request failed
//                 console.error('Error: ' + xhr.status);
//                 // Handle the error response
//                 // You can show an error message to the user
//             }
//         };

//         // Send the request
//         xhr.send(formData);
//     });
// });



const loginForm = document.getElementById('login-form');
loginForm.addEventListener('submit', function(event) {
    event.preventDefault();
    
    // Retrieve form data
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    
    // Retrieve stored user data from session storage
    const storedUser = sessionStorage.getItem('user');
    
    if (storedUser) {
        // Parse stored user data
        const user = JSON.parse(storedUser);
        
        // Compare login credentials with stored user data
        if (email === user.email && password === user.password) {
            // Login successful, proceed with desired action
            // alert('Login successful!');
            // Redirect to another page or perform any desired action
            window.location.href = '/main'
        } else {
            // Login failed, display error message
            alert('Invalid email or password!');
        }
    } else {
        // No user data found, display error message or handle accordingly
        alert('User not found!');
    }
});