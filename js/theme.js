const form = document.getElementById("colors");
const inputs = form.getElementsByTagName("input");
const labels = form.getElementsByTagName("label");
const body = document.querySelector("body");
const novaGeracaoLogo = document.querySelector(".nova-geracao");

const defaultTheme = "color6";

setLocalStorageTheme();
changeTheme(localStorage.getItem("theme-color"));

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
  body.className = `container ${colorId}-theme`;
  if (colorId == "color6" && novaGeracaoLogo.classList.contains("hidden")) {
    novaGeracaoLogo.classList.remove("hidden");
  } else {
    novaGeracaoLogo.classList.add("hidden");
  }
  localStorage.setItem("theme-color", colorId);
}

function setLocalStorageTheme() {
  if (localStorage.getItem("theme-color")) {
    changeTheme(localStorage.getItem("theme-color"));
  } else {
    localStorage.setItem("theme-color", defaultTheme);
  }
}
