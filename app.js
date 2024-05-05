const hamburger = document.querySelector('.header .nav-bar .nav-list .hamburger');
const mobile_menu = document.querySelector('.header .nav-bar .nav-list ul');
const menu_item = document.querySelectorAll('.header .nav-bar .nav-list ul li a');
const header = document.querySelector('.header.container');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    mobile_menu.classList.toggle('active');
});

// for skill animation

document.addEventListener('DOMContentLoaded', function(event) {
    // array with texts to type in typewriter
    var dataText = ["Web Developer.", "Video Editor.", "Social-Media Manager.", "Graphic Designer"];

    // type one text in the typewriter
    // keeps calling itself until the text is finished
    function typeWriter(text, i, element, fnCallback) {
        // check if text isn't finished yet
        if (i < (text.length)) {
            // add next character to the target element
            element.innerHTML = text.substring(0, i + 1) + '<span aria-hidden="true"></span>';

            // wait for a while and call this function again for the next character
            setTimeout(function() {
                typeWriter(text, i + 1, element, fnCallback)
            }, 100);
        } else if (typeof fnCallback == 'function') {
            // text finished, call callback if there is a callback function
            setTimeout(fnCallback, 700);
        }
    }

    // start a typewriter animation for a text in the dataText array
    function startTextAnimation(i) {
        var targetElement = document.getElementById('typed-text');
        if (typeof dataText[i] == 'undefined') {
            // If end of array is reached, start again from the beginning
            setTimeout(function() {
                startTextAnimation(0);
            }, 20000);
        } else {
            // text exists! start typewriter animation
            typeWriter(dataText[i], 0, targetElement, function() {
                // after callback (and whole text has been animated), start next text
                startTextAnimation((i + 1) % dataText.length); // Increment i in a circular manner
            });
        }
    }

    // start the text animation
    startTextAnimation(0);
});

// end skill animation

// start scroll animation
$(document).ready(function() {
    // Add smooth scrolling to all links
    $("a").on('click', function(event) {

        // Make sure this.hash has a value before overriding default behavior
        if (this.hash !== "") {
            // Prevent default anchor click behavior
            event.preventDefault();

            // Store hash
            var hash = this.hash;

            // Using jQuery's animate() method to add smooth page scroll
            // The optional number (800) specifies the number of milliseconds it takes to scroll to the specified area
            $('html, body').animate({
                scrollTop: $(hash).offset().top
            }, 800, function() {

                // Add hash (#) to URL when done scrolling (default click behavior)
                window.location.hash = hash;
            });
        } // End if
    });
});

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
    var resumePath = "./resume/Smit_Parekh_Resume.pdf";
    var link = document.createElement('a');
    link.href = resumePath;
    link.download = 'Smit_Parekh_Resume.pdf'; // You can specify the name of the downloaded file
    document.body.appendChild(link);

    // Confirmation dialog
    var confirmation = window.confirm("Do you want to download the resume?");
    if (confirmation) {
        link.click();
        document.body.removeChild(link);
    } else {
        document.body.removeChild(link);
    }
});

$(document).ready(function() {
    // Show or hide the button based on the user's scroll position
    $(window).scroll(function() {
        if ($(this).scrollTop() > 100) {
            $('#scrollToTopBtn').fadeIn();
        } else {
            $('#scrollToTopBtn').fadeOut();
        }
    });

    // Scroll to the top when the button is clicked
    $('#scrollToTopBtn').click(function() {
        $('html, body').animate({ scrollTop: 0 }, 800);
        return false;
    });
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