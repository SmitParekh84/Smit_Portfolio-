function showLoader() {
    document.getElementById('loader-container').style.display = 'block';
}

// Function to hide the loader and overlay
function hideLoader() {
    document.getElementById('loader-container').style.display = 'none';
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


// Function to view user data in table format
function viewData() {
    showLoader();

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
        hideLoader();
    }).catch(function(error) {
        console.error('Failed to retrieve user data: ', error);
        hideLoader();
    });

}

// Function to sort user data by last login date in ascending order
function sortDataAscending() {
    showLoader();
    var database_ref = firebase.database().ref('users');

    // Clear previous table if exists
    var tableContainer = document.getElementById('table_container');
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

    // Retrieve user data from Firebase and sort by last login date in ascending order
    database_ref.orderByChild('last_login').once('value').then(function(snapshot) {
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

        // Append the sorted table to the container
        tableContainer.appendChild(table);
        hideLoader();
    }).catch(function(error) {
        console.error('Failed to retrieve and sort user data: ', error);
        hideLoader();
    });
}

// Function to sort user data by last login date in descending order
function sortDataDescending() {
    showLoader();
    var database_ref = firebase.database().ref('users');

    // Clear previous table if exists
    var tableContainer = document.getElementById('table_container');
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

    // Retrieve user data from Firebase and sort by last login date in descending order
    database_ref.orderByChild('last_login').once('value').then(function(snapshot) {
        var sortedData = [];
        snapshot.forEach(function(childSnapshot) {
            sortedData.unshift(childSnapshot.val()); // Insert at the beginning for descending order
        });

        // Iterate over sorted data and render it in table format
        sortedData.forEach(function(userData) {
            var newRow = table.insertRow();
            var emailCell = newRow.insertCell();
            emailCell.textContent = userData.email;
            var fullNameCell = newRow.insertCell();
            fullNameCell.textContent = userData.full_name;
            var lastLoginCell = newRow.insertCell();
            lastLoginCell.textContent = new Date(userData.last_login);
        });

        // Append the sorted table to the container
        tableContainer.appendChild(table);
        hideLoader();
    }).catch(function(error) {
        console.error('Failed to retrieve and sort user data: ', error);
        hideLoader();
    });
}