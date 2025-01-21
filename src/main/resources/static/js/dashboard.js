// Navigation to module pages
function navigateTo(page) {
    window.location.href = `./${page}`;
  }
  
// Pomodoro Timer Logic
let timerInterval;
let remainingTime = 25 * 60; // Default: 25 minutes

function updateTimerDisplay() {
  const minutes = Math.floor(remainingTime / 60);
  const seconds = remainingTime % 60;
  document.getElementById("timer-display").textContent = 
    `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
}

function setTimer() {
  const duration = document.getElementById("timerDuration").value;
  if (!duration || duration <= 0) {
    alert("Please enter a valid number of minutes.");
    return;
  }
  remainingTime = duration * 60;
  updateTimerDisplay();
}

function startPomodoro() {
  if (timerInterval) return;

  timerInterval = setInterval(() => {
    if (remainingTime <= 0) {
      clearInterval(timerInterval);
      timerInterval = null;
      alert("Pomodoro session complete!");
    } else {
      remainingTime--;
      updateTimerDisplay();
    }
  }, 1000);
}

function resetPomodoro() {
  clearInterval(timerInterval);
  timerInterval = null;

  // Reset to user-inputted duration or default to 25 minutes
  const duration = document.getElementById("timerDuration").value;
  remainingTime = duration && duration > 0 ? duration * 60 : 25 * 60;

  updateTimerDisplay();
}

function stopPomodoro() {
  clearInterval(timerInterval);
  timerInterval = null;
}

