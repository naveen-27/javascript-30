const video = document.querySelector('.player');
const canvas = document.querySelector('.photo');
const ctx = canvas.getContext('2d');
const strip = document.querySelector('.strip');
const snap = document.querySelector('.snap');
let filter;


async function getVideo() {
  let localMediaStream = await navigator.mediaDevices.getUserMedia({
    audio: false,
    video: true
  });

  video.srcObject = localMediaStream;
  video.play();
}

function paintCanvas() {
  var height = video.videoHeight;
  var width = video.videoWidth;
  canvas.height = height;
  canvas.width = width;
  console.dir(canvas)

  setInterval(() => {
    ctx.drawImage(video, 0, 0, width, height);
    if (filter) {
      let pixels = ctx.getImageData(0, 0, width, height);
      pixels = filter(pixels);
      ctx.putImageData(pixels, 0, 0);
    }
  }, 16);
}

function takePhoto() {
  snap.play();

  const data = canvas.toDataURL('image/jpeg');
  const link = document.createElement('a');
  link.setAttribute('download', 'handsome');
  link.href = data;
  link.innerHTML = `<img src="${data}" alt="Handsome Man" />`;
  strip.insertBefore(link, strip.firstChild);
}

function redEffect(pixels) {
  for (let i = 0; i < pixels.data.length; i += 4) {
    pixels.data[i] += 100;
  }
  return pixels;
}

function greenEffect(pixels) {
  for (let i = 1; i < pixels.data.length; i += 4) {
    pixels.data[i] += 100;
  }
  return pixels;
}

function blueEffect(pixels) {
  for (let i = 2; i < pixels.data.length; i += 4) {
    pixels.data[i] += 100;
  }
  return pixels;
}

getVideo();
video.addEventListener('canplay', paintCanvas);