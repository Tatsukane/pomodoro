let timeLeft = 25 * 60;
let timerInterval;
let currentInterval = 'pomodoro';

const timeLeftEl = document.getElementById('countdown')
const startStopBtn = document.getElementById('start')
const resetBtn = document.getElementById('reset')
const pomodoroIntervalBtn = document.getElementById('focus')
const shortBreakIntervalBtn = document.getElementById('break')
const longBreakIntervalBtn = document.getElementById('long-break')

pomodoroIntervalBtn.addEventListener('click', () => {
	currentInterval = 'pomodoro';
	timeLeft = 25 * 60;
	updateTimeLeftTextContent();
});

shortBreakIntervalBtn.addEventListener('click', () => {
	currentInterval = 'short-break';
	timeLeft = 5 * 60;
	updateTimeLeftTextContent();
});

longBreakIntervalBtn.addEventListener('click', () => {
	currentInterval = 'long-break';
	timeLeft = 10 * 60;
	updateTimeLeftTextContent();
});

startStopBtn.addEventListener('click', () => {
	if (startStopBtn.textContent === 'Start') {
		startTimer();
		startStopBtn.textContent = 'Stop';
	}
	else {
		stopTimer();
	}
});

resetBtn.addEventListener('click', () => {
	stopTimer();
	if (currentInterval === 'pomodoro') {
		timeLeft = 25 * 60;
	}
	else if (currentInterval === 'short-break') {
		timeLeft = 5 * 60;
	}
	else {
		timeLeft = 10 * 60;
	}
	updateTimeLeftTextContent();
	startStopBtn.textContent = 'Start'
});

function startTimer() {
	timerInterval = setInterval(() => {
		timeLeft--;
		updateTimeLeftTextContent();
		if(timeLeft === 0) {
			clearInterval(timerInterval);
			if (currentInterval === 'pomodoro') {
				timeLeft = 5 * 60;
				currentInterval = 'short-break';
				startTimer();
			}
			else if (currentInterval === 'short-break') {
				timeLeft = 10 * 60;
				currentInterval = 'long-break';
				startTimer();
			}
			else {
				timeLeft = 25 * 60;
				currentInterval = 'pomodoro';
			}
		}
	}, 1000)
}

function stopTimer() {
	clearInterval(timerInterval);
	startStopBtn.textContent = 'Start';
}

function updateTimeLeftTextContent() {
	const minutes = Math.floor(timeLeft / 60);
	const seconds = timeLeft % 60;
	timeLeftEl.textContent = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
}