const selector = document.getElementById("themeSelector");

selector.addEventListener("change", () => {
  document.body.className = selector.value;
  localStorage.setItem("theme", selector.value);
});

const savedTheme = localStorage.getItem("theme");
if (savedTheme) {
  document.body.className = savedTheme;
  selector.value = savedTheme;
}
