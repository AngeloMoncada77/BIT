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

// === Related Articles ===
const relatedGrid = document.getElementById('related-grid');
if (relatedGrid) {
  const allArticles = [
    { title: 'Docker para principiantes: Contenedores, imágenes y primeros pasos', url: '/blog/posts/docker-principiantes', category: 'Programación' },
    { title: 'TypeScript desde cero: Tipos, interfaces y primeros pasos', url: '/blog/posts/typescript-desde-cero', category: 'Programación' },
    { title: 'Async/Await y Promesas en JavaScript: La guía definitiva', url: '/blog/posts/async-await-promesas', category: 'Programación' },
    { title: 'CSS Grid: La guía completa para maquetar con cuadrícula', url: '/blog/posts/css-grid-guia-completa', category: 'Programación' },
    { title: 'Python desde cero: Todo lo que necesitas saber para empezar en 2026', url: '/blog/posts/python-desde-cero', category: 'Programación' },
    { title: '¿Qué es una API REST? Guía completa para entender y consumir APIs', url: '/blog/posts/api-rest-guia-completa', category: 'Programación' },
    { title: 'Cómo instalar Node.js en Windows, Linux y Mac — Guía completa 2026', url: '/blog/posts/instalar-node-js', category: 'Programación' },
    { title: 'Los mejores hosting gratis para tu sitio web en 2026', url: '/blog/posts/mejores-hosting-gratis', category: 'Programación' },
    { title: 'Errores comunes de Git y cómo solucionarlos', url: '/blog/posts/errores-comunes-git', category: 'Programación' },
    { title: 'Guía para principiantes: cómo crear y desplegar tu primer sitio web gratis', url: '/blog/posts/guia-primer-sitio-web', category: 'Programación' },
    { title: 'Las mejores extensiones de VS Code para desarrollo web en 2026', url: '/blog/posts/extensiones-vscode', category: 'Programación' },
    { title: '¿Cómo funciona Internet? Explicación visual para principiantes', url: '/blog/posts/como-funciona-internet', category: 'Redes' },
    { title: 'NAT traversal: el problema que todo desarrollador multiplayer debe entender', url: '/blog/posts/nat-traversal', category: 'Redes' },
    { title: '5 proyectos con JavaScript puro para tu portafolio en 2026', url: '/blog/posts/5-proyectos-javascript', category: 'Programación' },
    { title: 'HTML semántico: la base del SEO y la accesibilidad', url: '/blog/posts/html-semantico', category: 'Programación' },
    { title: 'Arquitectura de videojuegos multiplayer: servidor autoritativo vs P2P', url: '/blog/posts/arquitectura-multiplayer', category: 'Gaming' },
    { title: '¿Cómo funciona el anti-cheat en los juegos online?', url: '/blog/posts/anti-cheat', category: 'Gaming' },
    { title: 'Git desde cero: los comandos esenciales del control de versiones', url: '/blog/posts/git-comandos-esenciales', category: 'Programación' },
    { title: 'SQL vs NoSQL: cuál base de datos elegir para tu proyecto', url: '/blog/posts/sql-vs-nosql', category: 'Programación' },
    { title: 'HTTPS y el cifrado SSL/TLS: cómo se protege tu web', url: '/blog/posts/https-ssl-certificados', category: 'Redes' },
  ];

  const currentUrl = window.location.pathname.replace(/\.html$/, '');
  const catEl = document.querySelector('.article-detail p') || document.querySelector('.article-item__category');
  let currentCategory = '';
  if (catEl) {
    const text = catEl.textContent;
    const catMatch = text.match(/(Programación|Redes|Gaming)/);
    if (catMatch) currentCategory = catMatch[1];
  }

  if (currentCategory) {
    const sameCat = allArticles.filter(a => a.category === currentCategory && a.url !== currentUrl);
    const shuffled = sameCat.sort(() => 0.5 - Math.random()).slice(0, 3);
    if (shuffled.length > 0) {
      relatedGrid.innerHTML = shuffled.map(a => `
        <div class="related-article-item">
          <span class="related-article-item__cat">${a.category}</span>
          <h4><a href="${a.url}">${a.title}</a></h4>
        </div>
      `).join('');
    } else {
      document.getElementById('related-articles').style.display = 'none';
    }
  } else {
    document.getElementById('related-articles').style.display = 'none';
  }
}
