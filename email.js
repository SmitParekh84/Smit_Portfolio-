var contactSection = document.getElementById('contact');
if (contactSection.style.display === 'block') {
    // If contact section is visible, set href to #contact
    document.getElementById('contact-link').href = '#contact';
} else {
    // If contact section is hidden, set href to #email-reg
    document.getElementById('contact-link').href = '#email-reg';
}


// Your web app's Firebase configuration
var firebaseConfig = {
    apiKey: "AIzaSyCq3dmPDdCTuuPbssl9XFt5yFy-uc41pkc",
    authDomain: "portfolio-5e191.firebaseapp.com",
    projectId: "portfolio-5e191",
    storageBucket: "portfolio-5e191.appspot.com",
    messagingSenderId: "128121866670",
    appId: "1:128121866670:web:ae7b7806da3ec12342603f",
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
// Initialize variables
const auth = firebase.auth()
const database = firebase.database()

// Set up our register function
function register() {
    // Get all our input fields
    var email = document.getElementById('email').value;
    var full_name = document.getElementById('full_name').value;

    // Validate input fields
    if (validate_email(email) === false) {
        alert('Please provide a valid email address.');

        return;
    }
    if (validate_field(full_name) === false) {
        alert('Please fill in all required fields.');

        return;
    }

    // Check if the user already exists in the database
    var userRef = database.ref('users');
    userRef.once('value', function(snapshot) {
        var users = snapshot.val();
        var userExists = false;
        var userId;

        // Check if the user already exists
        for (var key in users) {
            if (users[key].email === email) {
                userExists = true;
                userId = key;
                break;
            }
        }

        // If the user exists, update their information; otherwise, create a new user
        if (userExists) {
            var updates = {};
            updates['/users/' + userId + '/full_name'] = full_name;
            updates['/users/' + userId + '/last_login'] = Date.now();
            database.ref().update(updates);
            alert('Thank you for visiting again!');
            // Display contact section
            document.getElementById('contact').style.display = 'block';
            // Hide registration form section
            document.getElementById('email-reg').style.display = 'none';
        } else {
            // Move on with Auth
            auth.createUserWithEmailAndPassword(email, full_name)
                .then(function() {
                    // Declare user variable
                    var user = auth.currentUser;

                    // Add this user to Firebase Database
                    var database_ref = database.ref();

                    // Create User data
                    var user_data = {
                        email: email,
                        full_name: full_name,
                        last_login: Date.now()
                    };

                    // Push to Firebase Database
                    database_ref.child('users/' + user.uid).set(user_data);

                    // Display contact section
                    document.getElementById('contact').style.display = 'block';
                    // Hide registration form section
                    document.getElementById('email-reg').style.display = 'none';

                    // Done
                    alert('Thank you for registering!');

                })
                .catch(function(error) {
                    // Firebase will use this to alert of its errors
                    var error_code = error.code;
                    var error_message = error.message;
                    alert(error_message);
                });
        }
    });
}

// Function to view user data in table format
function viewData() {
    // Get reference to the database
    var database_ref = firebase.database().ref('users');

    // Get the table container
    var tableContainer = document.getElementById('table_container');

    // Clear previous table if exists
    tableContainer.innerHTML = '';

    // Create table element
    var table = document.createElement('table');

    // Create table header row
    var headerRow = table.insertRow();
    var headers = ['Email', 'Full Name', 'Last Login'];
    headers.forEach(function(headerText) {
        var headerCell = headerRow.insertCell();
        headerCell.textContent = headerText;
    });

    // Retrieve user data from Firebase
    database_ref.once('value').then(function(snapshot) {
        snapshot.forEach(function(childSnapshot) {
            var userData = childSnapshot.val();

            // Create a new row
            var newRow = table.insertRow();

            // Insert data into cells
            var emailCell = newRow.insertCell();
            emailCell.textContent = userData.email;

            var fullNameCell = newRow.insertCell();
            fullNameCell.textContent = userData.full_name;

            var lastLoginCell = newRow.insertCell();
            lastLoginCell.textContent = new Date(userData.last_login);
        });

        // Append the table to the container
        tableContainer.appendChild(table);
    }).catch(function(error) {
        console.error('Failed to retrieve user data: ', error);
    });
}



// Validate Functions
function validate_email(email) {
    expression = /^[^@]+@\w+(\.\w+)+\w$/
    if (expression.test(email) == true) {
        // Email is good
        return true
    } else {
        // Email is not good
        return false
    }
}



function validate_field(field) {
    if (field == null) {
        return false
    }

    if (field.length <= 0) {
        return false
    } else {
        return true
    }
} // Set up our register function