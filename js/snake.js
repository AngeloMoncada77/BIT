if (!CanvasRenderingContext2D.prototype.roundRect) {
  CanvasRenderingContext2D.prototype.roundRect = function(x, y, w, h, r) {
    this.moveTo(x + r, y);
    this.arcTo(x + w, y, x + w, y + h, r);
    this.arcTo(x + w, y + h, x, y + h, r);
    this.arcTo(x, y + h, x, y, r);
    this.arcTo(x, y, x + w, y, r);
  };
}

const canvas = document.getElementById('game-canvas');
const ctx = canvas.getContext('2d');
const scoreEl = document.getElementById('score');
const highScoreEl = document.getElementById('high-score');
const overlay = document.getElementById('overlay');
const startBtn = document.getElementById('start-btn');
const pauseBtn = document.getElementById('pause-btn');
const leaderboardEl = document.getElementById('leaderboard');
const leaderboardBody = document.getElementById('leaderboard-body');
const closeLbBtn = document.getElementById('close-lb');
const openLbBtn = document.getElementById('open-lb');
const nameInput = document.getElementById('name-input');
const submitScoreBtn = document.getElementById('submit-score');
const lbEntry = document.getElementById('lb-entry');

const GRID = 20;
const TILE = canvas.width / GRID;
const LB_KEY = 'snake-leaderboard';
const MAX_LB = 10;

let snake, direction, nextDirection, food, score, highScore;
let gameLoop, running, paused;
let pendingDir = null;

function getLeaderboard() {
  try {
    return JSON.parse(localStorage.getItem(LB_KEY)) || [];
  } catch { return []; }
}

function saveLeaderboard(lb) {
  localStorage.setItem(LB_KEY, JSON.stringify(lb));
}

function updateHighScore() {
  const lb = getLeaderboard();
  highScore = lb.length > 0 ? lb[0].score : 0;
  highScoreEl.textContent = highScore;
}

function renderLeaderboard() {
  const lb = getLeaderboard();
  leaderboardBody.innerHTML = '';
  if (lb.length === 0) {
    leaderboardBody.innerHTML = '<tr><td colspan="4" style="text-align:center;color:#64748b;padding:2rem;">Aún no hay puntuaciones. ¡Sé el primero!</td></tr>';
    return;
  }
  lb.forEach((entry, i) => {
    const tr = document.createElement('tr');
    const medal = i === 0 ? '🥇' : i === 1 ? '🥈' : i === 2 ? '🥉' : `${i + 1}.`;
    tr.innerHTML = `
      <td style="font-size:1.1rem;">${medal}</td>
      <td style="font-weight:600;">${escapeHtml(entry.name)}</td>
      <td style="color:#38bdf8;font-weight:700;">${entry.score}</td>
      <td style="color:#64748b;font-size:0.85rem;">${entry.date}</td>
    `;
    leaderboardBody.appendChild(tr);
  });
}

function escapeHtml(text) {
  const d = document.createElement('div');
  d.textContent = text;
  return d.innerHTML;
}

function init() {
  const mid = Math.floor(GRID / 2);
  snake = [
    { x: mid, y: mid },
    { x: mid - 1, y: mid },
    { x: mid - 2, y: mid }
  ];
  direction = 'right';
  nextDirection = 'right';
  score = 0;
  running = false;
  paused = false;
  pendingDir = null;
  updateHighScore();
  scoreEl.textContent = '0';
  spawnFood();
  draw();
}

function spawnFood() {
  let pos;
  do {
    pos = {
      x: Math.floor(Math.random() * GRID),
      y: Math.floor(Math.random() * GRID)
    };
  } while (snake.some(s => s.x === pos.x && s.y === pos.y));
  food = pos;
}

