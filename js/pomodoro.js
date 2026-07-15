let pomodoroInterval = null;
let pomodoroSeconds = 25 * 60;
let pomodoroRunning = false;
let pomodoroPhase = 'work';
let pomodoroSessions = 0;

function updatePomodoroDisplay() {
  const mins = Math.floor(pomodoroSeconds / 60);
  const secs = pomodoroSeconds % 60;
  document.getElementById('pomodoro-display').textContent =
    `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
}

function startPomodoro() {
  if (pomodoroRunning) {
    clearInterval(pomodoroInterval);
    pomodoroRunning = false;
    document.getElementById('pomodoro-start').textContent = 'Reanudar';
    return;
  }

  pomodoroRunning = true;
  document.getElementById('pomodoro-start').textContent = 'Pausar';

  pomodoroInterval = setInterval(() => {
    pomodoroSeconds--;
    updatePomodoroDisplay();

    if (pomodoroSeconds <= 0) {
      clearInterval(pomodoroInterval);
      pomodoroRunning = false;

      if (pomodoroPhase === 'work') {
        pomodoroPhase = 'break';
        pomodoroSeconds = 5 * 60;
        document.getElementById('pomodoro-phase').textContent = 'Tiempo de descanso';
        pomodoroSessions++;
        document.getElementById('pomodoro-sessions').textContent = `Ciclos completados: ${pomodoroSessions}`;
      } else {
        pomodoroPhase = 'work';
        pomodoroSeconds = 25 * 60;
        document.getElementById('pomodoro-phase').textContent = 'Tiempo de trabajo';
      }
      updatePomodoroDisplay();
      document.getElementById('pomodoro-start').textContent = 'Iniciar';
    }
  }, 1000);
}

function resetPomodoro() {
  clearInterval(pomodoroInterval);
  pomodoroRunning = false;
  pomodoroPhase = 'work';
  pomodoroSeconds = 25 * 60;
  document.getElementById('pomodoro-phase').textContent = 'Tiempo de trabajo';
  document.getElementById('pomodoro-start').textContent = 'Iniciar';
  updatePomodoroDisplay();
}
