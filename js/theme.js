const form = document.getElementById("colors");
const inputs = form.getElementsByTagName("input");
const labels = form.getElementsByTagName("label");
const main = document.querySelector("main");

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
  console.log("themechange");
  main.className = `main ${colorId}-theme`;
}
