function generatePassword() {
  const length = parseInt(document.getElementById('pwd-length').value);
  const useUpper = document.getElementById('pwd-uppercase').checked;
  const useNumbers = document.getElementById('pwd-numbers').checked;
  const useSymbols = document.getElementById('pwd-symbols').checked;

  const lower = 'abcdefghijklmnopqrstuvwxyz';
  const upper = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  const nums = '0123456789';
  const syms = '!@#$%^&*()_+-=[]{}|;:,.<>?';

  let chars = lower;
  if (useUpper) chars += upper;
  if (useNumbers) chars += nums;
  if (useSymbols) chars += syms;

  if (chars === lower) {
    chars += upper + nums;
  }

  let password = '';
  for (let i = 0; i < length; i++) {
    password += chars[Math.floor(Math.random() * chars.length)];
  }

  document.getElementById('pwd-output').value = password;
  updateStrength();
}

function copyPassword() {
  const input = document.getElementById('pwd-output');
  input.select();
  navigator.clipboard.writeText(input.value);
  const btn = event.target;
  const original = btn.textContent;
  btn.textContent = 'Copiado!';
  setTimeout(() => btn.textContent = original, 1500);
}

function updateLength() {
  const val = document.getElementById('pwd-length').value;
  document.getElementById('pwd-length-display').textContent = val;
}

function updateStrength() {
  const length = parseInt(document.getElementById('pwd-length').value);
  const checks = [
    document.getElementById('pwd-uppercase').checked,
    document.getElementById('pwd-numbers').checked,
    document.getElementById('pwd-symbols').checked
  ];
  const types = 1 + checks.filter(Boolean).length;

  let score = 0;
  score += Math.min(length * 4, 40);
  score += types * 15;

  const fill = document.getElementById('pwd-strength-fill');
  const label = document.getElementById('pwd-strength-label');

  if (score < 30) {
    fill.style.width = '25%';
    fill.style.background = '#f87171';
    label.textContent = 'Débil';
  } else if (score < 50) {
    fill.style.width = '50%';
    fill.style.background = '#fbbf24';
    label.textContent = 'Media';
  } else if (score < 70) {
    fill.style.width = '75%';
    fill.style.background = '#4ade80';
    label.textContent = 'Fuerte';
  } else {
    fill.style.width = '100%';
    fill.style.background = '#38bdf8';
    label.textContent = 'Muy fuerte';
  }
}

document.querySelectorAll('.pwd-option input').forEach(el => {
  el.addEventListener('change', generatePassword);
});

generatePassword();
