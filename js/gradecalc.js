let currentScale = 'co';

function setScale(scale) {
  currentScale = scale;
  document.getElementById('scale-co').classList.toggle('active', scale === 'co');
  document.getElementById('scale-pct').classList.toggle('active', scale === 'pct');

  const currentInput = document.getElementById('current-grade');
  const desiredInput = document.getElementById('desired-grade');
  const passingNote = document.getElementById('passing-note');

  if (scale === 'co') {
    currentInput.min = 1.0;
    currentInput.max = 5.0;
    currentInput.step = 0.1;
    currentInput.placeholder = 'Ej: 3.5';
    desiredInput.min = 1.0;
    desiredInput.max = 5.0;
    desiredInput.step = 0.1;
    desiredInput.placeholder = 'Ej: 4.0';
    document.getElementById('grade-needed-label').textContent = 'Nota necesaria en el examen final (1.0 - 5.0)';
    passingNote.innerHTML = 'Nota mínima para pasar: <strong style="color:#fbbf24;">3.0</strong>';
  } else {
    currentInput.min = 0;
    currentInput.max = 100;
    currentInput.step = 1;
    currentInput.placeholder = 'Ej: 72';
    desiredInput.min = 0;
    desiredInput.max = 100;
    desiredInput.step = 1;
    desiredInput.placeholder = 'Ej: 85';
    document.getElementById('grade-needed-label').textContent = 'Nota necesaria en el examen final (0 - 100)';
    passingNote.innerHTML = 'Nota mínima para pasar: <strong style="color:#fbbf24;">60</strong>';
  }

  document.getElementById('grade-result').style.display = 'none';
}

function toPercent(value) {
  if (currentScale === 'co') {
    return ((value - 1.0) / 4.0) * 100;
  }
  return value;
}

function fromPercent(value) {
  if (currentScale === 'co') {
    const result = 1.0 + (value / 100) * 4.0;
    return Math.round(result * 100) / 100;
  }
  return Math.round(value * 100) / 100;
}

function calculateGrade() {
  const currentRaw = parseFloat(document.getElementById('current-grade').value);
  const desiredRaw = parseFloat(document.getElementById('desired-grade').value);
  const weight = parseFloat(document.getElementById('exam-weight').value);

  if (isNaN(currentRaw) || isNaN(desiredRaw) || isNaN(weight)) {
    alert('Por favor, completa todos los campos con números válidos.');
    return;
  }

  if (currentScale === 'co') {
    if (currentRaw < 1.0 || currentRaw > 5.0 || desiredRaw < 1.0 || desiredRaw > 5.0) {
      alert('En escala Colombia, los valores deben estar entre 1.0 y 5.0.');
      return;
    }
  } else {
    if (currentRaw < 0 || currentRaw > 100 || desiredRaw < 0 || desiredRaw > 100) {
      alert('En escala porcentual, los valores deben estar entre 0 y 100.');
      return;
    }
  }

  if (weight < 1 || weight > 100) {
    alert('El peso del examen debe estar entre 1 y 100.');
    return;
  }

  const current = toPercent(currentRaw);
  const desired = toPercent(desiredRaw);
  const weightDecimal = weight / 100;

  const neededPercent = (desired - current * (1 - weightDecimal)) / weightDecimal;
  const needed = fromPercent(neededPercent);

  const resultDiv = document.getElementById('grade-result');
  document.getElementById('grade-needed').textContent = needed;

  const verdict = document.getElementById('grade-verdict');

  if (neededPercent <= 0) {
    verdict.textContent = 'Ya tienes la nota asegurada. ¡Ve al examen tranquilo!';
    verdict.style.color = '#4ade80';
  } else if (neededPercent <= 100) {
    verdict.textContent = `Necesitas sacar al menos ${needed} en tu examen final. ¡Tú puedes!`;
    verdict.style.color = '#38bdf8';
  } else {
    verdict.textContent = `Necesitas ${needed}, que está por encima del máximo posible. Revisa tus metas o pesos.`;
    verdict.style.color = '#f87171';
  }

  resultDiv.style.display = 'block';
}
