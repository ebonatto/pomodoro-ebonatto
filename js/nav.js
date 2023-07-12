const timerButton = document.getElementById("timer-button");
const configButton = document.getElementById("config-button");

const configDiv = document.querySelector(".config");
const timerDiv = document.querySelector(".timer");

// timerButton.addEventListener("click", () => {
//   document.querySelector(".config").classList.add("hidden");
//   document.querySelector(".timer").classList.remove("hidden");
// });

configButton.addEventListener("click", () => switchTimerConfig());

function switchTimerConfig() {
  document.querySelector(".timer").classList.toggle("hidden");
  document.querySelector(".config").classList.toggle("hidden");
  console.log("switch");
}
