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
