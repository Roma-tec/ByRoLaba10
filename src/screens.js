// Оформленные экраны «ByRo Paint» (1280×800). Собираются из компонентов ui.js и токенов tokens.js.
const { text, rect, line, svgWrap } = require('./common');
const { icon, ICON_NAMES } = require('./icons');
const { themes } = require('./tokens');
const U = require('./ui');

const W = 1280, H = 800;
const TOOLS = [['select', 'move'], ['brush', 'pencil', 'eraser', 'fill', 'picker'], ['text', 'rect', 'ellipse', 'line'], ['crop', 'hand', 'zoom']];

// ---------- Редактор ----------
function menuBar(t, o = {}) {
  let s = rect(0, 0, W, 40, { fill: t.panel }) + line(0, 40, W, 40, { stroke: t.border, sw: 1 });
  s += U.logo(t, 12, 6, 28);
  let x = 56;
  for (const m of ['Файл', 'Правка', 'Изображение', 'Слой', 'Вид', 'Справка']) {
    if (o.openMenu === m) s += rect(x - 8, 6, U.tw(m, 13) + 16, 28, { r: 6, fill: t.hover });
    s += text(x, 25, m, { size: 13, fill: t.text }); x += U.tw(m, 13) + 22;
  }
  s += text(640, 25, o.file || 'Открытка.bpx — 1500 × 1050 px', { size: 13, fill: t.text2, anchor: 'middle' });
  s += U.iconButton(t, 870, 4, 'undo') + U.iconButton(t, 904, 4, 'redo');
  s += U.select(t, 946, 6, 82, { value: o.zoom || '50 %', h: 28 });
  s += icon('cloud', 1044, 10, 20, t.success);
  s += U.avatar(1086, 20, 14, o.initials || 'ДК', '#2A9D8F');
  s += U.button(t, 1112, 5, 156, 'Экспорт', { ic: 'export', h: 30, state: o.exportState });
  return s;
}

function optionsBar(t, tool) {
  let s = rect(0, 40, W, 44, { fill: t.panel }) + line(0, 84, W, 84, { stroke: t.border, sw: 1 });
  const y = 46;
  s += icon(tool, 14, y + 6, 20, t.accent);
  if (tool === 'brush') {
    s += text(42, y + 21, 'Кисть', { size: 13, weight: 700, fill: t.text });
    s += U.select(t, 96, y, 160, { value: 'Круглая мягкая' });
    s += U.slider(t, 300, y + 22, 130, 0.24, { label: 'Размер', valueText: '24 px' });
    s += U.slider(t, 460, y + 22, 130, 1, { label: 'Непрозрачность', valueText: '100 %' });
    s += U.slider(t, 620, y + 22, 130, 0.6, { label: 'Жёсткость', valueText: '60 %' });
    s += U.toggle(t, 790, y + 6, true, 'Сглаживание');
    s += U.checkbox(t, 940, y + 7, true, 'Нажим пера');
  } else if (tool === 'text') {
    s += text(42, y + 21, 'Текст', { size: 13, weight: 700, fill: t.text });
    s += U.select(t, 96, y, 190, { value: 'Segoe Print' });
    s += U.select(t, 296, y, 80, { value: '48 px' });
    s += U.iconButton(t, 392, y, 'bold', { state: 'active' }) + U.iconButton(t, 428, y, 'italic');
    s += line(470, y + 6, 470, y + 26, { stroke: t.border, sw: 1 });
    s += U.iconButton(t, 482, y, 'alignleft') + U.iconButton(t, 518, y, 'aligncenter', { state: 'active' });
    s += line(560, y + 6, 560, y + 26, { stroke: t.border, sw: 1 });
    s += text(576, y + 21, 'Цвет', { size: 12, fill: t.text2 }) + rect(612, y + 4, 24, 24, { r: 5, fill: '#264653', stroke: t.border });
    s += U.slider(t, 664, y + 22, 120, 0.4, { label: 'Межстрочный', valueText: '1,2' });
    s += U.button(t, 1036, y, 110, 'Отмена', { kind: 'secondary' }) + U.button(t, 1156, y, 110, 'Готово', { ic: 'check' });
  } else if (tool === 'crop') {
    s += text(42, y + 21, 'Кадрирование', { size: 13, weight: 700, fill: t.text });
    s += U.segmented(t, 156, y, ['Свободно', '1:1', '4:3', '16:9', 'Исходные'], 2);
    s += U.input(t, 540, y, 90, { value: '1200', suffix: 'px' }) + text(640, y + 21, '×', { size: 14, fill: t.text2 });
    s += U.input(t, 656, y, 90, { value: '900', suffix: 'px' });
    s += U.checkbox(t, 770, y + 7, true, 'Удалить обрезанное');
    s += U.button(t, 1036, y, 110, 'Отмена', { kind: 'secondary' }) + U.button(t, 1156, y, 110, 'Применить', { ic: 'check' });
  }
  return s;
}

