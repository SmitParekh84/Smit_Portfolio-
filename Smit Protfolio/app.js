const hamburger = document.querySelector('.header .nav-bar .nav-list .hamburger');
const mobile_menu = document.querySelector('.header .nav-bar .nav-list ul');
const menu_item = document.querySelectorAll('.header .nav-bar .nav-list ul li a');
const header = document.querySelector('.header.container');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    mobile_menu.classList.toggle('active');
});

// for skill animation

const names = ['Web Designer', 'Video Editor', 'Social-Media Manager', 'Graphic Designer']; // Define the names to cycle through
const delay = 2000; // Set the delay to 1 second (1000 milliseconds)

let currentIndex = 0; // Initialize the current index

function updateName() {
    const nameElement = document.getElementById('name');
    nameElement.textContent = names[currentIndex]; // Display the name at the current index
    currentIndex = (currentIndex + 1) % names.length; // Move to the next index (loop back to 0 if needed)
}

// Call updateName initially
updateName();

// Set interval to continuously update the name
setInterval(updateName, delay);


// end skill animation



document.addEventListener('scroll', () => {
    var scroll_position = window.scrollY;
    if (scroll_position > 250) {
        header.style.backgroundColor = '#16001E';
    } else {
        header.style.backgroundColor = 'transparent';
    }
});

menu_item.forEach((item) => {
    item.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        mobile_menu.classList.toggle('active');
    });
});


// Add an event listener to the download link
document.getElementById("downloadLink").addEventListener("click", function(event) {
    // Prevent the default behavior of the link (which would be to navigate to "#")
    event.preventDefault();

    // Replace 'path_to_resume' with the actual path to your resume file
    var resumePath = "G:/PI/Smit Protfolio/Smit_Parekh_Resume.pdf";
    var link = document.createElement('a');
    link.href = resumePath;
    link.download = 'resume.pdf'; // You can specify the name of the downloaded file
    document.body.appendChild(link);
    link.click();
    alert("My resume is being downloaded.");
    document.body.removeChild(link);


});


// Add video
// document.addEventListener('DOMContentLoaded', function() {
//     const thumbnails = document.querySelectorAll('.thumbnail');
//     const video = document.getElementById('carVideo');

//     thumbnails.forEach(thumbnail => {
//         thumbnail.addEventListener('click', function() {
//             const videoSource = this.getAttribute('data-video');
//             video.src = videoSource;
//             video.play();

//             // Stop hover animation
//             thumbnails.forEach(thumbnail => {
//                 thumbnail.style.left = '100%';
//             });
//         });
//     });
// });
// function msg() {

// }