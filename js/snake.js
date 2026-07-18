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

const GRID = 20;
const TILE = canvas.width / GRID;

let snake, direction, nextDirection, food, score, highScore;
let gameLoop, running, paused;
let pendingDir = null;

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
  highScore = parseInt(localStorage.getItem('snake-hs') || '0');
  highScoreEl.textContent = highScore;
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

function gameOver() {
  running = false;
  clearInterval(gameLoop);
  const isNewRecord = score > highScore;
  if (isNewRecord) {
    highScore = score;
    localStorage.setItem('snake-hs', highScore.toString());
    highScoreEl.textContent = highScore;
  }
  overlay.innerHTML = `
    <h2 style="color:#f87171;margin-top:0;">Game Over</h2>
    ${isNewRecord ? '<p style="color:#fbbf24;font-weight:600;font-size:1.1rem;">🏆 ¡Nuevo récord!</p>' : ''}
    <p style="margin-bottom:0.5rem;">Puntuación: <strong style="color:#38bdf8;font-size:1.5rem;">${score}</strong></p>
    <button class="btn btn--primary" id="restart-btn" style="min-width:160px;">Jugar de nuevo</button>
  `;
  overlay.style.display = 'flex';
  document.getElementById('restart-btn').addEventListener('click', startGame);
  pauseBtn.disabled = true;
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

init();
