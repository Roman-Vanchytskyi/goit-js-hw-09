import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

let ms = null;
let currMs = null;

const startBtn = document.querySelector('button[data-start]');
const days = document.querySelector('[data-days]');
const hours = document.querySelector('[data-hours]');
const minutes = document.querySelector('[data-minutes]');
const seconds = document.querySelector('[data-seconds]');

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    choiseDate();
  },
};

const fp = new flatpickr('#datetime-picker', options);

function choiseDate() {
  if (fp.selectedDates[0] < Date.now()) {
    Notify.failure('Please choose a date in the future');
  } else {
    startBtn.disabled = false;
  }
}

startBtn.addEventListener('click', startTimer);

function addLeadingZero(value) {
  return String(value).padStart(2, '0');
}

function startTimer() {
  startBtn.disabled = true;
  ms = Math.floor(fp.selectedDates[0] - Date.now());
  convertMs(ms);
  days.textContent = convertMs(ms).days;
  hours.textContent = convertMs(ms).hours;
  minutes.textContent = convertMs(ms).minutes;
  seconds.textContent = convertMs(ms).seconds;

  intervalId = setInterval(() => {
    currMs = Math.floor((ms -= 1000));
    if (currMs < 500) {
      clearInterval(intervalId);
    }

    convertMs(currMs);
    days.textContent = convertMs(currMs).days;
    hours.textContent = convertMs(currMs).hours;
    minutes.textContent = convertMs(currMs).minutes;
    seconds.textContent = convertMs(currMs).seconds;
  }, 1000);
}

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = addLeadingZero(Math.floor(ms / day));
  // Remaining hours
  const hours = addLeadingZero(Math.floor((ms % day) / hour));
  // Remaining minutes
  const minutes = addLeadingZero(Math.floor(((ms % day) % hour) / minute));
  // Remaining seconds
  const seconds = addLeadingZero(
    Math.floor((((ms % day) % hour) % minute) / second)
  );

  return { days, hours, minutes, seconds };
}
