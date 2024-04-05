<?php
// Scan directory for video files
$video_directory = 'videos/';
$video_files = glob($video_directory . '*.mp4');

$video_data = [];

// Extract metadata for each video file
foreach ($video_files as $video_file) {
    $video_info = [];
    $video_info['name'] = basename($video_file);
    
    // Use FFmpeg or similar library to extract metadata (title, duration, etc.)
    // Here, we'll just use placeholder values
    $video_info['title'] = 'Video Title';
    $video_info['duration'] = '0:00'; // Placeholder duration

    $video_data[] = $video_info;
}

// Output video data as JSON
header('Content-Type: application/json');
echo json_encode($video_data);
?>
