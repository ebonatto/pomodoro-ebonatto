const themeButton = document.getElementById("theme-button");
const configButton = document.getElementById("config-button");

const themeDiv = document.querySelector(".theme");
const timerDiv = document.querySelector(".timer");
const configDiv = document.querySelector(".config");

// timerButton.addEventListener("click", () => {
//   document.querySelector(".config").classList.add("hidden");
//   document.querySelector(".timer").classList.remove("hidden");
// });

configButton.addEventListener("click", () => switchTimerConfig());
themeButton.addEventListener("click", () => switchTimerTheme());

function switchTimerConfig() {
  if (configDiv.classList.contains("hidden")) {
    configDiv.classList.remove("hidden");
    timerDiv.classList.add("hidden");
    themeDiv.classList.add("hidden");
  } else {
    configDiv.classList.add("hidden");
    timerDiv.classList.remove("hidden");
  }
}

function switchTimerTheme() {
  if (themeDiv.classList.contains("hidden")) {
    themeDiv.classList.remove("hidden");
    timerDiv.classList.add("hidden");
    configDiv.classList.add("hidden");
  } else {
    themeDiv.classList.add("hidden");
    timerDiv.classList.remove("hidden");
  }
}
