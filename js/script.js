const hamburger = document.getElementById('hamburger');
const nav = document.getElementById('nav');

hamburger.addEventListener('click', () => {
  nav.classList.toggle('nav--open');
});

nav.querySelectorAll('.nav__link').forEach(link => {
  link.addEventListener('click', () => {
    nav.classList.remove('nav--open');
  });
});

// Stats counter animation
function animateCounters() {
  const counters = document.querySelectorAll('[data-count]');
  counters.forEach(counter => {
    const target = parseInt(counter.dataset.count);
    const increment = Math.ceil(target / 30);
    let current = 0;
    const update = () => {
      current += increment;
      if (current >= target) {
        counter.textContent = target;
        return;
      }
      counter.textContent = current;
      requestAnimationFrame(update);
    };
    update();
  });
}

const statsSection = document.querySelector('.stats');
if (statsSection) {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        animateCounters();
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });
  observer.observe(statsSection);
}

// Copy code blocks
document.querySelectorAll('.article-detail pre').forEach(pre => {
  const wrapper = document.createElement('div');
  wrapper.className = 'code-wrapper';
  pre.parentNode.insertBefore(wrapper, pre);
  wrapper.appendChild(pre);

  const btn = document.createElement('button');
  btn.className = 'copy-btn';
  btn.textContent = 'Copiar';
  wrapper.appendChild(btn);

  btn.addEventListener('click', () => {
    const code = pre.querySelector('code');
    const text = code ? code.textContent : pre.textContent;
    navigator.clipboard.writeText(text).then(() => {
      btn.textContent = '¡Copiado!';
      btn.classList.add('copy-btn--copied');
      setTimeout(() => {
        btn.textContent = 'Copiar';
        btn.classList.remove('copy-btn--copied');
      }, 2000);
    }).catch(() => {
      btn.textContent = 'Error';
      setTimeout(() => btn.textContent = 'Copiar', 2000);
    });
  });
});

// Back to top button
const backToTop = document.createElement('button');
backToTop.className = 'back-to-top';
backToTop.setAttribute('aria-label', 'Volver arriba');
backToTop.innerHTML = '↑';
document.body.appendChild(backToTop);

window.addEventListener('scroll', () => {
  if (window.scrollY > 400) {
    backToTop.classList.add('back-to-top--visible');
  } else {
    backToTop.classList.remove('back-to-top--visible');
  }
});

backToTop.addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

// === Theme Toggle ===
const themeToggle = document.getElementById('theme-toggle');
if (themeToggle) {
  const savedTheme = localStorage.getItem('theme');
  if (savedTheme === 'light') {
    document.body.classList.add('light-mode');
    themeToggle.textContent = '☀️';
  }

  themeToggle.addEventListener('click', () => {
    document.body.classList.toggle('light-mode');
    const isLight = document.body.classList.contains('light-mode');
    themeToggle.textContent = isLight ? '☀️' : '🌙';
    localStorage.setItem('theme', isLight ? 'light' : 'dark');
  });
}

// === Reading Progress Bar ===
const articleDetail = document.querySelector('.article-detail');
if (articleDetail) {
  const bar = document.createElement('div');
  bar.className = 'progress-bar';
  document.body.prepend(bar);

  window.addEventListener('scroll', () => {
    const scrollTop = window.scrollY;
    const docHeight = articleDetail.scrollHeight - window.innerHeight;
    if (docHeight > 0) {
      const progress = Math.min((scrollTop / docHeight) * 100, 100);
      bar.style.width = progress + '%';
    }
  });
}

// === Typing Animation ===
const typingEl = document.querySelector('.typing-text');
if (typingEl) {
  const html = typingEl.innerHTML;
  typingEl.innerHTML = '';
  let i = 0;
  const cursor = document.createElement('span');
  cursor.className = 'typing-cursor';
  typingEl.after(cursor);

  const type = () => {
    if (i < html.length) {
      let chunk = html[i];
      if (html[i] === '<') {
        const end = html.indexOf('>', i);
        chunk = html.slice(i, end + 1);
        i = end + 1;
        typingEl.innerHTML += chunk;
        requestAnimationFrame(type);
        return;
      }
      typingEl.innerHTML += chunk;
      i++;
      setTimeout(type, 40 + Math.random() * 30);
    } else {
      cursor.remove();
    }
  };
  setTimeout(type, 500);
}
