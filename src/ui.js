// Компоненты UI-кита «ByRo Paint». Каждый компонент — функция (тема, координаты, параметры) → фрагмент SVG.
// Состояния: default / hover / pressed / focus / disabled (+ error для полей, active для инструментов и слоёв).
const { text, rect, line } = require('./common');
const { icon } = require('./icons');

let uid = 0;
const id = p => `${p}${++uid}`;
const tw = (s, size = 13, k = 0.56) => String(s).length * size * k; // оценка ширины текста

// ---------- Кнопки ----------
function button(t, x, y, w, label, o = {}) {
  const { kind = 'primary', state = 'default', h = 32, ic, size = 13 } = o;
  let bg, fg, br;
  if (kind === 'primary') { bg = { default: t.accent, hover: t.accentHover, pressed: t.accentPressed, focus: t.accent, disabled: t.disabledBg || t.border }[state]; fg = state === 'disabled' ? t.text3 : t.onAccent; }
  if (kind === 'secondary') { bg = { default: t.panel, hover: t.hover, pressed: t.panel2, focus: t.panel, disabled: t.panel2 }[state]; fg = state === 'disabled' ? t.text3 : t.text; br = state === 'pressed' ? t.text3 : t.border; }
  if (kind === 'ghost') { bg = { default: 'none', hover: t.hover, pressed: t.panel2, focus: 'none', disabled: 'none' }[state]; fg = state === 'disabled' ? t.text3 : (o.fg || t.text); }
  if (kind === 'danger') { bg = { default: t.danger, hover: t.danger, pressed: t.danger, focus: t.danger, disabled: t.disabledBg || t.border }[state]; fg = state === 'disabled' ? t.text3 : '#fff'; }
  let s = '';
  if (state === 'focus') s += rect(x - 3, y - 3, w + 6, h + 6, { r: 9, stroke: t.focus, sw: 2 });
  s += rect(x, y, w, h, { r: 6, fill: bg, stroke: br, sw: 1 });
  if (kind === 'danger' && state === 'hover') s += rect(x, y, w, h, { r: 6, fill: '#000', opacity: 0.1 });
  const lw = tw(label, size, 0.56) + (ic ? 26 : 0);
  let cx = x + w / 2 - lw / 2;
  if (ic) { s += icon(ic, cx, y + h / 2 - 9, 18, fg); cx += 26; }
  s += text(cx, y + h / 2 + size * 0.36, label, { size, fill: fg, weight: 600 });
  return s;
}

function iconButton(t, x, y, name, o = {}) {
  const { size = 32, state = 'default', isz = 20, color } = o;
  let s = '';
  if (state === 'hover') s += rect(x, y, size, size, { r: 6, fill: t.hover });
  if (state === 'active') s += rect(x, y, size, size, { r: 6, fill: t.accentSoft });
  if (state === 'focus') s += rect(x - 2, y - 2, size + 4, size + 4, { r: 8, stroke: t.focus, sw: 2 });
  const c = color || (state === 'active' ? t.accent : state === 'disabled' ? t.text3 : t.text2);
  return s + icon(name, x + (size - isz) / 2, y + (size - isz) / 2, isz, c);
}

// Кнопка инструмента на левой панели (36×36)
const toolButton = (t, x, y, name, state = 'default') => iconButton(t, x, y, name, { size: 36, state, color: state === 'active' ? t.accent : t.text });