function toolBar(t, active, o = {}) {
  let s = rect(0, 84, 52, 690, { fill: t.panel }) + line(52, 84, 52, 774, { stroke: t.border, sw: 1 });
  let y = 92;
  const pos = {};
  TOOLS.forEach((g, gi) => {
    if (gi) { s += line(12, y + 2, 40, y + 2, { stroke: t.border, sw: 1 }); y += 8; }
    g.forEach(n => { pos[n] = y; s += U.toolButton(t, 8, y, n, n === active ? 'active' : (n === o.hover ? 'hover' : 'default')); y += 40; });
  });
  // основной и дополнительный цвета
  s += rect(20, 700, 24, 24, { r: 5, fill: '#FFFFFF', stroke: t.text3 });
  s += rect(9, 689, 24, 24, { r: 5, fill: o.swatch || '#E63946', stroke: t.panel, sw: 2 });
  s += icon('swap', 30, 680, 14, t.text2);
  return { s, pos };
}

function rightPanel(t, o = {}) {
  const X = 1000, w = 280;
  let s = rect(X, 84, w, 690, { fill: t.panel }) + line(X, 84, X, 774, { stroke: t.border, sw: 1 });
  s += text(X + 16, 108, 'Цвет', { size: 13, weight: 700, fill: t.text }) + icon('chevdown', X + w - 32, 96, 16, t.text2);
  s += U.colorPanel(t, X + 16, 120, w - 32, o.color || {});
  s += U.tabs(t, X, 376, w, ['Слои', 'История'], o.tab === 'history' ? 1 : 0);
  if (o.tab === 'history') {
    const steps = [['filenew', 'Новый холст'], ['fill', 'Заливка — небо'], ['brush', 'Кисть — горы'], ['brush', 'Кисть — дом'],
      ['ellipse', 'Эллипс — солнце'], ['text', 'Текст'], ['image', 'Открыть: фото.jpg'], ['crop', 'Кадрирование'], ['brush', 'Кисть'], ['eraser', 'Ластик']];
    steps.forEach(([ic, n], i) => {
      const y = 422 + i * 32, cur = i === 7, undone = i > 7;
      if (cur) s += rect(X, y, w, 32, { fill: t.accentSoft }) + rect(X, y, 3, 32, { fill: t.accent });
      s += icon(ic, X + 16, y + 8, 16, undone ? t.text3 : (cur ? t.accent : t.text2));
      s += text(X + 44, y + 21, n, { size: 13, fill: undone ? t.text3 : t.text, weight: cur ? 600 : 400, italic: undone });
    });
    s += text(X + 16, 760, 'Отменено 2 шага · Ctrl+Z / Ctrl+Y', { size: 12, fill: t.text3 });
  } else {
    s += U.select(t, X + 16, 424, 140, { value: 'Обычный', h: 28 }) + U.input(t, X + 166, 424, 98, { value: '100 %', h: 28, suffix: 'α' });
    const L = o.layers || [
      { name: 'Подпись', sub: 'Текст', thumb: '' },
      { name: 'Мазок кистью', thumb: '' },
      { name: 'Дом и дерево', active: true, thumb: '' },
      { name: 'Горы', thumb: '' },
      { name: 'Небо', sub: 'Фон', locked: true, thumb: '' },
    ];
    L.forEach((l, i) => { s += U.layerRow(t, X, 462 + i * 44, w, { ...l, thumb: U.artwork(l.v || 0, l.art || {}) }); });
    s += line(X, 730, X + w, 730, { stroke: t.border, sw: 1 });
    s += U.iconButton(t, X + 12, 736, 'plus') + U.iconButton(t, X + 48, 736, 'copy') + U.iconButton(t, X + 84, 736, 'folder');
    s += U.iconButton(t, X + w - 44, 736, 'trash');
  }
  return s;
}

function statusBar(t, o = {}) {
  let s = rect(0, 774, W, 26, { fill: t.panel2 }) + line(0, 774, W, 774, { stroke: t.border, sw: 1 });
  s += text(14, 791, o.coords || 'X: 812  Y: 406 px', { size: 12, fill: t.text2 });
  s += text(160, 791, (o.size || '1500 × 1050') + ' px  ·  72 DPI  ·  RGB', { size: 12, fill: t.text2 });
  s += text(420, 791, 'Слой: ' + (o.layer || 'Дом и дерево'), { size: 12, fill: t.text2 });
  s += `<circle cx="1000" cy="787" r="4" fill="${o.unsaved ? t.warning : t.success}"/>` + text(1010, 791, o.saved || 'Сохранено в облако · 1 мин назад', { size: 12, fill: t.text2 });
  return s;
}

