// ==================== ELEMENTOS DO DOM ====================
const slider = document.querySelector("#volume");
const display = document.querySelector("#value");
const timesDone = document.querySelector("#timesDone");
const planta = document.querySelector("#planta");
const growthLevel = document.querySelector("#growthLevel");
const btntarefa = document.querySelector("#tarefa");

const main = document.querySelector("#main");
const nav = document.querySelector("#nav");
const aside = document.querySelector("#aside");

const divNav = document.querySelector("#divNav");
const divAside = document.querySelector("#divAside");

const minimizarNav = document.querySelector("#minimizarNav");
const minimizarAside = document.querySelector("#minimizarAside");
const minimizarTimer = document.querySelector("#minimizarTimer")

const start = document.querySelector("#start");
const pause = document.querySelector("#pause");
const reset = document.querySelector("#reset");

const overlay = document.querySelector("#overlay");
const input = document.querySelector("#tarefaInput");
const fechar = document.querySelector("#fecharTarefa");
const confirmar = document.querySelector("#confirmarTarefa");

// ==================== VARIÁVEIS GLOBAIS ====================
let estagioAdquirido = '';
let nomeEstagioAdquirido = '';
let contadorTimes = 0;
let time = 0;
let interval = null;
let tagAtual = "";

// ==================== FUNÇÃO DE ATUALIZAR DISPLAY ====================
function updateDisplay() {
    const minutes = Number(slider.value);
    const formatted = String(minutes).padStart(2, '0');
    display.textContent = formatted + ":00";

    const percent = ((minutes - slider.min) / (slider.max - slider.min)) * 100;
    slider.style.background = `linear-gradient(to right, 
        #338a67 0%, 
        #54d8a4 ${percent}%, 
        #555 ${percent}%, 
        #555 100%)`;

    if (minutes >= 150) {
        planta.textContent = "💫🍅";
        growthLevel.textContent = "Tomate Supremo! 💫";
        estagioAdquirido = "💫🍅";
        nomeEstagioAdquirido = "Tomate Supremo";
    } else if (minutes >= 120) {
        planta.textContent = "✨🍅";
        growthLevel.textContent = "Tomate Brilhante! ✨";
        estagioAdquirido = "✨🍅";
        nomeEstagioAdquirido = "Tomate brilhante";
    } else if (minutes >= 90) {
        planta.textContent = "🍅";
        growthLevel.textContent = "Tomate Maduro! 🍅";
        estagioAdquirido = "🍅";
        nomeEstagioAdquirido = "Tomate Maduro";
    } else if (minutes >= 60) {
        planta.textContent = "🟢";
        growthLevel.textContent = "Tomate Verde! 🟢";
        estagioAdquirido = "🟢";
        nomeEstagioAdquirido = "Tomate Verde";
    } else if (minutes >= 30) {
        planta.textContent = "🌿";
        growthLevel.textContent = "Planta Crescendo! 🌿";
        estagioAdquirido = "🌿";
        nomeEstagioAdquirido = "Planta";
    } else {
        planta.textContent = "🌱";
        growthLevel.textContent = "Brotando! 🌱";
        estagioAdquirido = "🌱";
        nomeEstagioAdquirido = "Broto";
    }
}

updateDisplay();
slider.addEventListener("input", updateDisplay);

// ==================== 5. FUNÇÃO DO TIMER ====================
function updateTimerDisplay() {
    const min = String(Math.floor(time / 60)).padStart(2, "0");
    const sec = String(time % 60).padStart(2, "0");
    display.textContent = `${min}:${sec}`;
}

function addTimeDone(segundos) {
    if (timesDone.textContent.includes("There hasn't been any session yet.")) {
        timesDone.innerHTML = "";
    }

    contadorTimes++;

    const item = document.createElement("div");
    item.classList.add("time-item");

    const minutos = Math.floor(segundos / 60);
    const segundosRestantes = segundos % 60;
    const tempoFormatado = `${String(minutos).padStart(2, '0')}:${String(segundosRestantes).padStart(2, '0')}`;

    const tomateIcon = estagioAdquirido;
    const tomateName = nomeEstagioAdquirido;
    const nomeTag = btntarefa.textContent;

    item.innerHTML = `
        <div class="time-session">Session - ${contadorTimes}</div>
        <div class="time-icon">${tomateIcon}</div>
        <div class="time-stage">${tomateName}</div>
        <div class="time-duration">${tempoFormatado}</div>
        <div class="time-tag">Tag - ${nomeTag}</div>
    `;
    timesDone.insertBefore(item, timesDone.firstChild);
}

// ==================== 7. MODAL DE TAG ====================

btntarefa.addEventListener("click", () => {
    overlay.classList.add("active")
    input.focus();
});

function fecharModal() {
    overlay.classList.remove("active");
}

fechar.addEventListener("click", fecharModal);

confirmar.addEventListener("click", () => {
    const tarefa = input.value.trim();

    if (tarefa) {
        btntarefa.textContent = tarefa;
        fecharModal();
    } else {
        alert("Please, Enter a tag!");
    }
});

overlay.addEventListener("click", (e) => {
    if (e.target === overlay) {
        fecharModal();
    }
});

// ==================== 8. CONTROLES DE NAVEGAÇÃO ====================

function toggleClassOnClick(button, target, className) {
    button.addEventListener("click", () => {
        target.classList.toggle(className);
    });
}
window.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
        fecharModal();
    }
});
toggleClassOnClick(minimizarNav, nav, "navPequena");
toggleClassOnClick(minimizarAside, aside, "asidePequena");
toggleClassOnClick(minimizarAside, main, "asideReduzido");

minimizarTimer.addEventListener('click', () => {
    divNav.classList.toggle('minimizado');
    divNav.style.transition = "transform 0.4s cubic-bezier(0.4, 0, 0.2, 1), opacity 0.4s cubic-bezier(0.4, 0, 0.2, 1);";

    if (divNav.classList.contains('minimizado')) {
        minimizarTimer.textContent = '> Timer';
    } else {
        minimizarTimer.textContent = 'v Timer';
    }
});

// ==================== 9. CONTROLES DO TIMER ====================
start.addEventListener("click", () => {
    if (interval) return;
    time = Number(slider.value) * 60;
    let tempoTotal = time;
    interval = setInterval(() => {
        if (time > 0) {
            time--;
            updateTimerDisplay();
            slider.disabled = true;
        } else {
            clearInterval(interval);
            interval = null;
            slider.disabled = false;
            addTimeDone(tempoTotal);
        }
    }, 1000);
});

pause.addEventListener("click", () => {
    clearInterval(interval);
    interval = null;
    slider.disabled = false;
});
