const slider = document.getElementById("volume");
const display = document.getElementById("value");  // melhor nome que "value"

function updateDisplay() {
  const minutes = Number(slider.value);
  const formatted = String(minutes).padStart(2, '0'); // 5 → "05", 10 → "10"

  display.textContent = formatted + ":00";

  // Barra de progresso colorida (seu código original tinha um erro de sintaxe)
  const percent = ((minutes - slider.min) / (slider.max - slider.min)) * 100;
  slider.style.background = `linear-gradient(to right, 
        #338a67 0%, 
        #54d8a4 ${percent}%, 
        #555 ${percent}%, 
        #555 100%)`;
}

updateDisplay();
slider.addEventListener("input", updateDisplay);

const minimizarNav = document.getElementById("minimizarNav");
const nav = document.getElementById("nav");
const divNav = document.getElementById("divNav");
minimizarNav.addEventListener("click", () => {
    if (nav.classList.contains("navPequena")) {
        nav.classList.remove("navPequena");
        setTimeout(() => {
            divNav.classList.remove("hidden");
        }, 30);
    } else {
        divNav.classList.add("hidden");
        setTimeout(() => {
            nav.classList.add("navPequena");
        }, 30);
    }
});