function workspace(t, o = {}) {
  let s = rect(52, 84, 948, 690, { fill: t.work });
  const cx = 176, cy = 184, cw = 700, ch = 490;
  s += rect(cx + 4, cy + 6, cw, ch, { fill: '#000', opacity: 0.12 });
  s += `<svg x="${cx}" y="${cy}" width="${cw}" height="${ch}" viewBox="0 0 400 260" preserveAspectRatio="xMidYMid slice">${U.artwork(o.v || 0, o.art || {})}</svg>`;
  return s;
}

function editor(t, o = {}) {
  let s = rect(0, 0, W, H, { fill: t.appBg });
  s += workspace(t, o);
  s += menuBar(t, o) + optionsBar(t, o.tool || 'brush');
  const tb = toolBar(t, o.tool || 'brush', o);
  s += tb.s + rightPanel(t, o) + statusBar(t, o);
  if (o.extra) s += o.extra(t, tb.pos);
  return s;
}

// Курсор-кисть на холсте
const brushCursor = (x, y, r) => `<circle cx="${x}" cy="${y}" r="${r}" fill="none" stroke="#fff" stroke-width="2"/><circle cx="${x}" cy="${y}" r="${r}" fill="none" stroke="#000" stroke-width="1" stroke-dasharray="3 3"/>`;

// ---------- Экраны ----------
const S = {};

// 05 — главный экран редактора (светлая тема), кисть + подсказка
S['scr-05-editor'] = () => editor(themes.light, {
  tool: 'brush', hover: 'brush',
  extra: (t, pos) => U.tooltip(t, 56, pos.brush + 4, 'Кисть — рисование мягкими линиями', 'B') + brushCursor(640, 560, 14) +
    `<path d="M560 590 C585 570 605 600 628 572" fill="none" stroke="#E63946" stroke-width="6" stroke-linecap="round"/>`,
});

// 06 — редактор, тёмная тема: инструмент «Текст», слой с подписью
S['scr-06-editor-dark'] = () => editor(themes.dark, {
  tool: 'text', art: { caption: 'С днём рождения!' }, color: { hue: '#00B4D8', hex: '264653' }, swatch: '#264653', layer: 'Подпись',
  layers: [
    { name: 'Подпись', sub: 'Текст · Segoe Print 48', active: true, art: { caption: 'С днём рождения!', noSky: true } },
    { name: 'Мазок кистью' }, { name: 'Дом и дерево' }, { name: 'Горы', visible: false }, { name: 'Небо', sub: 'Фон', locked: true },
  ],
  extra: (t) => {
    // рамка редактирования текста на холсте
    const x = 252, y = 222, w = 436, h = 76;
    let s = rect(x, y, w, h, { stroke: t.accent, sw: 1.5, dash: '6 4' });
    [[x, y], [x + w, y], [x, y + h], [x + w, y + h], [x + w / 2, y], [x + w / 2, y + h]].forEach(([a, b]) => s += rect(a - 5, b - 5, 10, 10, { fill: '#fff', stroke: t.accent, sw: 1.5 }));
    s += line(x + w - 34, y + 16, x + w - 34, y + h - 16, { stroke: t.accent, sw: 2 });
    return s;
  },
});

// 07 — редактор: кадрирование + панель «История» (светлая тема)
S['scr-07-editor-crop'] = () => editor(themes.light, {
  tool: 'crop', tab: 'history', v: 3, file: 'фото_лето.jpg — 1600 × 1200 px', layer: 'Фон', saved: 'Изменения не сохранены', unsaved: 1, size: '1600 × 1200', coords: 'X: 1310  Y: 984 px',
  extra: (t) => {
    const cx = 176, cy = 184, cw = 700, ch = 490, x = 276, y = 236, w = 480, h = 360;
    let s = `<path d="M${cx} ${cy}h${cw}v${ch}h-${cw}z M${x} ${y}v${h}h${w}v-${h}z" fill="#000" fill-opacity=".5" fill-rule="evenodd"/>`;
    s += rect(x, y, w, h, { stroke: '#fff', sw: 2 });
    for (let i = 1; i < 3; i++) s += line(x + w * i / 3, y, x + w * i / 3, y + h, { stroke: '#fff', sw: 1, dash: '4 4' }) + line(x, y + h * i / 3, x + w, y + h * i / 3, { stroke: '#fff', sw: 1, dash: '4 4' });
    [[x, y, 1, 1], [x + w, y, -1, 1], [x, y + h, 1, -1], [x + w, y + h, -1, -1]].forEach(([a, b, dx, dy]) => s += `<path d="M${a} ${b + dy * 22}V${b}H${a + dx * 22}" fill="none" stroke="#fff" stroke-width="5"/>`);
    s += rect(x + w / 2 - 60, y + h + 12, 120, 26, { r: 6, fill: '#1F2329', opacity: 0.85 }) + text(x + w / 2, y + h + 30, '1200 × 900 px', { size: 12.5, fill: '#fff', anchor: 'middle', weight: 600 });
    return s;
  },
});