// ---------- Поля ввода ----------
function input(t, x, y, w, o = {}) {
  const { label, value, placeholder, state = 'default', icL, icR, helper, h = 32, password, suffix } = o;
  let s = '';
  if (label) s += text(x, y - 7, label, { size: 12, fill: t.text2, weight: 600 });
  const bg = state === 'disabled' ? t.panel2 : (t.inputBg || t.panel);
  const bc = state === 'focus' ? t.accent : state === 'error' ? t.danger : t.border;
  if (state === 'focus') s += rect(x - 3, y - 3, w + 6, h + 6, { r: 8, fill: t.accentSoft });
  s += rect(x, y, w, h, { r: 6, fill: bg, stroke: bc, sw: state === 'focus' || state === 'error' ? 1.5 : 1 });
  let tx = x + 10;
  if (icL) { s += icon(icL, x + 9, y + h / 2 - 9, 18, t.text3); tx = x + 34; }
  if (value != null) {
    const v = password ? '•'.repeat(value.length) : value;
    s += text(tx, y + h / 2 + 4.5, v, { size: 13, fill: state === 'disabled' ? t.text3 : t.text, weight: password ? 700 : 400 });
    if (state === 'focus') { const cx = tx + tw(v, 13, password ? 0.47 : 0.56) + 2; s += line(cx, y + 8, cx, y + h - 8, { stroke: t.accent, sw: 1.4 }); }
  } else if (placeholder) s += text(tx, y + h / 2 + 4.5, placeholder, { size: 13, fill: t.text3 });
  if (suffix) s += text(x + w - 10, y + h / 2 + 4.5, suffix, { size: 12, fill: t.text3, anchor: 'end' });
  if (icR) s += icon(icR, x + w - 27, y + h / 2 - 9, 18, t.text2);
  if (helper) s += text(x, y + h + 17, helper, { size: 12, fill: state === 'error' ? t.danger : t.text3 });
  return s;
}
const select = (t, x, y, w, o = {}) => input(t, x, y, w, { ...o, icR: 'chevdown' });

// ---------- Переключатели ----------
function checkbox(t, x, y, checked, label, state = 'default') {
  let s = '';
  if (state === 'focus') s += rect(x - 3, y - 3, 24, 24, { r: 6, stroke: t.focus, sw: 2 });
  const dis = state === 'disabled';
  s += rect(x, y, 18, 18, { r: 4, fill: checked ? (dis ? t.border : t.accent) : (dis ? t.panel2 : t.panel), stroke: checked ? 'none' : (state === 'hover' ? t.accent : t.text3), sw: 1.4 });
  if (checked) s += icon('check', x + 2, y + 2, 14, t.onAccent, 2.6);
  if (label) s += text(x + 28, y + 13.5, label, { size: 13, fill: dis ? t.text3 : t.text });
  return s;
}
function radio(t, x, y, on, label, state = 'default') {
  let s = `<circle cx="${x + 9}" cy="${y + 9}" r="8.5" fill="${t.panel}" stroke="${on ? t.accent : (state === 'hover' ? t.accent : t.text3)}" stroke-width="1.6"/>`;
  if (on) s += `<circle cx="${x + 9}" cy="${y + 9}" r="4.5" fill="${t.accent}"/>`;
  if (label) s += text(x + 28, y + 13.5, label, { size: 13, fill: t.text });
  return s;
}
function toggle(t, x, y, on, label, state = 'default') {
  const dis = state === 'disabled';
  let s = rect(x, y, 36, 20, { r: 10, fill: on ? (dis ? t.border : t.accent) : (state === 'hover' ? t.text3 : t.border) });
  s += `<circle cx="${on ? x + 26 : x + 10}" cy="${y + 10}" r="7.5" fill="${on ? t.onAccent : t.panel}"/>`;
  if (label) s += text(x + 48, y + 14.5, label, { size: 13, fill: dis ? t.text3 : t.text });
  return s;
}

function slider(t, x, y, w, v, o = {}) {
  const { label, valueText, state = 'default' } = o;
  let s = '';
  if (label) s += text(x, y - 9, label, { size: 12, fill: t.text2 });
  if (valueText) s += text(x + w, y - 9, valueText, { size: 12, fill: t.text, anchor: 'end', weight: 600 });
  const dis = state === 'disabled';
  s += rect(x, y - 2, w, 4, { r: 2, fill: t.border });
  s += rect(x, y - 2, w * v, 4, { r: 2, fill: dis ? t.text3 : t.accent });
  const kx = x + w * v;
  if (state === 'focus' || state === 'pressed') s += `<circle cx="${kx}" cy="${y}" r="12" fill="${t.accentSoft}"/>`;
  s += `<circle cx="${kx}" cy="${y}" r="7" fill="${t.panel}" stroke="${dis ? t.text3 : t.accent}" stroke-width="2.2"/>`;
  return s;
}

