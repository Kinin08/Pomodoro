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
    const overlay = document.createElement("div");
    overlay.style.position = "fixed";
    overlay.style.top = "0";
    overlay.style.left = "0";
    overlay.style.width = "100%";
    overlay.style.height = "100%";
    overlay.style.backgroundColor = "rgba(0, 0, 0, 0.6)";
    overlay.style.backdropFilter = "blur(4px)";
    overlay.style.zIndex = "999";
    overlay.style.display = "flex";
    overlay.style.justifyContent = "center";
    overlay.style.alignItems = "center";

    const caixa = document.createElement("div");
    caixa.style.background = "linear-gradient(135deg, #2C2F3A, #1E1F2C)";
    caixa.style.padding = "25px";
    caixa.style.borderRadius = "12px";
    caixa.style.width = "320px";
    caixa.style.textAlign = "center";
    caixa.style.boxShadow = "0 10px 30px rgba(0, 0, 0, 0.5)";
    caixa.style.border = "1px solid rgba(12, 231, 142, 0.3)";
    caixa.style.animation = "modalSlideIn 0.3s ease";

    caixa.innerHTML = `
        <h3 style="color: #E8ECEF; margin: 0 0 10px 0;">Nova Tag</h3>
        <input type="text" id="tarefaInput" placeholder="Nome da tag..." 
               style="width: 90%; padding: 10px; margin-bottom: 15px; 
                      background: #1E1F2C; border: 1px solid #3A3E4F; 
                      border-radius: 6px; color: #E8ECEF; font-size: 1rem;">
        <div style="display: flex; gap: 10px; justify-content: center;">
            <button id="fecharTarefa" style="padding: 8px 16px; background: #3A3E4F; 
                    color: white; border: none; border-radius: 6px; cursor: pointer; 
                    transition: all 0.3s ease;">
                Cancelar
            </button>
            <button id="confirmarTarefa" style="padding: 8px 16px; background: rgba(12,231,142,0.8); 
                    color: #000; border: none; border-radius: 6px; cursor: pointer; 
                    font-weight: bold; transition: all 0.3s ease;">
                Adicionar
            </button>
        </div>
    `;

    overlay.appendChild(caixa);
    document.body.appendChild(overlay);

    const style = document.createElement("style");
    style.textContent = `
        @keyframes modalSlideIn {
            from {
                opacity: 0;
                transform: translateY(-30px);
            }
            to {
                opacity: 1;
                transform: translateY(0);
            }
        }
    `;
    document.head.appendChild(style);

    const input = document.getElementById("tarefaInput");
    input.focus();

    function fecharModal() {
        overlay.remove();
    }

    document.getElementById("fecharTarefa").addEventListener("click", fecharModal);

    document.getElementById("confirmarTarefa").addEventListener("click", () => {
        const tarefa = input.value.trim();
        if (tarefa) {
            tagAtual = btntarefa;
            btntarefa.textContent = tarefa;
            alert(`Tag added: ${tarefa}`);
            fecharModal();
        } else {
            alert("Please, Enter a tag!");
            input.style.border = "1px solid #ff6b6b";
            setTimeout(() => {
                input.style.border = "1px solid #3A3E4F";
            }, 2000);
        }
    });

    overlay.addEventListener("click", (e) => {
        if (e.target === overlay) {
            fecharModal();
        }
    });
});

// ==================== 8. CONTROLES DE NAVEGAÇÃO ====================
minimizarNav.addEventListener("click", () => {
    nav.classList.toggle("navPequena");
});

minimizarAside.addEventListener("click", () => {
    aside.classList.toggle("asidePequena");
    main.classList.toggle("asideReduzido");
});

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
