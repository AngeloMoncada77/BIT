# SESION - Resumen completo
## Última actualización: Julio 2026

---

## DATOS DEL PROYECTO

- Dominio: amq7.xyz
- Marca: **CódigoBinario**
- Hosting: Netlify (mikel-platypus-bb3d70.netlify.app)
- DNS: Cloudflare (nameservers: princess.ns.cloudflare.com / rodrigo.ns.cloudflare.com)
- Proxy Cloudflare: Activado (orange cloud) con SSL/TLS en Full (strict)
- Repositorio: https://github.com/AngeloMoncada77/BIT
- Email contacto: mikel3132056411@gmail.com
- Git user: AngeloMoncada77
- Google Analytics: G-KT5FVDZVXT (consent mode integrado con cookie banner)
- Google Search Console: https://amq7.xyz verificado (meta tag + DNS TXT)

---

## ESTRUCTURA DEL SITIO

```
bit/
├── index.html                    ← Homepage con hero, stats animados, featured cards
├── about.html                    ← Sobre CódigoBinario (bio, skills, filosofía)
├── contact.html                  ← Formulario de contacto + email directo
├── privacy.html                  ← Política de Privacidad (GDPR)
├── robots.txt                    ← SEO
├── sitemap.xml                   ← SEO (23 URLs)
├── google5b76da4bc65d00f4.html   ← Verificación Google Search Console
├── portfolio/
│   └── index.html                ← 3 proyectos con demos funcionales
├── blog/
│   ├── index.html                ← Lista de 14 artículos
│   └── posts/
│       ├── css-grid-guia-completa.html ← [NUEVO] CSS Grid guía completa
│       ├── python-desde-cero.html      ← [NUEVO] Python desde cero
│       ├── api-rest-guia-completa.html ← [NUEVO] APIs REST guía completa
│       ├── instalar-node-js.html       ← Guía instalación Node.js
│       ├── mejores-hosting-gratis.html ← Comparativa hosting gratuito
│       ├── errores-comunes-git.html    ← Solución errores Git
│       ├── extensiones-vscode.html
│       ├── guia-primer-sitio-web.html
│       ├── como-funciona-internet.html
│       ├── nat-traversal.html
│       ├── 5-proyectos-javascript.html
│       ├── html-semantico.html
│       ├── arquitectura-multiplayer.html
│       └── anti-cheat.html
├── tools/
│   ├── index.html                ← Landing de 8 herramientas
│   ├── qr-generator.html         ← [NUEVO] Generador de códigos QR
│   ├── password-generator.html   ← Generador de contraseñas seguras
│   ├── flashcard.html            ← Generador de flashcards funcional
│   ├── gradecalc.html            ← Calculadora de notas funcional
│   ├── pomodoro.html             ← Temporizador Pomodoro funcional
│   ├── dashboard.html            ← Kanban task dashboard funcional
│   └── markdown-editor.html      ← Editor Markdown en vivo funcional
├── css/
│   └── style.css                 ← Estilos completos (responsive, dark theme, logo gradient)
└── js/
    ├── script.js                 ← Menú hamburguesa + animación contadores
    ├── qr-generator.js           ← [NUEVO] Lógica generador QR
    ├── password-generator.js     ← Lógica generador contraseñas
    ├── flashcard.js              ← Lógica flashcards
    ├── gradecalc.js              ← Lógica calculadora notas
    ├── pomodoro.js               ← Lógica temporizador
    ├── dashboard.js              ← Lógica Kanban (LocalStorage)
    ├── markdown.js               ← Parser Markdown + preview
    ├── snake.js                  ← Snake con leaderboard top 10
    └── cookie-consent.js         ← Banner cookies GDPR + integración gtag consent
```

---

## PALETA DE COLORES

- Background: #0f172a (slate-900)
- Cards: #1e293b (slate-800)
- Texto: #e2e8f0 (slate-200)
- Acento primario: #38bdf8 (sky-400)
- Acento secundario: #a78bfa (violet-400)
- Bordes: #334155 (slate-700)
- Logo: Gradient sky → violet

---

## EXTENSIONES VS CODE INSTALADAS (esenciales)

- Live Server (ritwickdey.liveserver)
- Prettier (esbenp.prettier-vscode)
- ESLint (dbaeumer.vscode-eslint)
- Auto Rename Tag (formulahendry.auto-rename-tag)
- Path Intellisense (christian-kohler.path-intellisense)
- HTML CSS Support (ecmel.vscode-html-css)
- Color Highlight (naumovs.color-highlight)
- JavaScript Snippets (xabikos.javascriptsnippets)
- IntelliSense for CSS class names (Zignd.html-css-class-completion)

---

## HISTORIAL DE CAMBIOS

- [x] Rebranding completo de AMQ7 a **CódigoBinario**
- [x] Logo con gradient sky→violet en todas las páginas
- [x] Nuevo hero más profesional y orientado a contenido
- [x] Hero con efecto visual de glow background
- [x] 3 nuevos artículos de alto tráfico (Node.js, hosting gratis, errores Git)
- [x] Nueva herramienta: Generador de Contraseñas Seguras
- [x] Sitemap actualizado con 23 URLs
- [x] Meta descriptions optimizadas para SEO
- [x] Estadísticas actualizadas (11 artículos, 6 herramientas)
- [x] Blog reordenado con contenido fresco arriba
- [x] Snake Game: leaderboard con top 10, nombre y fecha (localStorage)
- [x] 3 nuevos artículos: CSS Grid, Python desde cero, APIs REST
- [x] Nueva herramienta: Generador de QR
- [x] Sitemap actualizado con 28 URLs
- [x] Estadísticas actualizadas (14 artículos, 8 herramientas)
- [x] Index.html: hero, stats, previews actualizados

---

## PENDIENTE

- [ ] Escribir más artículos (1 por semana recomendado)
- [ ] Añadir más herramientas (JSON formatter)
- [ ] Crear perfiles en X/Twitter o LinkedIn para promocionar
- [ ] Solicitar Google AdSense cuando haya tráfico
- [ ] Compartir artículos en foros (r/Programacion, Stack Overflow ES)

---

## COMANDOS ÚTILES

```bash
# Subir cambios a producción
git add -A
git commit -m "descripción del cambio"
git push

# Ver estado del deploy en Netlify
# https://app.netlify.com/sites/mikel-platypus-bb3d70/deploys

# Verificar DNS
dig +short amq7.xyz
dig +short NS amq7.xyz
```