// Сегментированный переключатель (формат, пропорции)
function segmented(t, x, y, items, active, o = {}) {
  const { h = 32, iw } = o;
  const ws = items.map(it => iw || Math.max(44, tw(it, 13) + 24));
  const W = ws.reduce((a, b) => a + b, 0) + 4;
  let s = rect(x, y, W, h, { r: 7, fill: t.panel2, stroke: t.border });
  let cx = x + 2;
  items.forEach((it, i) => {
    if (i === active) s += rect(cx, y + 2, ws[i], h - 4, { r: 5, fill: t.accent });
    s += text(cx + ws[i] / 2, y + h / 2 + 4.5, it, { size: 13, anchor: 'middle', fill: i === active ? t.onAccent : t.text, weight: i === active ? 600 : 400 });
    cx += ws[i];
  });
  return s;
}

function tabs(t, x, y, w, items, active) {
  const iw = w / items.length;
  let s = line(x, y + 36, x + w, y + 36, { stroke: t.border, sw: 1 });
  items.forEach((it, i) => {
    s += text(x + iw * i + iw / 2, y + 23, it, { size: 13, anchor: 'middle', fill: i === active ? t.accent : t.text2, weight: 600 });
    if (i === active) s += rect(x + iw * i + 16, y + 34, iw - 32, 3, { r: 1.5, fill: t.accent });
  });
  return s;
}

// ---------- Слои, цвет ----------
function checker(x, y, w, h, c = 6) {
  let s = rect(x, y, w, h, { fill: '#FFFFFF' });
  for (let i = 0; i * c < w; i++) for (let j = 0; j * c < h; j++)
    if ((i + j) % 2) s += rect(x + i * c, y + j * c, Math.min(c, w - i * c), Math.min(c, h - j * c), { fill: '#D6D9DE' });
  return s;
}

function layerRow(t, x, y, w, o = {}) {
  const { name, visible = true, locked = false, active = false, thumb, sub, state } = o;
  let s = '';
  if (active) s += rect(x, y, w, 44, { fill: t.accentSoft }) + rect(x, y, 3, 44, { fill: t.accent });
  else if (state === 'hover') s += rect(x, y, w, 44, { fill: t.hover });
  s += icon(visible ? 'eye' : 'eyeoff', x + 12, y + 13, 18, visible ? t.text2 : t.text3);
  s += rect(x + 40, y + 8, 40, 28, { r: 3, fill: '#fff', stroke: t.border });
  if (thumb) s += `<svg x="${x + 41}" y="${y + 9}" width="38" height="26" viewBox="0 0 400 260" preserveAspectRatio="xMidYMid slice">${thumb}</svg>`;
  s += text(x + 92, y + (sub ? 19 : 26), name, { size: 13, fill: visible ? t.text : t.text3, weight: active ? 600 : 400 });
  if (sub) s += text(x + 92, y + 35, sub, { size: 11, fill: t.text3 });
  s += icon(locked ? 'lock' : 'unlock', x + w - 30, y + 13, 16, locked ? t.text2 : t.border);
  return s + line(x, y + 44, x + w, y + 44, { stroke: t.border, sw: 0.6 });
}

const HUES = ['#FF0000', '#FFFF00', '#00FF00', '#00FFFF', '#0000FF', '#FF00FF', '#FF0000'];
function colorPanel(t, x, y, w, o = {}) {
  const { hue = '#FF3B30', hex = 'E63946', recent = ['#E63946', '#F4A261', '#2A9D8F', '#264653', '#E9C46A', '#6B8FD6', '#FFFFFF', '#1F2329', '#7BC67B'] } = o;
  const g1 = id('sv'), g2 = id('dk'), g3 = id('hue');
  let s = `<defs><linearGradient id="${g1}"><stop offset="0" stop-color="#fff"/><stop offset="1" stop-color="${hue}"/></linearGradient>
    <linearGradient id="${g2}" x2="0" y2="1"><stop offset="0" stop-color="#000" stop-opacity="0"/><stop offset="1" stop-color="#000"/></linearGradient>
    <linearGradient id="${g3}">${HUES.map((c, i) => `<stop offset="${i / 6}" stop-color="${c}"/>`).join('')}</linearGradient></defs>`;
  const h = 132;
  s += rect(x, y, w, h, { r: 6, fill: `url(#${g1})` }) + rect(x, y, w, h, { r: 6, fill: `url(#${g2})` });
  s += `<circle cx="${x + w * 0.78}" cy="${y + h * 0.16}" r="7" fill="none" stroke="#fff" stroke-width="2.5"/><circle cx="${x + w * 0.78}" cy="${y + h * 0.16}" r="8.5" fill="none" stroke="#000" stroke-opacity=".35"/>`;
  s += rect(x, y + h + 12, w, 12, { r: 6, fill: `url(#${g3})` });
  s += `<circle cx="${x + 3}" cy="${y + h + 18}" r="8" fill="${hue}" stroke="#fff" stroke-width="2.5"/>`;
  // текущий цвет, HEX, непрозрачность
  const yy = y + h + 38;
  s += rect(x, yy, 32, 32, { r: 6, fill: '#' + hex, stroke: t.border });
  s += input(t, x + 40, yy, 112, { value: hex, icL: null, suffix: 'HEX' });
  s += input(t, x + 160, yy, w - 160, { value: '100 %', suffix: 'α' });
  // недавние цвета
  const sy = yy + 44;
  s += text(x, sy + 4, 'Недавние', { size: 11, fill: t.text3 });
  recent.forEach((c, i) => {
    s += rect(x + i * 27, sy + 12, 22, 22, { r: 5, fill: c, stroke: t.border, sw: 1 });
    if (i === 0) s += rect(x - 2, sy + 10, 26, 26, { r: 7, stroke: t.accent, sw: 2 });
  });
  return s;
}

