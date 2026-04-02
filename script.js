// ==================== ELEMENTOS DO DOM ====================
const slider = document.getElementById("volume");
const display = document.getElementById("value");
const timesDone = document.getElementById("timesDone");
const planta = document.getElementById("planta");
const growthLevel = document.getElementById("growthLevel");
const btntarefa = document.getElementById("tarefa");
const main = document.getElementById("main");
const nav = document.getElementById("nav");
const aside = document.getElementById("aside");
const divNav = document.getElementById("divNav");
const divAside = document.getElementById("divAside");
const minimizarNav = document.getElementById("minimizarNav");
const minimizarAside = document.getElementById("minimizarAside");
const minimizarTimer = document.getElementById("minimizarTimer")
const start = document.getElementById("start");
const pause = document.getElementById("pause");
const reset = document.getElementById("reset");
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
    overlay.classList.add("active");
    input.value = "";
    input.focus();
});

function fecharModal() {
    overlay.classList.remove("active");
}

fechar.addEventListener("click", fecharModal);

overlay.addEventListener("click", (e) => {
    if (e.target === overlay) fecharModal();
});
document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") fecharModal();
});

confirmar.addEventListener("click", () => {
    submitTag();
});

input.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
        submitTag();
    }
});

function submitTag() {
    const tarefa = input.value.trim();
    if (tarefa) {
        btntarefa.textContent = tarefa;
        fecharModal();
    } else {
        alert("Please, enter a tag!");
        input.focus();
    }
}

// ==================== CONTROLES DE NAVEGAÇÃO ====================
minimizarNav.addEventListener("click", () => nav.classList.toggle("navPequena"));
minimizarAside.addEventListener("click", () => {
    aside.classList.toggle("asidePequena");
    main.classList.toggle("asideReduzido");
});
minimizarTimer.addEventListener('click', () => {
    divNav.classList.toggle('minimizado');
    divNav.style.transition = "transform 0.4s cubic-bezier(0.4,0,0.2,1), opacity 0.4s cubic-bezier(0.4,0,0.2,1)";
    minimizarTimer.textContent = divNav.classList.contains('minimizado') ? '> Timer' : 'v Timer';
});


// ==================== 8. CONTROLES DE NAVEGAÇÃO ====================

document.addEventListener("keydown", (e) => {
    if (e.ctrlKey && e.key.toLowerCase() === "b") {
        nav.classList.toggle("navPequena");
    }
    if (e.ctrlKey && e.key.toLowerCase() === "q") {
        aside.classList.toggle("asidePequena");
        main.classList.toggle("asideReduzido");
    }
});

function toggleNav() {
    nav.classList.toggle("navPequena");
}

function toggleAside() {
    aside.classList.toggle("asidePequena");
    main.classList.toggle("mainExpandido");
}

// EVENTOS DO CLICK
minimizarNav.addEventListener("click", toggleNav());
minimizarAside.addEventListener("click", toggleAside());

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

reset.addEventListener("click", () => {
    clearInterval(interval);
    interval = null;
    time = 0;
    display.textContent = slider.min;
    slider.value = slider.min;
    updateDisplay();
    start.disabled = false;
    slider.disabled = false;
});
