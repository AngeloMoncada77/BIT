(function() {
  const COOKIE_NAME = 'devcortex_cookie_consent';

  function getCookie(name) {
    const match = document.cookie.match(new RegExp('(^| )' + name + '=([^;]+)'));
    return match ? decodeURIComponent(match[2]) : null;
  }

  function setCookie(name, value, days) {
    const expires = new Date(Date.now() + days * 864e5).toUTCString();
    document.cookie = name + '=' + encodeURIComponent(value) + '; expires=' + expires + '; path=/; SameSite=Lax';
  }

  const saved = getCookie(COOKIE_NAME);
  if (typeof gtag !== 'undefined') {
    if (!saved) {
      gtag('consent', 'default', {
        ad_storage: 'denied',
        ad_user_data: 'denied',
        ad_personalization: 'denied',
        analytics_storage: 'denied'
      });
    } else if (saved === 'all') {
      gtag('consent', 'update', {
        ad_storage: 'granted',
        ad_user_data: 'granted',
        ad_personalization: 'granted',
        analytics_storage: 'granted'
      });
    }
  }

  if (saved) return;

  const banner = document.createElement('div');
  banner.id = 'cookie-banner';
  banner.className = 'cookie-banner';
  banner.setAttribute('role', 'dialog');
  banner.setAttribute('aria-live', 'polite');
  banner.innerHTML = `
    <div class="cookie-banner__inner">
      <div class="cookie-banner__text">
        <p>
          Usamos cookies propias y de terceros para mejorar tu experiencia, medir el uso del sitio y, con tu consentimiento, mostrar anuncios personalizados.
          <a href="/privacy.html">Más información</a>
        </p>
      </div>
      <div class="cookie-banner__actions">
        <button id="cookie-accept" class="btn btn--primary">Aceptar todas</button>
        <button id="cookie-necessary" class="btn cookie-btn--outline">Solo necesarias</button>
      </div>
    </div>
  `;

  document.body.appendChild(banner);

  function finish(kind) {
    setCookie(COOKIE_NAME, kind, 365);
    if (typeof gtag !== 'undefined' && kind === 'all') {
      gtag('consent', 'update', {
        ad_storage: 'granted',
        ad_user_data: 'granted',
        ad_personalization: 'granted',
        analytics_storage: 'granted'
      });
    }
    banner.remove();
  }

  document.getElementById('cookie-accept').addEventListener('click', function() { finish('all'); });
  document.getElementById('cookie-necessary').addEventListener('click', function() { finish('necessary'); });
})();