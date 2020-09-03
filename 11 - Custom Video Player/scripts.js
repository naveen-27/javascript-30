const video = document.querySelector('video');
const playPause = document.querySelector('.toggle');
const volume = document.querySelector('input[name="volume"]');
const speed = document.querySelector('input[name="playbackRate"]');
const pre = document.querySelector('button[data-skip="-10"]');
const post = document.querySelector('button[data-skip="25"]');
const progress = document.querySelector('.progress div');
const progressBar = document.querySelector('.progress');
const toggleScreen = document.querySelector('#toggle-screen');

function togglePlayPause() {
    if (playPause.innerText === '▶') {
        video.play();
        playPause.innerText = '❚ ❚';
    }
    else {
        video.pause();
        playPause.innerText = '▶';
    }
}

function seek(e) {
    let scrubTime = (e.offsetX / progressBar.clientWidth);
    video.currentTime = scrubTime * video.duration;
}

playPause.addEventListener('click', togglePlayPause);
video.addEventListener('click', togglePlayPause);

volume.addEventListener('input', () => {
    video.volume = volume.value;
});

speed.addEventListener('input', () => {
    video.playbackRate = parseFloat(speed.value);
});

pre.addEventListener('click', () => {
    video.currentTime = (video.currentTime - 10 < 0) ? 0 : video.currentTime - 10;
});

post.addEventListener('click', () => {
    video.currentTime = (video.currentTime + 25 > video.duration) ? video.duration : video.currentTime + 25;
});

video.addEventListener('timeupdate', () => {
    let percent = (video.currentTime / video.duration) * 100;
    progress.style.flexBasis = `${percent}%`;
});

progressBar.addEventListener('click', seek);

toggleScreen.addEventListener('click', () => {
    video.requestFullscreen();
})