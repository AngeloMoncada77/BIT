(function() {
  var EMAIL_TO = 'mikel3132056411@gmail.com';

  document.querySelectorAll('[data-newsletter]').forEach(function(form) {
    form.addEventListener('submit', function(e) {
      e.preventDefault();
      var input = form.querySelector('input[type="email"]');
      var status = form.querySelector('.newsletter__status');
      var email = input.value.trim();

      if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email)) {
        input.classList.add('is-invalid');
        if (status) {
          status.textContent = 'Ingresa un correo válido para suscribirte.';
          status.classList.add('newsletter__status--error');
        }
        input.focus();
        return;
      }

      input.classList.remove('is-invalid');
      var subject = 'Suscripción al newsletter de DevCortex';
      var body = 'Correo para suscribirse al newsletter de DevCortex:\n\n' + email;
      window.location.href = 'mailto:' + EMAIL_TO + '?subject=' + encodeURIComponent(subject) + '&body=' + encodeURIComponent(body);

      if (status) {
        status.textContent = '📬 Se abrió tu correo con la suscripción lista para enviar.';
        status.classList.remove('newsletter__status--error');
        status.classList.add('newsletter__status--success');
      }
    });
  });
})();