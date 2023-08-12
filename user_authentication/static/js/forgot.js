// document.getElementById("update").addEventListener("click", (event) => {
//     console.log("system....");
//     event.preventDefault(); // prevent form from submitting
//     let value=false;
//     const username = document.getElementById('username1').value;
//     const password = document.getElementById('password1').value;
//     const email=document.getElementById('email1').value;
//     let users = JSON.parse(localStorage.getItem('users_credential'));
//     let obj1={
//         name:username,
//         pass:password,
//         email:email
//     }
//     if(users==null){
//         alert("No username and Email id Exist");
//     }
//     else{
//         for (i = 0; i < users.length; i++) {
//             if (users[i].name == username) {
//                 if (users[i].email == email) {
//                     console.log("corect");
//                     users.push(obj1);
//                     localStorage.setItem('users_credential', JSON.stringify(users));
//                     alert("Password change Successfully");
//                     window.location.assign("tarun_login.html");
//                     value=true;
//                     return;
//                 }

//             }
            

//     }
//     if(value!=true){
//         alert("User or Email Does Not Exist");
//         window.location.assign("tarun_signup.html");
//     }
    
// }

// // localStorage.setItem('All_users', JSON.stringify());
// })

const changePasswordForm = document.getElementById('change-password-form');
changePasswordForm.addEventListener('submit', function(event) {
    event.preventDefault();
    
    // Retrieve form data
    const username = document.getElementById('username').value;
    const email = document.getElementById('email').value;
    const newPassword = document.getElementById('password').value;
    
    // Perform the password update process
    // You can add your own implementation here
    
    // Simulating a delay of 2 seconds for demonstration purposes
    setTimeout(function() {
        // Display a success message or redirect to a confirmation page
        // alert('Password updated successfully!');
        window.location.href = '/'; // Redirect to the login page after updating the password
    }, 2000);
});