// ---------- Всплывающие элементы ----------
function tooltip(t, x, y, label, kbd) {
  const inv = t.tooltipBg || t.text, fg = t.tooltipFg || t.panel;
  const w = tw(label, 12.5) + (kbd ? tw(kbd, 12) + 26 : 0) + 22;
  let s = `<path d="M${x},${y + 14} l-7,0 l7,-6 z" fill="${inv}"/>`;
  s += `<path d="M${x - 6},${y + 14} L${x},${y + 8} L${x},${y + 20} z" fill="${inv}"/>`;
  s += rect(x, y, w, 28, { r: 6, fill: inv });
  s += text(x + 11, y + 18.5, label, { size: 12.5, fill: fg, weight: 600 });
  if (kbd) { const kx = x + w - tw(kbd, 12) - 18; s += rect(kx, y + 5, tw(kbd, 12) + 10, 18, { r: 4, stroke: fg, sw: 1, opacity: 0.6 }) + text(kx + 5, y + 18, kbd, { size: 12, fill: fg }); }
  return s;
}

function toast(t, x, y, w, msg, action) {
  const inv = t.tooltipBg || t.text, fg = t.tooltipFg || t.panel;
  let s = rect(x + 2, y + 4, w, 48, { r: 10, fill: '#000', opacity: 0.12 }) + rect(x, y, w, 48, { r: 10, fill: inv });
  s += `<circle cx="${x + 26}" cy="${y + 24}" r="11" fill="${t.success}"/>` + icon('check', x + 18, y + 16, 16, '#fff', 2.6);
  s += text(x + 48, y + 29, msg, { size: 13, fill: fg });
  if (action) s += text(x + w - 16, y + 29, action, { size: 13, fill: t.focus, anchor: 'end', weight: 700 });
  return s;
}

function menu(t, x, y, w, items) {
  const h = items.reduce((a, it) => a + (it.sep ? 9 : 32), 8);
  let s = shadow(x, y, w, h) + rect(x, y, w, h, { r: 8, fill: t.panel, stroke: t.border });
  let cy = y + 4;
  for (const it of items) {
    if (it.sep) { s += line(x + 8, cy + 4.5, x + w - 8, cy + 4.5, { stroke: t.border, sw: 1 }); cy += 9; continue; }
    if (it.active) s += rect(x + 4, cy, w - 8, 32, { r: 5, fill: t.accentSoft });
    if (it.ic) s += icon(it.ic, x + 14, cy + 7, 18, it.active ? t.accent : t.text2);
    s += text(x + (it.ic ? 42 : 14), cy + 21, it.label, { size: 13, fill: it.disabled ? t.text3 : t.text });
    if (it.kbd) s += text(x + w - 14, cy + 21, it.kbd, { size: 12, fill: t.text3, anchor: 'end' });
    cy += 32;
  }
  return s;
}

// «Тень» без фильтров — чтобы PDF оставался полностью векторным
const shadow = (x, y, w, h, r = 12) =>
  [[10, 0.05], [6, 0.06], [3, 0.08]].map(([d, o]) => rect(x - d / 2, y + d / 2, w + d, h + d / 2, { r: r + d / 2, fill: '#101828', opacity: o })).join('');