// Левая иллюстрация на экранах входа
function authAside(t) {
  let s = rect(0, 0, 560, H, { fill: t.accent });
  s += `<svg x="60" y="170" width="440" height="286" viewBox="0 0 400 260">${U.artwork(1)}</svg>`;
  s += rect(60, 170, 440, 286, { r: 0, stroke: '#fff', sw: 6, opacity: 0.9 });
  s += U.logo({ ...t, accent: '#fff', onAccent: t.accent }, 60, 60, 36) + text(108, 85, 'ByRo Paint', { size: 22, weight: 700, fill: '#fff' });
  s += text(60, 530, 'Рисуйте сразу —\nбез сложных настроек', { size: 30, weight: 700, fill: '#fff' });
  s += text(60, 620, 'Кисти, слои, текст и экспорт в PNG, JPG, SVG и PDF.\nАккаунт нужен только для облака.', { size: 15, fill: '#fff' });
  return s;
}

// 01 — регистрация (светлая тема)
S['scr-01-register'] = () => {
  const t = themes.light;
  let s = rect(0, 0, W, H, { fill: t.panel }) + authAside(t);
  s += U.button(t, 1040, 24, 216, 'Продолжить без входа →', { kind: 'ghost', fg: t.accent });
  const x = 680, w = 460;
  s += text(x, 130, 'Создание аккаунта', { size: 28, weight: 700, fill: t.text });
  s += text(x, 160, 'Сохраняйте работы в облаке и открывайте их на любом компьютере.', { size: 14, fill: t.text2 });
  s += U.input(t, x, 210, w, { label: 'Имя', value: 'Дмитрий', icL: 'user', h: 40 });
  s += U.input(t, x, 290, w, { label: 'E-mail', value: 'dmitry.k@example.com', icL: 'mail', h: 40 });
  s += U.input(t, x, 370, w, { label: 'Пароль', value: 'risuyu2026', password: true, icL: 'lock', icR: 'eye', state: 'focus', h: 40 });
  [t.success, t.success, t.success, t.border].forEach((c, i) => s += rect(x + i * 117, 420, 109, 4, { r: 2, fill: c }));
  s += text(x, 442, 'Надёжный пароль: 10 символов, буквы и цифры', { size: 12, fill: t.success });
  s += U.checkbox(t, x, 466, true, 'Я принимаю условия использования и политику конфиденциальности');
  s += U.button(t, x, 510, w, 'Зарегистрироваться', { h: 44, size: 14 });
  s += line(x, 584, x + 190, 584, { stroke: t.border, sw: 1 }) + text(x + w / 2, 589, 'или', { size: 13, fill: t.text3, anchor: 'middle' }) + line(x + 270, 584, x + w, 584, { stroke: t.border, sw: 1 });
  s += U.button(t, x, 608, 222, 'Google', { kind: 'secondary', h: 40 }) + `<circle cx="${x + 70}" cy="628" r="10" fill="#EA4335"/>` + text(x + 70, 632.5, 'G', { size: 12, anchor: 'middle', fill: '#fff', weight: 700 });
  s += U.button(t, x + 238, 608, 222, 'VK ID', { kind: 'secondary', h: 40 }) + rect(x + 238 + 70, 618, 20, 20, { r: 5, fill: '#0077FF' }) + text(x + 238 + 80, 632, 'vk', { size: 10, anchor: 'middle', fill: '#fff', weight: 700 });
  s += text(x + w / 2, 700, 'Уже есть аккаунт?', { size: 14, fill: t.text2, anchor: 'end' }) + text(x + w / 2 + 6, 700, 'Войти', { size: 14, fill: t.accent, weight: 700 });
  return s;
};

