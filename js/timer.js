// VARS

// Sound
let alarm = new Audio("js/alarm.mp3");
// Timers vars
let minute = 0;
let second = 0;

// Minute and second as str in an array - ["01", "23"]
let strTime;

// Saves initial time
let initialTime;

// Runs interval
let cron;

// Mark if timer is running
let running = false;

// Menu clicks function
let changedByClick;

// Elements
const selectButtons = document.forms["select-botoes"].elements["timer-select"];
const startPauseButton = document.getElementById("start-pause");
const resetButton = document.getElementById("reset");
const skipButton = document.getElementById("skip");
const saveButton = document.getElementById("save");
const minuteSpan = document.getElementById("minute");
const secondSpan = document.getElementById("second");

// Defines the stage of the sequence and tab titles
let stageNow = 0;
const sequence = ["pomodoro", "short-break", "pomodoro", "long-break"];
const title = ["Pomodoro", "Short Break", "Pomodoro", "Long Break"];

// Const for the circle
const FULL_DASH_ARRAY = 283;

// END VARS

// Sets buttons
resetButton.addEventListener("click", () => resetTimer());
skipButton.addEventListener("click", () => skipTimer());
saveButton.addEventListener("click", () => {
  changeTimer();
  switchTimerConfig();
});
document.forms["select-botoes"].addEventListener("change", () => {
  changedByClick = true;
  changeTimer();
});

// Sets initial timer
setLocalStorage();
document.getElementById(`${sequence[stageNow]}-select`).checked = true;
changeTimer();
minuteSpan.innerText = returnData(minute);
secondSpan.innerText = returnData(second);

// FUNCTIONS

function startTimer() {
  pauseTimer();
  running = true;
  changeStartPauseButton();
  cron = setInterval(() => {
    timer();
  }, 1000);
}

function pauseTimer() {
  strTime = [returnData(minute), returnData(second)];
  clearInterval(cron);
  running = false;
  changeStartPauseButton();
  document.title = strTime[0] + ":" + strTime[1] + " - " + title[stageNow];
}

function resetTimer() {
  pauseTimer();
  minute = tempoInicial;
  second = 0;
  strTime = [returnData(tempoInicial), returnData(second)];
  minuteSpan.innerText = strTime[0];
  secondSpan.innerText = strTime[1];
  document.title = strTime[0] + ":" + strTime[1] + " - " + title[stageNow];
  setCircleDasharray();
}

function skipTimer() {
  stageNow = stageNow == 3 ? 0 : stageNow + 1;
  document.getElementById(`${sequence[stageNow]}-select`).checked = true;
  changeTimer();
  document.title = strTime[0] + ":" + strTime[1] + " - " + title[stageNow];
}

function timer() {
  if ((second -= 1) < 0) {
    if (minute > 0) {
      second = 59;
      minute--;
    } else {
      second = 0;
      skipTimer();
      pauseTimer();
      alarm.play();
    }
  }

  strTime = [returnData(minute), returnData(second)];
  minuteSpan.innerText = strTime[0];
  secondSpan.innerText = strTime[1];
  document.title = strTime[0] + ":" + strTime[1] + " - " + title[stageNow];

  setCircleDasharray();
}

function returnData(input) {
  return input >= 10 ? input : `0${input}`;
}

function changeTimer() {
  if (selectButtons[0].checked) {
    minute = document.getElementById("short-break-config").value;
    stageNow = 1;
  } else if (selectButtons[1].checked) {
    minute = document.getElementById("pomodoro-config").value;
    if (changedByClick) {
      stageNow = 0;
      changedByClick = false;
    }
  } else {
    minute = document.getElementById("long-break-config").value;
    stageNow = 3;
  }
  tempoInicial = minute;
  second = 0;
  changeLocalStorage();
  resetTimer();
}

function changeStartPauseButton() {
  if (running) {
    startPauseButton.innerText = "Pause";
    startPauseButton.addEventListener("click", () => pauseTimer());
  } else {
    startPauseButton.innerText = "Start";
    startPauseButton.addEventListener("click", () => startTimer());
  }
}

function calculateTimeFraction() {
  let result = (minute * 60 + second) / (tempoInicial * 60);
  result = result > 0 ? result : 0;
  return result;
}

// Update the dasharray value as time passes, starting with 283
function setCircleDasharray() {
  const circleDasharray = `${(
    calculateTimeFraction() * FULL_DASH_ARRAY
  ).toFixed(0)} 283`;
  document
    .getElementById("base-timer-path-remaining")
    .setAttribute("stroke-dasharray", circleDasharray);
}

function setLocalStorage() {
  if (localStorage.length > 0) {
    stageNow = JSON.parse(localStorage.getItem("stage"));
    document.getElementById("short-break-config").value = JSON.parse(
      localStorage.getItem("short-break")
    );
    document.getElementById("pomodoro-config").value = JSON.parse(
      localStorage.getItem("pomodoro")
    );
    document.getElementById("long-break-config").value = JSON.parse(
      localStorage.getItem("long-break")
    );
  } else {
    localStorage.setItem("stage", JSON.stringify(0));
    localStorage.setItem("short-break", JSON.stringify(5));
    localStorage.setItem("pomodoro", JSON.stringify(25));
    localStorage.setItem("long-break", JSON.stringify(15));
  }
}

function changeLocalStorage() {
  localStorage.setItem("stage", JSON.stringify(stageNow));
  localStorage.setItem(
    "short-break",
    JSON.stringify(document.getElementById("short-break-config").value)
  );
  localStorage.setItem(
    "pomodoro",
    JSON.stringify(document.getElementById("pomodoro-config").value)
  );
  localStorage.setItem(
    "long-break",
    JSON.stringify(document.getElementById("long-break-config").value)
  );
}
