const qrText = document.getElementById('qr-text');
const generateBtn = document.getElementById('generate-btn');
const qrResult = document.getElementById('qr-result');
const qrPlaceholder = document.getElementById('qr-placeholder');
const qrCodeDiv = document.getElementById('qrcode');
const qrActions = document.getElementById('qr-actions');
const downloadBtn = document.getElementById('download-btn');

let currentQR = null;

function generateQR() {
  const text = qrText.value.trim();
  if (!text) {
    qrText.focus();
    qrText.style.borderColor = '#f87171';
    setTimeout(() => qrText.style.borderColor = '', 1500);
    return;
  }

  qrCodeDiv.innerHTML = '';
  currentQR = new QRCode(qrCodeDiv, {
    text: text,
    width: 256,
    height: 256,
    colorDark: '#1e293b',
    colorLight: '#ffffff',
    correctLevel: QRCode.CorrectLevel.H
  });

  qrPlaceholder.style.display = 'none';
  qrResult.style.display = 'inline-block';
  qrActions.style.display = 'flex';
}

function downloadQR() {
  const canvas = qrCodeDiv.querySelector('canvas');
  const img = qrCodeDiv.querySelector('img');
  const src = canvas ? canvas.toDataURL('image/png') : (img ? img.src : null);
  if (!src) return;

  const link = document.createElement('a');
  link.download = 'codigobinario-qr.png';
  link.href = src;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

generateBtn.addEventListener('click', generateQR);
qrText.addEventListener('keydown', e => {
  if (e.key === 'Enter') generateQR();
});
downloadBtn.addEventListener('click', downloadQR);
