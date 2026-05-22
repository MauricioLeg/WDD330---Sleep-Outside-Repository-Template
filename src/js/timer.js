
const cd = document.querySelector('#timer');
const startBtn = document.querySelector('button');
const body = document.querySelector('body');

let time = 10;
let interval = null;
let isPaused = false;

// Create pause/resume button but don't add to DOM yet
const pauseBTN = document.createElement('button');
pauseBTN.classList.add('pauseBtn');
pauseBTN.textContent = 'Pause';
pauseBTN.style.display = 'none';
body.appendChild(pauseBTN);

function updateTimerDisplay() {
    cd.innerHTML = `Countdown: ${time}`;
}

function startTimer() {
    updateTimerDisplay();
    interval = setInterval(() => {
        if (!isPaused) {
            if (time > 0) {
                time--;
                updateTimerDisplay();
            } else {
                clearInterval(interval);
                interval = null;
                cd.innerHTML = 'Time`s up!';
                pauseBTN.style.display = 'none';
                startBtn.disabled = false;
            }
        }
    }, 1000);
}

startBtn.addEventListener('click', () => {
    if (interval === null) {
        // Start timer
        time = 10;
        isPaused = false;
        startBtn.disabled = true;
        pauseBTN.textContent = 'Pause';
        pauseBTN.style.display = 'inline-block';
        startTimer();
    }
});

pauseBTN.addEventListener('click', () => {
    if (interval !== null) {
        isPaused = !isPaused;
        pauseBTN.textContent = isPaused ? 'Resume' : 'Pause';
    }
});