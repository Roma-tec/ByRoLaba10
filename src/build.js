// Сборка отчёта: генерирует SVG-макеты, вставляет их в content.html и печатает векторный PDF через Edge (headless).
// Запуск:  node src/build.js          (из папки lab10)
//          node src/build.js --no-pdf (только HTML и SVG)
const fs = require('fs');
const path = require('path');
const { execFileSync } = require('child_process');

const ROOT = path.join(__dirname, '..');
const OUT_HTML = path.join(ROOT, 'build', 'ByRoLaba10.html');
const OUT_PDF = path.join(ROOT, 'ByRoLaba10_Proekt_interfeysa.pdf');
const SVG_DIR = path.join(ROOT, 'svg');

// Каждый модуль экспортирует объект { имя: () => '<svg ...>' }
const modules = ['diagrams', 'screens', 'kit'].filter(m => fs.existsSync(path.join(__dirname, m + '.js')));
const gens = Object.assign({}, ...modules.map(m => require('./' + m)));

fs.mkdirSync(path.dirname(OUT_HTML), { recursive: true });
fs.mkdirSync(SVG_DIR, { recursive: true });

const cache = {};
const svg = name => {
  if (!(name in cache)) {
    if (!gens[name]) throw new Error('Нет генератора для {{svg:' + name + '}}');
    cache[name] = gens[name]();
    fs.writeFileSync(path.join(SVG_DIR, name + '.svg'),
      '<?xml version="1.0" encoding="UTF-8"?>\n' + cache[name].replace('<svg ', '<svg xmlns="http://www.w3.org/2000/svg" '));
  }
  return cache[name];
};

const css = fs.readFileSync(path.join(__dirname, 'style.css'), 'utf8');
const body = fs.readFileSync(path.join(__dirname, 'content.html'), 'utf8')
  .replace(/\{\{svg:([\w-]+)\}\}/g, (_, n) => svg(n));

fs.writeFileSync(OUT_HTML, `<!doctype html>
<html lang="ru"><head><meta charset="utf-8">
<title>ByRoLaba10 — Проект интерфейса «ByRo Paint»</title>
<style>${css}</style></head>
<body>${body}</body></html>`);
console.log('HTML:', OUT_HTML, '| SVG:', Object.keys(cache).length);

if (!process.argv.includes('--no-pdf')) {
  const edge = ['C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe',
    'C:/Program Files/Google/Chrome/Application/chrome.exe'].find(fs.existsSync);
  const profile = path.join(require('os').tmpdir(), 'byrolaba10-edge');
  execFileSync(edge, ['--headless=new', '--disable-gpu', '--no-pdf-header-footer', '--user-data-dir=' + profile,
    '--print-to-pdf=' + OUT_PDF, 'file:///' + OUT_HTML.replace(/\\/g, '/')], { stdio: 'ignore' });
  console.log('PDF:', OUT_PDF, Math.round(fs.statSync(OUT_PDF).size / 1024) + ' КБ');
}