// 02 — вход (тёмная тема), состояние ошибки
S['scr-02-login'] = () => {
  const t = themes.dark;
  let s = rect(0, 0, W, H, { fill: t.panel }) + authAside(t);
  s += U.button(t, 1040, 24, 216, 'Продолжить без входа →', { kind: 'ghost', fg: t.accentHover });
  const x = 680, w = 460;
  s += text(x, 170, 'Вход в ByRo Paint', { size: 28, weight: 700, fill: t.text });
  s += text(x, 200, 'Рады видеть вас снова!', { size: 14, fill: t.text2 });
  s += U.input(t, x, 250, w, { label: 'E-mail', value: 'dmitry.k@example.com', icL: 'mail', h: 40 });
  s += U.input(t, x, 330, w, { label: 'Пароль', value: 'risuyu', password: true, icL: 'lock', icR: 'eye', state: 'error', h: 40, helper: 'Неверный пароль. Осталось попыток: 4' });
  s += text(x + w, 323, 'Забыли пароль?', { size: 12, fill: t.accentHover, anchor: 'end', weight: 600 });
  s += U.checkbox(t, x, 410, true, 'Запомнить меня на этом компьютере');
  s += U.button(t, x, 452, w, 'Войти', { h: 44, size: 14 });
  s += line(x, 526, x + 190, 526, { stroke: t.border, sw: 1 }) + text(x + w / 2, 531, 'или', { size: 13, fill: t.text3, anchor: 'middle' }) + line(x + 270, 526, x + w, 526, { stroke: t.border, sw: 1 });
  s += U.button(t, x, 550, 222, 'Google', { kind: 'secondary', h: 40 }) + `<circle cx="${x + 70}" cy="570" r="10" fill="#EA4335"/>` + text(x + 70, 574.5, 'G', { size: 12, anchor: 'middle', fill: '#fff', weight: 700 });
  s += U.button(t, x + 238, 550, 222, 'VK ID', { kind: 'secondary', h: 40 }) + rect(x + 238 + 70, 560, 20, 20, { r: 5, fill: '#0077FF' }) + text(x + 238 + 80, 574, 'vk', { size: 10, anchor: 'middle', fill: '#fff', weight: 700 });
  s += text(x + w / 2, 642, 'Нет аккаунта?', { size: 14, fill: t.text2, anchor: 'end' }) + text(x + w / 2 + 6, 642, 'Зарегистрироваться', { size: 14, fill: t.accentHover, weight: 700 });
  return s;
};

// 03 — стартовый экран (светлая тема)
function startScreen(t) {
  let s = rect(0, 0, W, H, { fill: t.appBg });
  s += rect(0, 0, W, 56, { fill: t.panel }) + line(0, 56, W, 56, { stroke: t.border, sw: 1 });
  s += U.logo(t, 20, 14, 28) + text(58, 34, 'ByRo Paint', { size: 16, weight: 700, fill: t.text });
  s += U.input(t, 440, 12, 400, { placeholder: 'Поиск по моим работам', icL: 'search' });
  s += U.iconButton(t, 1110, 12, 'sun') + U.avatar(1176, 28, 15, 'ДК', '#2A9D8F') + text(1198, 33, 'Дмитрий', { size: 13, fill: t.text });
  // навигация
  s += rect(0, 56, 220, 744, { fill: t.panel }) + line(220, 56, 220, 800, { stroke: t.border, sw: 1 });
  [['home', 'Главная', 1], ['clock', 'Недавние'], ['cloud', 'Облако'], ['template', 'Шаблоны']].forEach(([ic, n, a], i) => {
    const y = 76 + i * 40;
    if (a) s += rect(12, y, 196, 36, { r: 8, fill: t.accentSoft });
    s += icon(ic, 26, y + 8, 20, a ? t.accent : t.text2) + text(58, y + 23, n, { size: 14, fill: a ? t.accent : t.text, weight: a ? 600 : 400 });
  });
  [['settings', 'Настройки'], ['info', 'Справка']].forEach(([ic, n], i) => { const y = 700 + i * 40; s += icon(ic, 26, y + 8, 20, t.text2) + text(58, y + 23, n, { size: 14, fill: t.text }); });
  // действия
  s += text(252, 100, 'Добрый вечер, Дмитрий!', { size: 24, weight: 700, fill: t.text });
  const card = (x, w, ic, title, sub, accent, dash) => {
    let c = rect(x, 124, w, 120, { r: 12, fill: accent ? t.accent : t.panel, stroke: accent ? 'none' : t.border, dash: dash ? '8 6' : null, sw: dash ? 1.5 : 1 });
    c += icon(ic, x + 20, 144, 32, accent ? t.onAccent : t.accent);
    c += text(x + 20, 210, title, { size: 16, weight: 700, fill: accent ? t.onAccent : t.text });
    c += text(x + 20, 230, sub, { size: 12, fill: accent ? t.onAccent : t.text3 });
    return c;
  };
  s += card(252, 230, 'filenew', 'Создать', 'Новый холст · Ctrl+N', true);
  s += card(498, 230, 'folder', 'Открыть файл', 'PNG, JPG, BPX, PSD · Ctrl+O');
  s += card(744, 230, 'clipboard', 'Из буфера обмена', 'Вставить картинку · Ctrl+V');
  s += card(990, 266, 'image', 'Перетащите файл сюда', 'или в любое место окна', false, true);
  // недавние
  s += text(252, 290, 'Недавние', { size: 18, weight: 700, fill: t.text }) + text(1256, 290, 'Все работы →', { size: 13, fill: t.accent, anchor: 'end', weight: 600 });
  [['Открытка.bpx', '1500 × 1050 · 2 часа назад', 0, 1], ['Обложка курсовой.bpx', '2480 × 3508 · вчера', 3], ['Ночной город.bpx', '1920 × 1080 · 3 дня назад', 2, 1], ['Плакат.bpx', '1080 × 1080 · 12 октября', 1]]
    .forEach(([n, m, v, cloud], i) => {
      const x = 252 + i * 254;
      s += rect(x, 306, 238, 200, { r: 10, fill: t.panel, stroke: t.border });
      s += `<svg x="${x + 1}" y="307" width="236" height="134" viewBox="0 0 400 260" preserveAspectRatio="xMidYMid slice">${U.artwork(v)}</svg>`;
      s += text(x + 14, 466, n, { size: 14, weight: 600, fill: t.text }) + text(x + 14, 488, m, { size: 12, fill: t.text3 });
      if (cloud) s += icon('cloud', x + 206, 452, 18, t.text3);
    });
  // шаблоны
  s += text(252, 552, 'Шаблоны размеров', { size: 18, weight: 700, fill: t.text });
  [['Открытка', '1500 × 1050', 60, 42], ['Full HD', '1920 × 1080', 64, 36], ['Лист A4', '2480 × 3508', 34, 48], ['Квадрат', '1080 × 1080', 46, 46], ['Аватар', '512 × 512', 40, 40]]
    .forEach(([n, m, w, h], i) => {
      const x = 252 + i * 203;
      s += rect(x, 568, 187, 150, { r: 10, fill: t.panel, stroke: t.border });
      s += rect(x + 93 - w / 2, 610 - h / 2, w, h, { r: 3, fill: t.accentSoft, stroke: t.accent, sw: 1.4 });
      s += text(x + 93, 676, n, { size: 14, weight: 600, fill: t.text, anchor: 'middle' }) + text(x + 93, 698, m + ' px', { size: 12, fill: t.text3, anchor: 'middle' });
    });
  return s;
}
S['scr-03-start'] = () => startScreen(themes.light);

