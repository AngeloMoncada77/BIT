# SESION AMQ7 - Resumen completo
## Última actualización: Julio 2026

---

## DATOS DEL PROYECTO

- Dominio: amq7.xyz
- Hosting: Netlify (mikel-platypus-bb3d70.netlify.app)
- DNS: Cloudflare (nameservers: princess.ns.cloudflare.com / rodrigo.ns.cloudflare.com)
- Repositorio: https://github.com/AngeloMoncada77/BIT
- Email contacto: mikel3132056411@gmail.com
- Git user: AngeloMoncada77

---

## ESTRUCTURA DEL SITIO

```
bit/
├── index.html                    ← Homepage con hero, stats animados, featured cards
├── about.html                    ← Sobre mí (bio, skills, avatar)
├── contact.html                  ← Formulario de contacto + email directo
├── privacy.html                  ← Política de Privacidad (GDPR)
├── robots.txt                    ← SEO
├── sitemap.xml                   ← SEO (16 URLs)
├── google5b76da4bc65d00f4.html   ← Verificación Google Search Console
├── portfolio/
│   └── index.html                ← 3 proyectos con demos funcionales
├── blog/
│   ├── index.html                ← Lista de 8 artículos
│   └── posts/
│       ├── extensiones-vscode.html           ← nuevo
│       ├── guia-primer-sitio-web.html        ← nuevo
│       ├── como-funciona-internet.html
│       ├── nat-traversal.html
│       ├── 5-proyectos-javascript.html
│       ├── html-semantico.html
│       ├── arquitectura-multiplayer.html
│       └── anti-cheat.html
├── tools/
│   ├── index.html                ← Landing de 5 herramientas
│   ├── flashcard.html            ← Generador de flashcards funcional
│   ├── gradecalc.html            ← Calculadora de notas funcional
│   ├── pomodoro.html             ← Temporizador Pomodoro funcional
│   ├── dashboard.html            ← Kanban task dashboard funcional
│   └── markdown-editor.html      ← Editor Markdown en vivo funcional
├── css/
│   └── style.css                 ← Estilos completos (responsive, dark theme)
└── js/
    ├── script.js                 ← Menú hamburguesa + animación contadores
    ├── flashcard.js              ← Lógica flashcards
    ├── gradecalc.js              ← Lógica calculadora notas
    ├── pomodoro.js               ← Lógica temporizador
    ├── dashboard.js              ← Lógica Kanban (LocalStorage)
    ├── markdown.js               ← Parser Markdown + preview
    └── cookie-consent.js         ← Banner cookies GDPR
```

---

## PALETA DE COLORES

- Background: #0f172a (slate-900)
- Cards: #1e293b (slate-800)
- Texto: #e2e8f0 (slate-200)
- Acento primario: #38bdf8 (sky-400)
- Acento secundario: #a78bfa (violet-400)
- Bordes: #334155 (slate-700)

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

## PENDIENTE

- [ ] DNS Cloudflare propagándose (nameservers cambiados en Hostinger)
- [ ] Verificar Google Search Console con meta tag (ya está en index.html)
- [ ] Conectar Google Analytics
- [ ] Escribir más artículos (1 por semana recomendado)
- [ ] Crear perfiles en X/Twitter o LinkedIn para promocionar
- [ ] Solicitar Google AdSense cuando haya tráfico
- [ ] Añadir más herramientas / funcionalidades

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
