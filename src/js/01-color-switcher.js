const startBtn = document.querySelector('button[data-start]');
const stopBtn = document.querySelector('button[data-stop]');
const body = document.querySelector('body');
let intervalId = null;

startBtn.addEventListener('click', startChangeColor);
stopBtn.addEventListener('click', stopChangeColor);

function startChangeColor() {
  intervalId = setInterval(setColor, 1000);
  stopBtn.disabled = false;
  startBtn.disabled = true;
}

function stopChangeColor() {
  clearInterval(intervalId);
  stopBtn.disabled = true;
  startBtn.disabled = false;
}

function setColor() {
  body.style.backgroundColor = getRandomHexColor();
}

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}
