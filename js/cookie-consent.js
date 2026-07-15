(function() {
  const COOKIE_NAME = 'amq7_cookie_consent';

  function getCookie(name) {
    const match = document.cookie.match(new RegExp('(^| )' + name + '=([^;]+)'));
    return match ? decodeURIComponent(match[2]) : null;
  }

  function setCookie(name, value, days) {
    const expires = new Date(Date.now() + days * 864e5).toUTCString();
    document.cookie = name + '=' + encodeURIComponent(value) + '; expires=' + expires + '; path=/; SameSite=Lax';
  }

  if (getCookie(COOKIE_NAME)) return;

  const banner = document.createElement('div');
  banner.id = 'cookie-banner';
  banner.innerHTML = `
    <div style="
      position: fixed;
      bottom: 0;
      left: 0;
      right: 0;
      background: #1e293b;
      border-top: 1px solid #334155;
      padding: 1.5rem;
      z-index: 9999;
      box-shadow: 0 -4px 20px rgba(0,0,0,0.3);
    ">
      <div style="max-width: 1100px; margin: 0 auto; display: flex; flex-wrap: wrap; align-items: center; gap: 1rem; justify-content: space-between;">
        <p style="color: #94a3b8; font-size: 0.9rem; flex: 1; min-width: 250px;">
          Este sitio utiliza cookies propias y de terceros para mejorar tu experiencia y mostrar anuncios personalizados.
          <a href="/privacy.html" style="color: #38bdf8; text-decoration: underline;">Más información</a>
        </p>
        <div style="display: flex; gap: 0.75rem; flex-wrap: wrap;">
          <button id="cookie-accept" style="
            background: #38bdf8;
            color: #0f172a;
            border: none;
            padding: 0.6rem 1.5rem;
            border-radius: 8px;
            font-weight: 600;
            cursor: pointer;
            font-size: 0.9rem;
          ">Aceptar todas</button>
          <button id="cookie-necessary" style="
            background: transparent;
            color: #94a3b8;
            border: 1px solid #334155;
            padding: 0.6rem 1.5rem;
            border-radius: 8px;
            font-weight: 600;
            cursor: pointer;
            font-size: 0.9rem;
          ">Solo necesarias</button>
        </div>
      </div>
    </div>
  `;

  document.body.appendChild(banner);

  document.getElementById('cookie-accept').addEventListener('click', function() {
    setCookie(COOKIE_NAME, 'all', 365);
    if (typeof gtag !== 'undefined') {
      gtag('consent', 'update', {
        'ad_storage': 'granted',
        'ad_user_data': 'granted',
        'ad_personalization': 'granted',
        'analytics_storage': 'granted'
      });
    }
    banner.remove();
  });

  document.getElementById('cookie-necessary').addEventListener('click', function() {
    setCookie(COOKIE_NAME, 'necessary', 365);
    if (typeof gtag !== 'undefined') {
      gtag('consent', 'update', {
        'analytics_storage': 'granted'
      });
    }
    banner.remove();
  });
})();