// 04 — диалог «Новый холст» поверх стартового экрана
S['scr-04-new-canvas'] = () => {
  const t = themes.light;
  let s = startScreen(t) + rect(0, 0, W, H, { fill: t.overlay });
  const X = 250, Y = 130, w = 780, h = 540;
  s += U.modal(t, X, Y, w, h, 'Новый холст');
  // пресеты
  s += rect(X + 24, Y + 64, 230, 396, { r: 8, fill: t.panel2 });
  [['clock', 'Последний', '1500 × 1050'], ['image', 'Full HD', '1920 × 1080', 1], ['image', 'Открытка', '1500 × 1050'], ['filenew', 'Лист A4', '2480 × 3508'],
    ['template', 'Квадрат', '1080 × 1080'], ['user', 'Аватар', '512 × 512'], ['settings', 'Свой размер', '']].forEach(([ic, n, m, a], i) => {
    const y = Y + 72 + i * 54;
    if (a) s += rect(X + 32, y, 214, 48, { r: 7, fill: t.accentSoft, stroke: t.accent });
    s += icon(ic, X + 44, y + 14, 20, a ? t.accent : t.text2);
    s += text(X + 76, y + (m ? 21 : 29), n, { size: 13, weight: 600, fill: a ? t.accent : t.text });
    if (m) s += text(X + 76, y + 38, m + ' px', { size: 12, fill: t.text3 });
  });
  // параметры
  const x = X + 280, fw = 476;
  s += U.input(t, x, Y + 90, fw, { label: 'Название', value: 'Без названия-1' });
  s += U.input(t, x, Y + 160, 200, { label: 'Ширина', value: '1920', suffix: 'px' });
  s += U.iconButton(t, x + 214, Y + 160, 'link', { state: 'active' });
  s += U.input(t, x + 260, Y + 160, 216, { label: 'Высота', value: '1080', suffix: 'px' });
  s += U.select(t, x, Y + 230, 200, { label: 'Разрешение', value: '72 DPI (экран)' });
  s += text(x + 260, Y + 223, 'Ориентация', { size: 12, fill: t.text2, weight: 600 }) + U.segmented(t, x + 260, Y + 230, ['Книжная', 'Альбомная'], 1);
  s += text(x, Y + 300, 'Фон', { size: 12, fill: t.text2, weight: 600 });
  [['Белый', '#FFFFFF', 1], ['Прозрачный', null], ['Свой цвет', '#FDE7C8']].forEach(([n, c, a], i) => {
    const bx = x + i * 162;
    s += rect(bx, Y + 310, 152, 48, { r: 8, fill: t.panel, stroke: a ? t.accent : t.border, sw: a ? 2 : 1 });
    s += c ? rect(bx + 10, Y + 320, 28, 28, { r: 5, fill: c, stroke: t.border }) : U.checker(bx + 10, Y + 320, 28, 28, 7);
    s += text(bx + 48, Y + 339, n, { size: 13, fill: t.text, weight: a ? 600 : 400 });
  });
  s += rect(x, Y + 380, fw, 80, { r: 8, fill: t.panel2 });
  s += rect(x + 16, Y + 392, 100, 56, { fill: '#fff', stroke: t.border });
  s += text(x + 132, Y + 414, 'Full HD, альбомная · 1920 × 1080 px', { size: 13, fill: t.text, weight: 600 });
  s += text(x + 132, Y + 436, 'Для обоев и презентаций · ≈ 8 МБ в памяти', { size: 12, fill: t.text3 });
  s += line(X, Y + h - 72, X + w, Y + h - 72, { stroke: t.border, sw: 1 });
  s += U.checkbox(t, X + 24, Y + h - 46, false, 'Запомнить как пресет');
  s += U.button(t, X + w - 284, Y + h - 54, 120, 'Отмена', { kind: 'secondary', h: 36 }) + U.button(t, X + w - 152, Y + h - 54, 128, 'Создать', { h: 36, state: 'focus' });
  return s;
};

