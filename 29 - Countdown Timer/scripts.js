function startTimer(duration) {
  if (interval) clearInterval(interval);

  let startTime = Date.now();
  let endTime = startTime + duration;
  
  interval = setInterval(() => {
    let remaining = endTime - Date.now();
    let secsLeft = Math.ceil((remaining / 1000) + 1);
    let minsLeft = Math.floor(secsLeft / 60);
    secsLeft %= 60;

    display.innerText = `${minsLeft}:${secsLeft}`;

    if (secsLeft < 0) {
      clearInterval(interval);
      display.innerText = '';
      beBack.innerText = 'Finished';
    };
  }, 1000);

  beBack.innerText = `Be back at ${new Date(endTime).toString().slice(16, 24)}`;
}

const timers = document.querySelectorAll('.timer__button');
const display = document.querySelector('.display__time-left');
const beBack = document.querySelector('p');
let interval;

timers.forEach(timer => timer.addEventListener('click', (e) => {
  startTimer(parseInt(e.target.dataset.time));
}));

document.querySelector('form').addEventListener('submit', (e) => {
  e.preventDefault();
  let durationInSecs = parseInt(e.target[0].value) * 60000;
  startTimer(durationInSecs);
});