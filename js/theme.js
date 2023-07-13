const form = document.getElementById("colors");
const inputs = form.getElementsByTagName("input");
const labels = form.getElementsByTagName("label");
const main = document.querySelector("main");
const novaGeracaoLogo = document.querySelector(".nova-geracao");

const defaultTheme = "color6";

setLocalStorageTheme();
changeTheme(localStorage.getItem("theme"));

form.addEventListener("change", () => {
  changeTheme(getCheckedInputId());
});

function getCheckedInputId() {
  for (let input of inputs) {
    if (input.checked) {
      console.log(input.id);
      return input.id;
    }
  }
}

function changeTheme(colorId) {
  main.className = `main ${colorId}-theme`;
  if (colorId == "color6" && novaGeracaoLogo.classList.contains("hidden")) {
    novaGeracaoLogo.classList.remove("hidden");
  } else {
    novaGeracaoLogo.classList.add("hidden");
  }
  localStorage.setItem("theme", colorId);
}

function setLocalStorageTheme() {
  if (localStorage.getItem("theme")) {
    changeTheme(localStorage.getItem("theme"));
  } else {
    localStorage.setItem("theme", defaultTheme);
  }
}