// 08 — диалог «Экспорт» поверх редактора
S['scr-08-export'] = () => {
  const t = themes.light;
  let s = editor(t, { tool: 'brush', exportState: 'pressed' }) + rect(0, 0, W, H, { fill: t.overlay });
  const X = 170, Y = 100, w = 940, h = 600;
  s += U.modal(t, X, Y, w, h, 'Экспорт изображения');
  s += U.checker(X + 24, Y + 64, 500, 380, 10);
  s += `<svg x="${X + 32}" y="${Y + 98}" width="484" height="312" viewBox="0 0 400 260">${U.artwork(0, { noSky: true })}</svg>`;
  s += text(X + 24, Y + 468, 'Предпросмотр · 1500 × 1050 px · PNG с прозрачностью', { size: 12, fill: t.text3 });
  const x = X + 556, fw = 360;
  s += text(x, Y + 76, 'Формат', { size: 12, fill: t.text2, weight: 600 }) + U.segmented(t, x, Y + 84, ['PNG', 'JPG', 'SVG', 'PDF', 'BMP'], 0, { iw: 70 });
  s += U.slider(t, x, Y + 160, fw, 0.9, { label: 'Качество (только для JPG)', valueText: '90 %', state: 'disabled' });
  s += text(x, Y + 196, 'PNG сохраняет без потерь и поддерживает прозрачность.', { size: 12, fill: t.text3 });
  s += text(x, Y + 232, 'Размер', { size: 12, fill: t.text2, weight: 600 }) + U.segmented(t, x, Y + 240, ['0,5×', '1×', '2×', 'Свой'], 1, { iw: 89 });
  s += U.input(t, x, Y + 300, 160, { value: '1500', suffix: 'px' }) + U.iconButton(t, x + 166, Y + 300, 'link', { state: 'active' }) + U.input(t, x + 200, Y + 300, 160, { value: '1050', suffix: 'px' });
  s += U.checkbox(t, x, Y + 352, true, 'Прозрачный фон (скрыть слой «Небо»)');
  s += U.checkbox(t, x, Y + 382, true, 'Только видимые слои');
  s += U.checkbox(t, x, Y + 412, false, 'Встроить цветовой профиль sRGB');
  s += U.input(t, x, Y + 466, 230, { label: 'Имя файла', value: 'Открытка.png' }) + U.select(t, x + 240, Y + 466, 120, { label: 'Папка', value: 'Открытки' });
  s += line(X, Y + h - 72, X + w, Y + h - 72, { stroke: t.border, sw: 1 });
  s += icon('info', X + 24, Y + h - 46, 18, t.text3) + text(X + 50, Y + h - 32, 'Примерный размер файла: 1,4 МБ', { size: 13, fill: t.text2 });
  s += U.button(t, X + w - 324, Y + h - 54, 120, 'Отмена', { kind: 'secondary', h: 36 }) + U.button(t, X + w - 192, Y + h - 54, 168, 'Экспортировать', { h: 36, ic: 'export', state: 'hover' });
  return s;
};

// Мини-превью редактора в теме (для карточек тем в настройках)
function themeThumb(t, x, y, w, h) {
  let s = rect(x, y, w, h, { r: 6, fill: t.appBg, stroke: t.border });
  s += rect(x, y, w, 12, { fill: t.panel }) + rect(x, y + 12, 12, h - 12, { fill: t.panel }) + rect(x + w - 42, y + 12, 42, h - 12, { fill: t.panel });
  s += rect(x + 20, y + 22, w - 70, h - 34, { fill: t.work });
  s += rect(x + 28, y + 28, w - 86, h - 46, { fill: '#fff' }) + `<circle cx="${x + w - 72}" cy="${y + 38}" r="6" fill="#FFB703"/>`;
  s += rect(x + 3, y + 18, 6, 6, { r: 1.5, fill: t.accent }) + rect(x + w - 38, y + 18, 34, 5, { r: 2, fill: t.accent });
  [0, 1, 2].forEach(i => s += rect(x + w - 38, y + 30 + i * 9, 34, 4, { r: 2, fill: t.border }));
  return s + rect(x, y, w, h, { r: 6, stroke: t.border, sw: 1 });
}

