const textarea = document.getElementById('markdown-input');
const preview = document.getElementById('preview');
let lastPos = 0;

function parseMarkdown(text) {
  let html = '';
  const lines = text.split('\n');
  let inCodeBlock = false;
  let codeBuffer = [];

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];

    if (line.trim().startsWith('```')) {
      if (inCodeBlock) {
        codeBuffer.push(line);
        html += `<pre><code>${codeBuffer.slice(1, -1).join('\n')}</code></pre>\n`;
        codeBuffer = [];
        inCodeBlock = false;
        continue;
      } else {
        inCodeBlock = true;
        codeBuffer = [line];
        continue;
      }
    }

    if (inCodeBlock) {
      codeBuffer.push(line);
      continue;
    }

    if (line.trim() === '') {
      html += '\n';
      continue;
    }

    if (line.startsWith('### ')) {
      html += `<h3>${parseInline(line.slice(4))}</h3>\n`;
    } else if (line.startsWith('## ')) {
      html += `<h2>${parseInline(line.slice(3))}</h2>\n`;
    } else if (line.startsWith('# ')) {
      html += `<h1>${parseInline(line.slice(2))}</h1>\n`;
    } else if (line.startsWith('> ')) {
      html += `<blockquote>${parseInline(line.slice(2))}</blockquote>\n`;
    } else if (line.startsWith('- ') || line.startsWith('* ')) {
      html += `<li>${parseInline(line.slice(2))}</li>\n`;
    } else if (/^\d+\.\s/.test(line)) {
      html += `<li>${parseInline(line.replace(/^\d+\.\s/, ''))}</li>\n`;
    } else {
      html += `<p>${parseInline(line)}</p>\n`;
    }
  }

  if (inCodeBlock && codeBuffer.length > 1) {
    html += `<pre><code>${codeBuffer.slice(1).join('\n')}</code></pre>\n`;
  }

  html = html.replace(/(<li>.*<\/li>\n)+/g, match => `<ul>${match}</ul>\n`);
  html = html.replace(/(<li>.*<\/li>\n)+/g, match => `<ul>${match}</ul>\n`);

  return html;
}

function parseInline(text) {
  return text
    .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
    .replace(/\*(.+?)\*/g, '<em>$1</em>')
    .replace(/`(.+?)`/g, '<code>$1</code>')
    .replace(/\[(.+?)\]\((.+?)\)/g, '<a href="$2" target="_blank">$1</a>')
    .replace(/!\[(.+?)\]\((.+?)\)/g, '<img src="$2" alt="$1">');
}

function renderPreview() {
  const text = textarea.value;
  preview.innerHTML = parseMarkdown(text);
  const words = text.trim() ? text.trim().split(/\s+/).length : 0;
  document.getElementById('word-count').textContent = `${words} palabras`;
}

function insertMarkdown(before, after) {
  const start = textarea.selectionStart;
  const end = textarea.selectionEnd;
  const selected = textarea.value.substring(start, end);
  const newText = before + selected + after;
  textarea.setRangeText(newText, start, end, 'end');
  renderPreview();
  textarea.focus();
}

function copyHTML() {
  const html = parseMarkdown(textarea.value);
  navigator.clipboard.writeText(html).then(() => {
    alert('HTML copiado al portapapeles');
  }).catch(() => {
    const textarea2 = document.createElement('textarea');
    textarea2.value = html;
    document.body.appendChild(textarea2);
    textarea2.select();
    document.execCommand('copy');
    document.body.removeChild(textarea2);
    alert('HTML copiado al portapapeles');
  });
}

function clearEditor() {
  if (confirm('¿Limpiar el editor?')) {
    textarea.value = '';
    renderPreview();
  }
}

textarea.addEventListener('input', renderPreview);
textarea.addEventListener('scroll', () => {
  preview.scrollTop = textarea.scrollTop * (preview.scrollHeight - preview.clientHeight) / (textarea.scrollHeight - textarea.clientHeight);
});

renderPreview();
