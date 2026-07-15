function calculateGrade() {
  const current = parseFloat(document.getElementById('current-grade').value);
  const desired = parseFloat(document.getElementById('desired-grade').value);
  const weight = parseFloat(document.getElementById('exam-weight').value);

  if (isNaN(current) || isNaN(desired) || isNaN(weight)) {
    alert('Por favor, completa todos los campos con números válidos.');
    return;
  }

  if (current < 0 || current > 100 || desired < 0 || desired > 100 || weight < 1 || weight > 100) {
    alert('Los valores deben estar entre 0 y 100. El peso debe estar entre 1 y 100.');
    return;
  }

  const weightDecimal = weight / 100;
  const needed = (desired - current * (1 - weightDecimal)) / weightDecimal;
  const rounded = Math.round(needed * 100) / 100;

  const resultDiv = document.getElementById('grade-result');
  document.getElementById('grade-needed').textContent = rounded.toFixed(1);

  const verdict = document.getElementById('grade-verdict');
  if (rounded <= 0) {
    verdict.textContent = '✅ Ya tienes la nota asegurada. ¡Ve al examen tranquilo!';
    verdict.style.color = '#4ade80';
  } else if (rounded <= 100) {
    verdict.textContent = `Necesitas sacar al menos ${rounded.toFixed(1)} en tu examen final. ¡Tú puedes!`;
    verdict.style.color = '#38bdf8';
  } else {
    verdict.textContent = `Necesitas ${rounded.toFixed(1)}, que está por encima del máximo. Revisa tus metas o pesos.`;
    verdict.style.color = '#f87171';
  }

  resultDiv.style.display = 'block';
}
