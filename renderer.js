const startBtn = document.getElementById("start");
const pauseBtn = document.getElementById("pause");
const resetBtn = document.getElementById("reset");
const timerDisplay = document.getElementById("timer");
const message = document.getElementById("message");
const plant = document.getElementById("plant");
const sound = document.getElementById("sound");

let workTime = 25 * 60;
let breakTime = 5 * 60;
let timeLeft = workTime;
let timer = null;
let isWorking = true;
let growth = 1;

function updateDisplay() {
  const m = Math.floor(timeLeft / 60);
  const s = timeLeft % 60;
  timerDisplay.textContent = `${m}:${s.toString().padStart(2, "0")}`;
}

function growPlant() {
  growth += 0.12;
  plant.style.transform = `scale(${growth})`;
}

function safePlaySound() {
  if (!sound) return;
  sound.currentTime = 0;
  sound.play().catch(() => {});
}

function startTimer() {
  console.log("START CLICKED");

  if (timer) return;

  timer = setInterval(() => {
    timeLeft--;
    updateDisplay();

    if (timeLeft <= 0) {
      clearInterval(timer);
      timer = null;

      safePlaySound();

      if (isWorking) {
        if (window.electronAPI) {
          window.electronAPI.notify("Pause 🌸", "Bravo ! prends une pause 💕");
        }
        growPlant();
        message.textContent = "Pause time ☕";
        timeLeft = breakTime;
      } else {
        if (window.electronAPI) {
          window.electronAPI.notify("Focus ✨", "C’est reparti ✨");
        }
        message.textContent = "Focus time ✨";
        timeLeft = workTime;
      }

      isWorking = !isWorking;
      updateDisplay();
    }
  }, 1000);
}

function pauseTimer() {
  clearInterval(timer);
  timer = null;
}

function resetTimer() {
  pauseTimer();
  isWorking = true;
  timeLeft = workTime;
  growth = 1;
  plant.style.transform = "scale(1)";
  message.textContent = "Focus time ✨";
  updateDisplay();
}

startBtn.addEventListener("click", startTimer);
pauseBtn.addEventListener("click", pauseTimer);
resetBtn.addEventListener("click", resetTimer);

updateDisplay();