function draw() {
  ctx.fillStyle = '#0f172a';
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  ctx.strokeStyle = 'rgba(51, 65, 85, 0.25)';
  ctx.lineWidth = 0.5;
  for (let i = 0; i <= GRID; i++) {
    ctx.beginPath();
    ctx.moveTo(i * TILE, 0);
    ctx.lineTo(i * TILE, canvas.height);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(0, i * TILE);
    ctx.lineTo(canvas.width, i * TILE);
    ctx.stroke();
  }

  snake.forEach((seg, i) => {
    const x = seg.x * TILE, y = seg.y * TILE;
    const pad = 1;
    if (i === 0) {
      ctx.fillStyle = '#38bdf8';
      ctx.shadowColor = 'rgba(56, 189, 248, 0.3)';
      ctx.shadowBlur = 6;
    } else {
      const t = i / snake.length;
      const r = Math.round(56 + (167 - 56) * t);
      const g = Math.round(189 + (139 - 189) * t);
      const b = Math.round(248 + (250 - 248) * t);
      ctx.fillStyle = `rgb(${r},${g},${b})`;
      ctx.shadowColor = 'transparent';
      ctx.shadowBlur = 0;
    }
    ctx.beginPath();
    ctx.roundRect(x + pad, y + pad, TILE - pad * 2, TILE - pad * 2, 3);
    ctx.fill();
  });
  ctx.shadowBlur = 0;

  ctx.fillStyle = '#f87171';
  ctx.shadowColor = 'rgba(248, 113, 113, 0.4)';
  ctx.shadowBlur = 8;
  const fx = food.x * TILE, fy = food.y * TILE;
  ctx.beginPath();
  ctx.arc(fx + TILE / 2, fy + TILE / 2, TILE / 2 - 2, 0, Math.PI * 2);
  ctx.fill();
  ctx.shadowBlur = 0;
}

function update() {
  if (paused || !running) return;

  if (pendingDir) {
    const opposites = { 'up': 'down', 'down': 'up', 'left': 'right', 'right': 'left' };
    if (pendingDir !== opposites[direction]) {
      nextDirection = pendingDir;
    }
    pendingDir = null;
  }

  direction = nextDirection;

  const head = { ...snake[0] };
  switch (direction) {
    case 'up': head.y--; break;
    case 'down': head.y++; break;
    case 'left': head.x--; break;
    case 'right': head.x++; break;
  }

  if (head.x < 0 || head.x >= GRID || head.y < 0 || head.y >= GRID ||
      snake.some(s => s.x === head.x && s.y === head.y)) {
    gameOver();
    return;
  }

  snake.unshift(head);

  if (head.x === food.x && head.y === food.y) {
    score++;
    scoreEl.textContent = score;
    spawnFood();
  } else {
    snake.pop();
  }

  draw();
}

function addScoreToLeaderboard(playerName) {
  const lb = getLeaderboard();
  const now = new Date();
  const dateStr = now.toLocaleDateString('es-ES', { day: 'numeric', month: 'short', year: 'numeric' });
  lb.push({ name: playerName.trim() || 'Anónimo', score, date: dateStr });
  lb.sort((a, b) => b.score - a.score);
  if (lb.length > MAX_LB) lb.length = MAX_LB;
  saveLeaderboard(lb);
  updateHighScore();
}

function gameOver() {
  running = false;
  clearInterval(gameLoop);
  const lb = getLeaderboard();
  const isTopScore = lb.length < MAX_LB || score > lb[lb.length - 1].score;

  overlay.innerHTML = `
    <h2 style="color:#f87171;margin-top:0;">Game Over</h2>
    <p style="margin-bottom:0.5rem;">Puntuación: <strong style="color:#38bdf8;font-size:1.5rem;">${score}</strong></p>
    ${isTopScore && score > 0 ? `
      <div style="margin-bottom:1rem;">
        <p style="color:#fbbf24;font-weight:600;font-size:1rem;margin-bottom:0.5rem;">🏆 Entraste al top ${MAX_LB}!</p>
        <input type="text" id="name-input" maxlength="20" placeholder="Tu nombre" style="padding:0.5rem 1rem;border-radius:8px;border:1px solid #334155;background:#0f172a;color:#e2e8f0;font-size:1rem;text-align:center;outline:none;width:200px;" />
        <button class="btn btn--primary" id="submit-score" style="margin-top:0.5rem;display:block;margin-left:auto;margin-right:auto;">Guardar puntuación</button>
      </div>
    ` : ''}
    <button class="btn btn--outline" id="restart-btn" style="min-width:160px;">Jugar de nuevo</button>
  `;
  overlay.style.display = 'flex';
  pauseBtn.disabled = true;

  const restartBtn = document.getElementById('restart-btn');
  if (restartBtn) restartBtn.addEventListener('click', startGame);

  const submitBtn = document.getElementById('submit-score');
  const input = document.getElementById('name-input');
  if (submitBtn && input) {
    const saveScore = () => {
      addScoreToLeaderboard(input.value);
      overlay.innerHTML = `
        <h2 style="color:#38bdf8;margin-top:0;">¡Puntuación guardada!</h2>
        <p style="margin-bottom:1rem;">Has conseguido <strong style="font-size:1.5rem;">${score}</strong> puntos</p>
        <button class="btn btn--primary" id="restart-btn">Jugar de nuevo</button>
      `;
      document.getElementById('restart-btn').addEventListener('click', startGame);
      renderLeaderboard();
    };
    submitBtn.addEventListener('click', saveScore);
    input.addEventListener('keydown', e => { if (e.key === 'Enter') saveScore(); });
    setTimeout(() => input.focus(), 100);
  }

  if (navigator.vibrate) navigator.vibrate(100);
}

