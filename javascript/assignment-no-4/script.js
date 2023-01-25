let container = document.querySelector(".container");

function createButton(className) {
  let divVar = document.createElement("div");
  divVar.classList.add(className);
  let btnVar = document.createElement("button");
  btnVar.classList.add(className + "-btn");
  btnVar.innerText = className.charAt(0).toUpperCase() + className.slice(1);
  divVar.appendChild(btnVar);
  return divVar;
}

let topBtns = document.createElement("div");
topBtns.classList.add("switcher");
for (let elem of ["stopwatch", "clock"]) {
  let newBtn = createButton(elem);
  topBtns.appendChild(newBtn);
}
container.appendChild(topBtns);

let display = document.createElement("div");
display.classList.add("display");
display.innerText = "00:00:00";
container.appendChild(display);

let bottomBtns = document.createElement("div");
bottomBtns.classList.add("controls");
for (let elem of ["start", "stop", "reset"]) {
  let newBtn = createButton(elem);
  bottomBtns.appendChild(newBtn);
}
container.appendChild(bottomBtns);

let clockButton = document.querySelector(".clock-btn");
let stopwatchButton = document.querySelector(".stopwatch-btn");
let controls = document.querySelector(".controls");
let startButton = document.querySelector(".start-btn");
let stopButton = document.querySelector(".stop-btn");
let resetButton = document.querySelector(".reset-btn");
let [ms, sec, min, hr] = [0, 0, 0, 0];
let timeout;
let interval;

window.onload = function() {
    stopButton.disabled = true;
    resetButton.disabled = true;
}

function calcTime(hours, minutes, seconds, milliseconds) {
  let h = hours < 10 ? "0" + hours : hours;
  let m = minutes < 10 ? "0" + minutes : minutes;
  let s = seconds < 10 ? "0" + seconds : seconds;
  let ms =
    milliseconds < 10
      ? "00" + milliseconds
      : milliseconds < 100
      ? "0" + milliseconds
      : milliseconds;
  return `${h}:${m}:${s}:${ms}`;
}

function setTime() {
  clearInterval(timeout);
  let now = new Date();
  let [hours, minutes, seconds, milliseconds] = [
    now.getHours() % 12,
    now.getMinutes(),
    now.getSeconds(),
    now.getMilliseconds(),
  ];
    let ampm = hours < 12 ? " AM" : " PM";
  display.innerText = calcTime(hours, minutes, seconds, milliseconds) + ampm;
  timeout = setTimeout(setTime, 10);
}

function startWatch() {
  ms += 10;
  if (ms == 1000) {
    ms = 0;
    sec++;
    if (sec == 60) {
      sec = 0;
      min++;
      if (min == 60) {
        min = 0;
        hr++;
      }
    }
  }

  display.innerText = calcTime(hr, min, sec, ms);
}

stopwatchButton.addEventListener("click", () => {
  clearTimeout(timeout);
  display.innerText = calcTime(hr, min, sec, ms);
  startButton.disabled = false;
  stopButton.disabled = true;
  resetButton.disabled = true;
});

startButton.addEventListener("click", () => {
  clearInterval(interval);
  interval = setInterval(startWatch, 10);
  stopButton.disabled = false;
  resetButton.disabled = false;
});

stopButton.addEventListener("click", () => {
  clearInterval(interval);
});

resetButton.addEventListener("click", () => {
  clearInterval(interval);
  [ms, sec, min, hr] = [0, 0, 0, 0];
  display.innerText = calcTime(hr, min, sec, ms);
  stopButton.disabled = true;
  resetButton.disabled = true;
});

clockButton.addEventListener("click", () => {
  clearInterval(interval);
  setTime();
  controls.childNodes.forEach((elem) => (elem.childNodes[0].disabled = true));
});
