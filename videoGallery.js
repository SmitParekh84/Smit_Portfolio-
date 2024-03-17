const main_video = document.querySelector('.main-video video');
const main_video_title = document.querySelector('.main-video .title');
const video_playlist = document.querySelector('.video-playlist .videos');
const total_duration_display = document.querySelector('#total-duration');
const total_videos_display = document.querySelector('#total-videos');

let data = [{
        'id': 'a1',
        'title': 'Motion Grapichs',
        'name': '1-6 Frame.mp4',
        'duration': '0:18',
    },
    {
        'id': 'a2',
        'title': 'v2',
        'name': '40-47 New3.mp4',
        'duration': '0:59',
    },
    {
        'id': 'a3',
        'title': 'v3',
        'name': 'ABroad Solutions + JP Cardona - Agency Spotlight Podcast 2.mp4',
        'duration': '20:28',
    },

    {
        'id': 'a4',
        'title': 'v4',
        'name': 'CB Nectar HR horizontal-.mp4',
        'duration': '0:40',
    },
    {
        'id': 'a5',
        'title': 'v5',
        'name': 'Erik Allen Yt Podcast.mp4',
        'duration': '15:46',
    },
    {
        'id': 'a6',
        'title': 'v6',
        'name': 'H4 SMIT.mp4',
        'duration': '0:12',
    },
    {
        'id': 'a7',
        'title': 'v7',
        'name': 'Jamie Takes_2.mp4',
        'duration': '0:29',
    },

    {
        'id': 'a8',
        'title': 'v8',
        'name': 'MAin.mp4',
        'duration': '0:12',
    },
    {
        'id': 'a9',
        'title': 'v9',
        'name': 'motion .mp4',
        'duration': '0:9',
    },
    {
        'id': 'a10',
        'title': 'v10',
        'name': 'n1.mp4',
        'duration': '0:10',
    },
    {
        'id': 'a11',
        'title': 'v11',
        'name': 'Panorays PRM Training (with bg).mp4',
        'duration': '14:17',
    },
    {
        'id': 'a11',
        'title': 'v12',
        'name': 'UI UX DESIGN.mp4',
        'duration': '14:17',
    },

];
// Calculate total number of videos
const totalVideos = data.length;

// Function to convert time string to seconds
function timeStringToSeconds(timeString) {
    const [minutes, seconds] = timeString.split(':').map(Number);
    return minutes * 60 + seconds;
}

// Calculate total duration
let totalDurationSeconds = 0;
data.forEach(video => {
    totalDurationSeconds += timeStringToSeconds(video.duration);
});
// Convert total duration back to minutes:seconds format
const totalDurationMinutes = Math.floor(totalDurationSeconds / 60);
const totalDurationRemainderSeconds = totalDurationSeconds % 60;
const totalDurationFormatted = `${totalDurationMinutes}:${totalDurationRemainderSeconds < 10 ? '0' : ''}${totalDurationRemainderSeconds}`;

// Display total duration
total_duration_display.textContent = totalDurationFormatted;
total_videos_display.textContent = totalVideos;

// video

function playRandomVideo() {
    // Select a random index from the data array
    const randomIndex = Math.floor(Math.random() * data.length);
    // Get the randomly selected video
    const randomVideo = data[randomIndex];
    // Find the corresponding video element
    const selected_video = document.querySelector(`.video[data-id="${randomVideo.id}"]`);
    // Trigger a click event on the selected video to play it
    selected_video.click();
}

function scrollToMainVideoTitle() {
    main_video_title.scrollIntoView({ behavior: 'smooth' });
}

data.forEach((video, i) => {
    let video_element = `
                <div class="video" data-id="${video.id}">
                    <img src="img/play.svg" alt="">
                    <p>${i + 1 > 9 ? i + 1 : '0' + (i + 1)}. </p>
                    <h3 class="title">${video.title}</h3>
                    <p class="time">${video.duration}</p>
                </div>
    `;
    video_playlist.innerHTML += video_element;
})

window.addEventListener('load', playRandomVideo);
let videos = document.querySelectorAll('.video');
videos[0].classList.add('active');
videos[0].querySelector('img').src = 'img/pause.svg';

videos.forEach(selected_video => {
    selected_video.onclick = () => {

        for (all_videos of videos) {
            all_videos.classList.remove('active');
            all_videos.querySelector('img').src = 'img/play.svg';

        }

        selected_video.classList.add('active');
        selected_video.querySelector('img').src = 'img/pause.svg';

        let match_video = data.find(video => video.id == selected_video.dataset.id);
        main_video.src = 'horizontal_videos/' + match_video.name;
        main_video_title.innerHTML = match_video.title;
    }
});