function startGame() {
  init();
  running = true;
  paused = false;
  overlay.style.display = 'none';
  pauseBtn.disabled = false;
  pauseBtn.textContent = 'Pausa';
  gameLoop = setInterval(update, 120);
  draw();
}

function togglePause() {
  if (!running) return;
  paused = !paused;
  pauseBtn.textContent = paused ? 'Reanudar' : 'Pausa';
  if (paused) {
    ctx.fillStyle = 'rgba(15, 23, 42, 0.6)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = '#94a3b8';
    ctx.font = 'bold 28px system-ui, sans-serif';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText('⏸ Pausado', canvas.width / 2, canvas.height / 2);
  } else {
    draw();
  }
}

function setDirection(dir) {
  const opposites = { 'up': 'down', 'down': 'up', 'left': 'right', 'right': 'left' };
  if (dir !== opposites[direction]) {
    pendingDir = dir;
  }
}

document.addEventListener('keydown', e => {
  const keyMap = {
    'ArrowUp': 'up', 'w': 'up', 'W': 'up',
    'ArrowDown': 'down', 's': 'down', 'S': 'down',
    'ArrowLeft': 'left', 'a': 'left', 'A': 'left',
    'ArrowRight': 'right', 'd': 'right', 'D': 'right'
  };
  const dir = keyMap[e.key];
  if (dir) {
    e.preventDefault();
    if (running) setDirection(dir);
    return;
  }
  if (e.key === ' ' || e.key === 'p' || e.key === 'P') {
    e.preventDefault();
    if (running) togglePause();
  }
});

const opposites = { 'up': 'down', 'down': 'up', 'left': 'right', 'right': 'left' };

document.querySelectorAll('[data-dir]').forEach(btn => {
  const handler = () => { if (running) setDirection(btn.dataset.dir); };
  btn.addEventListener('click', handler);
  btn.addEventListener('touchstart', e => { e.preventDefault(); handler(); }, { passive: false });
});

let touchStartX, touchStartY;
canvas.addEventListener('touchstart', e => {
  if (overlay.style.display !== 'none') return;
  const t = e.touches[0];
  touchStartX = t.clientX;
  touchStartY = t.clientY;
}, { passive: true });

canvas.addEventListener('touchend', e => {
  if (!touchStartX || !touchStartY) return;
  if (overlay.style.display !== 'none') return;
  const t = e.changedTouches[0];
  const dx = t.clientX - touchStartX;
  const dy = t.clientY - touchStartY;
  const absDx = Math.abs(dx), absDy = Math.abs(dy);
  if (Math.max(absDx, absDy) < 20) return;
  let dir;
  if (absDx > absDy) {
    dir = dx > 0 ? 'right' : 'left';
  } else {
    dir = dy > 0 ? 'down' : 'up';
  }
  setDirection(dir);
  touchStartX = touchStartY = null;
}, { passive: true });

canvas.addEventListener('click', () => {
  if (!running && overlay.style.display !== 'none') {
    const btn = overlay.querySelector('button');
    if (btn) btn.click();
  }
});

startBtn.addEventListener('click', startGame);
pauseBtn.addEventListener('click', togglePause);

openLbBtn.addEventListener('click', () => {
  renderLeaderboard();
  leaderboardEl.style.display = 'block';
});

closeLbBtn.addEventListener('click', () => {
  leaderboardEl.style.display = 'none';
});

window.addEventListener('click', e => {
  if (e.target === leaderboardEl) leaderboardEl.style.display = 'none';
});

renderLeaderboard();
init();