function modal(t, x, y, w, h, title) {
  let s = shadow(x, y, w, h) + rect(x, y, w, h, { r: 12, fill: t.panel, stroke: t.border });
  s += text(x + 24, y + 38, title, { size: 18, weight: 700, fill: t.text });
  s += iconButton(t, x + w - 44, y + 14, 'close');
  return s;
}

const logo = (t, x, y, s = 28) =>
  rect(x, y, s, s, { r: s * 0.28, fill: t.accent }) + icon('brush', x + s * 0.18, y + s * 0.18, s * 0.64, t.onAccent, 2.2);

const avatar = (x, y, r, initials, bg = '#F4A261') =>
  `<circle cx="${x}" cy="${y}" r="${r}" fill="${bg}"/>` + text(x, y + r * 0.36, initials, { size: r * 0.9, anchor: 'middle', fill: '#fff', weight: 700 });

// ---------- Рисунок на холсте (400×260) ----------
function artwork(v = 0, o = {}) {
  const P = [
    { sky1: '#BFE3FF', sky2: '#FDE7C8', sun: '#FFB703', m1: '#8FA8E0', m2: '#4E6CB0', hill: '#7BC67B', hill2: '#5AA65A', roof: '#E76F51', wall: '#F4E1C1' },
    { sky1: '#FFD6E0', sky2: '#FFF1C9', sun: '#FF7B54', m1: '#C3A6E8', m2: '#7E5BB5', hill: '#9AD39A', hill2: '#6DB56D', roof: '#2A9D8F', wall: '#FFF6E5' },
    { sky1: '#1D2B53', sky2: '#7E2553', sun: '#FFEC27', m1: '#3E4F86', m2: '#283463', hill: '#3C7A55', hill2: '#2B5C3F', roof: '#FF004D', wall: '#C2C3C7' },
    { sky1: '#CDEFE8', sky2: '#F9F7E8', sun: '#F4A261', m1: '#9BC1BC', m2: '#5C8D89', hill: '#E9C46A', hill2: '#D4A848', roof: '#264653', wall: '#FFFFFF' },
  ][v % 4];
  const g = id('sky');
  let s = `<defs><linearGradient id="${g}" x2="0" y2="1"><stop offset="0" stop-color="${P.sky1}"/><stop offset="1" stop-color="${P.sky2}"/></linearGradient></defs>`;
  if (!o.noSky) s += `<rect width="400" height="260" fill="url(#${g})"/>`;
  s += `<circle cx="318" cy="62" r="30" fill="${P.sun}"/>`;
  s += `<path d="M0 170 L70 92 L120 140 L180 70 L260 160 L320 110 L400 170 V260 H0z" fill="${P.m1}"/>`;
  s += `<path d="M0 190 L90 130 L150 175 L230 120 L300 180 L400 150 V260 H0z" fill="${P.m2}"/>`;
  s += `<path d="M0 210 Q100 175 200 205 T400 200 V260 H0z" fill="${P.hill}"/>`;
  s += `<path d="M0 235 Q120 215 240 235 T400 232 V260 H0z" fill="${P.hill2}"/>`;
  // домик и дерево
  s += `<rect x="78" y="168" width="64" height="48" fill="${P.wall}"/><path d="M70 170 L110 136 L150 170z" fill="${P.roof}"/>`;
  s += `<rect x="102" y="190" width="16" height="26" fill="${P.roof}" opacity=".85"/><rect x="86" y="178" width="12" height="12" fill="#9AD0F5"/>`;
  s += `<rect x="176" y="186" width="7" height="30" fill="#7A5230"/><circle cx="179" cy="178" r="20" fill="${P.hill2}"/>`;
  // мазок кистью
  if (!o.noStroke) s += `<path d="M232 230 C250 214 268 236 288 222 S324 210 344 226" fill="none" stroke="#E63946" stroke-width="7" stroke-linecap="round"/>`;
  if (o.caption) s += text(170, 50, o.caption, { size: 24, anchor: 'middle', fill: '#264653', weight: 700, family: "'Segoe Print', 'Comic Sans MS', cursive" });
  return s;
}

module.exports = {
  tw, id, button, iconButton, toolButton, input, select, checkbox, radio, toggle, slider, segmented, tabs,
  checker, layerRow, colorPanel, tooltip, toast, menu, shadow, modal, logo, avatar, artwork,
};
