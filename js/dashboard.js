let tasks = [];

function loadTasks() {
  try {
    tasks = JSON.parse(localStorage.getItem('dashboard-tasks')) || [];
  } catch { tasks = []; }
}

function saveTasks() {
  localStorage.setItem('dashboard-tasks', JSON.stringify(tasks));
}

function addTask() {
  const title = document.getElementById('task-title').value.trim();
  const desc = document.getElementById('task-desc').value.trim();
  if (!title) { alert('Escribe un título para la tarea.'); return; }
  tasks.push({
    id: Date.now(),
    title,
    desc,
    column: 'todo',
    created: new Date().toLocaleDateString()
  });
  saveTasks();
  document.getElementById('task-title').value = '';
  document.getElementById('task-desc').value = '';
  renderBoard();
}

function moveTask(id, direction) {
  const task = tasks.find(t => t.id === id);
  if (!task) return;
  const cols = ['todo', 'progress', 'done'];
  const idx = cols.indexOf(task.column);
  const newIdx = idx + direction;
  if (newIdx < 0 || newIdx >= cols.length) return;
  task.column = cols[newIdx];
  saveTasks();
  renderBoard();
}

function deleteTask(id) {
  if (!confirm('¿Eliminar esta tarea?')) return;
  tasks = tasks.filter(t => t.id !== id);
  saveTasks();
  renderBoard();
}

function renderBoard() {
  const cols = ['todo', 'progress', 'done'];
  cols.forEach(col => {
    const container = document.getElementById(`column-${col}`);
    const count = document.getElementById(`count-${col}`);
    const colTasks = tasks.filter(t => t.column === col);
    count.textContent = colTasks.length;

    if (colTasks.length === 0) {
      container.innerHTML = '<div class="kanban-empty">No hay tareas</div>';
      return;
    }

    container.innerHTML = colTasks.map(t => {
      const idx = cols.indexOf(col);
      return `
        <div class="kanban-task">
          <div class="kanban-task__title">${escapeHtml(t.title)}</div>
          ${t.desc ? `<div class="kanban-task__desc">${escapeHtml(t.desc)}</div>` : ''}
          <div class="kanban-task__actions">
            ${idx > 0 ? `<button onclick="moveTask(${t.id}, -1)">←</button>` : ''}
            ${idx < cols.length - 1 ? `<button onclick="moveTask(${t.id}, 1)">→</button>` : ''}
            <button class="danger" onclick="deleteTask(${t.id})">✕</button>
          </div>
        </div>
      `;
    }).join('');
  });
}

function escapeHtml(text) {
  const div = document.createElement('div');
  div.textContent = text;
  return div.innerHTML;
}

document.addEventListener('keydown', (e) => {
  if (e.key === 'Enter') {
    const title = document.getElementById('task-title');
    if (document.activeElement === title || document.activeElement === document.getElementById('task-desc')) {
      addTask();
    }
  }
});

loadTasks();
renderBoard();