// 09 — настройки (светлая тема)
S['scr-09-settings'] = () => {
  const t = themes.light;
  let s = rect(0, 0, W, H, { fill: t.appBg });
  s += rect(0, 0, W, 56, { fill: t.panel }) + line(0, 56, W, 56, { stroke: t.border, sw: 1 });
  s += U.iconButton(t, 16, 12, 'chevleft', { color: t.text });
  s += text(56, 34, 'Настройки', { size: 18, weight: 700, fill: t.text });
  s += U.button(t, 1140, 12, 124, 'Готово', { kind: 'secondary' });
  s += rect(0, 56, 260, 744, { fill: t.panel }) + line(260, 56, 260, 800, { stroke: t.border, sw: 1 });
  [['palette', 'Внешний вид', 1], ['brush', 'Холст и инструменты'], ['keyboard', 'Горячие клавиши'], ['save', 'Сохранение'], ['user', 'Аккаунт'], ['info', 'О программе']].forEach(([ic, n, a], i) => {
    const y = 76 + i * 40;
    if (a) s += rect(12, y, 236, 36, { r: 8, fill: t.accentSoft });
    s += icon(ic, 26, y + 8, 20, a ? t.accent : t.text2) + text(58, y + 23, n, { size: 14, fill: a ? t.accent : t.text, weight: a ? 600 : 400 });
  });
  const x = 300;
  s += text(x, 104, 'Внешний вид', { size: 24, weight: 700, fill: t.text });
  s += text(x, 140, 'Тема оформления', { size: 14, weight: 600, fill: t.text });
  [['light', 'Светлая', 1], ['dark', 'Тёмная'], ['contrast', 'Контрастная'], [null, 'Как в системе']].forEach(([k, n, a], i) => {
    const cx = x + i * 236;
    s += rect(cx, 154, 220, 176, { r: 10, fill: t.panel, stroke: a ? t.accent : t.border, sw: a ? 2 : 1 });
    if (k) s += themeThumb(themes[k], cx + 12, 166, 196, 116);
    else s += `<clipPath id="half"><rect x="${cx + 110}" y="166" width="98" height="116"/></clipPath>` + themeThumb(themes.light, cx + 12, 166, 196, 116) + `<g clip-path="url(#half)">${themeThumb(themes.dark, cx + 12, 166, 196, 116)}</g>`;
    s += U.radio(t, cx + 12, 296, !!a, n);
  });
  s += U.select(t, x, 384, 300, { label: 'Язык интерфейса', value: 'Русский', icL: 'globe' });
  s += U.slider(t, x + 360, 400, 300, 0.5, { label: 'Масштаб интерфейса', valueText: '100 %' });
  s += text(x, 460, 'Акцентный цвет', { size: 12, fill: t.text2, weight: 600 });
  ['#4F46E5', '#2563EB', '#0D9488', '#DB2777', '#EA580C'].forEach((c, i) => {
    s += `<circle cx="${x + 16 + i * 40}" cy="${486}" r="14" fill="${c}"/>`;
    if (!i) s += `<circle cx="${x + 16}" cy="486" r="18" fill="none" stroke="${c}" stroke-width="2"/>` + icon('check', x + 8, 478, 16, '#fff', 2.6);
  });
  s += line(x, 528, 1240, 528, { stroke: t.border, sw: 1 });
  [['Показывать подсказки к инструментам', 'Название и горячая клавиша при наведении', true],
    ['Автосохранение каждые 5 минут', 'Копия работы хранится локально и в облаке', true],
    ['Плавная анимация панелей', 'Отключите на слабых компьютерах', true],
    ['Открывать последнюю работу при запуске', 'Вместо стартового экрана', false]].forEach(([a, b, on], i) => {
    const y = 548 + i * 56;
    s += text(x, y + 18, a, { size: 14, fill: t.text }) + text(x, y + 38, b, { size: 12, fill: t.text3 });
    s += U.toggle(t, 1204, y + 10, on);
  });
  return s;
};

// Привязка к сборке: каждый экран — отдельный SVG
const out = {};
for (const k in S) out[k] = () => svgWrap(W, H, S[k]());
out.editorParts = { editor, menuBar, optionsBar, toolBar, rightPanel, statusBar, themeThumb };
module.exports = out;
