// Стилистика и материалы для разработчиков: moodboard, цветовая схема, UI-киты трёх тем,
// лист иконок, спецификация размеров главного экрана.
const { text, rect, line, svgWrap } = require('./common');
const { ICONS, ICON_NAMES, icon } = require('./icons');
const { themes, typography, spacing, radius } = require('./tokens');
const U = require('./ui');

// ---------- Контраст (WCAG) ----------
const lum = hex => {
  const c = hex.replace('#', '').match(/../g).map(h => parseInt(h, 16) / 255).map(v => v <= 0.03928 ? v / 12.92 : ((v + 0.055) / 1.055) ** 2.4);
  return 0.2126 * c[0] + 0.7152 * c[1] + 0.0722 * c[2];
};
const contrast = (a, b) => { const [x, y] = [lum(a), lum(b)].sort((p, q) => q - p); return (x + 0.05) / (y + 0.05); };

// ---------- Moodboard ----------
function moodboard() {
  const t = themes.light, d = themes.dark;
  let s = rect(0, 0, 1400, 820, { fill: '#F6F7F9' });
  s += text(40, 56, 'Moodboard «ByRo Paint»', { size: 28, weight: 700 });
  s += text(40, 86, 'Ключевые слова: спокойный · нейтральный · дружелюбный · «инструмент, а не витрина» · плоский минимализм', { size: 15, fill: '#5C6370' });
  // 1. рисунки пользователя — главное на экране
  [0, 1, 2, 3].forEach(i => s += `<svg x="${40 + (i % 2) * 230}" y="${110 + Math.floor(i / 2) * 150}" width="220" height="140" viewBox="0 0 400 260" preserveAspectRatio="xMidYMid slice">${U.artwork(i)}</svg>`);
  s += text(40, 422, 'Яркие только рисунки пользователя —\nинтерфейс вокруг них нейтральный', { size: 14, fill: '#5C6370' });
  // 2. светлый и тёмный фрагменты интерфейса
  s += rect(520, 110, 420, 290, { r: 12, fill: t.panel, stroke: t.border });
  s += U.button(t, 544, 134, 150, 'Экспорт', { ic: 'export' }) + U.button(t, 706, 134, 120, 'Отмена', { kind: 'secondary' });
  s += U.slider(t, 544, 214, 260, 0.4, { label: 'Размер кисти', valueText: '24 px' });
  s += U.layerRow(t, 520, 244, 420, { name: 'Дом и дерево', active: true, thumb: U.artwork(0) });
  s += U.layerRow(t, 520, 288, 420, { name: 'Горы', thumb: U.artwork(0) });
  s += U.toggle(t, 544, 352, true, 'Сглаживание') + U.checkbox(t, 720, 353, true, 'Нажим пера');
  s += rect(960, 110, 400, 290, { r: 12, fill: d.panel, stroke: d.border });
  [['select', 0], ['brush', 1], ['eraser', 0], ['text', 0], ['crop', 0]].forEach(([n, a], i) => s += U.toolButton(d, 984 + i * 44, 134, n, a ? 'active' : 'default'));
  s += `<g transform="translate(984,186) scale(0.8)">${U.colorPanel(d, 0, 0, 440, { hue: '#00B4D8', hex: '2A9D8F' })}</g>`;
  // 3. типографика
  s += rect(40, 460, 420, 320, { r: 12, fill: '#fff', stroke: '#DADDE3' });
  s += text(64, 560, 'Аа', { size: 96, weight: 700 }) + text(220, 520, 'Segoe UI', { size: 26, weight: 700 });
  s += text(220, 548, 'системный шрифт Windows', { size: 14, fill: '#5C6370' });
  s += text(64, 620, 'Кисть · Слои · Экспорт · 1500 × 1050 px', { size: 16 });
  s += text(64, 650, 'АБВГДЕЁЖЗИЙКЛМНОПРСТУФХЦЧШЩЪЫЬЭЮЯ', { size: 14, fill: '#5C6370' });
  s += text(64, 674, 'абвгдеёжзийклмнопрстуфхцчшщъыьэюя 0123456789', { size: 14, fill: '#5C6370' });
  s += text(64, 720, 'Regular 400 · Semibold 600 · Bold 700', { size: 14 });
  s += text(64, 748, '11 · 12 · 13 · 14 · 16 · 20 · 28 px', { size: 14, fill: '#5C6370' });
  // 4. иконки
  s += rect(480, 460, 460, 320, { r: 12, fill: '#fff', stroke: '#DADDE3' });
  s += text(504, 494, 'Линейные иконки 24 → 20 px, линия 1.8', { size: 15, weight: 600 });
  Object.keys(ICONS).slice(0, 40).forEach((n, i) => s += icon(n, 504 + (i % 10) * 43, 516 + Math.floor(i / 10) * 60, 24, '#1F2329'));
  // 5. цвета
  s += rect(960, 460, 400, 320, { r: 12, fill: '#fff', stroke: '#DADDE3' });
  s += text(984, 494, 'Цвета', { size: 15, weight: 600 });
  [['#4F46E5', 'Индиго — акцент'], ['#1F2329', 'Графит — текст'], ['#F4F5F7', 'Светло-серый — фон'], ['#16181D', 'Тёмный — фон тёмной темы'], ['#EA580C', 'Оранжевый — внимание'], ['#16A34A', 'Зелёный — успех']]
    .forEach(([c, n], i) => { const x = 984 + (i % 2) * 190, y = 512 + Math.floor(i / 2) * 84; s += rect(x, y, 56, 56, { r: 10, fill: c, stroke: '#DADDE3' }) + text(x + 66, y + 24, n.split(' — ')[0], { size: 13, weight: 600 }) + text(x + 66, y + 44, n.split(' — ')[1] + ' ' + c, { size: 11.5, fill: '#5C6370' }); });
  return svgWrap(1400, 820, s);
}

// ---------- Цветовая схема ----------
function palette() {
  let s = rect(0, 0, 1400, 640, { fill: '#fff' });
  // цветовой круг: 12 секторов, отмечены выбранные цвета
  const cx = 265, cy = 320, R = 180, r0 = 86;
  const wheel = ['#FF0000', '#FF8000', '#FFFF00', '#80FF00', '#00FF00', '#00FF80', '#00FFFF', '#0080FF', '#0000FF', '#8000FF', '#FF00FF', '#FF0080'];
  wheel.forEach((c, i) => {
    const a1 = (i * 30 - 105) * Math.PI / 180, a2 = ((i + 1) * 30 - 105) * Math.PI / 180;
    const p = (a, rr) => `${cx + rr * Math.cos(a)},${cy + rr * Math.sin(a)}`;
    s += `<path d="M${p(a1, r0)} L${p(a1, R)} A${R},${R} 0 0 1 ${p(a2, R)} L${p(a2, r0)} A${r0},${r0} 0 0 0 ${p(a1, r0)}z" fill="${c}" opacity=".35" stroke="#fff" stroke-width="2"/>`;
  });
  const mark = (deg, c, lbl) => { const a = (deg - 90) * Math.PI / 180; const x = cx + 140 * Math.cos(a), y = cy + 140 * Math.sin(a);
    return `<circle cx="${x}" cy="${y}" r="20" fill="${c}" stroke="#fff" stroke-width="4"/>` + text(cx + 212 * Math.cos(a), cy + 212 * Math.sin(a) + 5, lbl, { size: 13, anchor: 'middle', weight: 600 }); };
  s += line(cx + 140 * Math.cos((244 - 90) * Math.PI / 180), cy + 140 * Math.sin((244 - 90) * Math.PI / 180), cx + 140 * Math.cos((24 - 90) * Math.PI / 180), cy + 140 * Math.sin((24 - 90) * Math.PI / 180), { stroke: '#1F2329', sw: 1.5, dash: '5 4' });
  s += mark(244, '#4F46E5', 'акцент') + mark(24, '#EA580C', 'внимание');
  s += `<circle cx="${cx}" cy="${cy}" r="${r0 - 6}" fill="#F4F5F7"/>` + text(cx, cy - 4, 'нейтральная\nоснова', { size: 13, anchor: 'middle', fill: '#5C6370', middle: true });
  s += text(cx, 40, 'Схема: контрастная пара (комплементарные цвета)', { size: 15, weight: 700, anchor: 'middle' });
  s += text(cx, 600, 'индиго ↔ оранжевый на круге — напротив друг друга', { size: 12.5, anchor: 'middle', fill: '#5C6370' });
  // шкала нейтральных и семантические цвета для двух тем
  const rows = [
    ['Светлая тема', themes.light], ['Тёмная тема', themes.dark], ['Контрастная', themes.contrast]];
  const keys = [['appBg', 'фон'], ['panel', 'панель'], ['border', 'граница'], ['text', 'текст'], ['text2', 'текст 2'], ['accent', 'акцент'], ['accentSoft', 'выбор'], ['work', 'раб. обл.'], ['danger', 'ошибка'], ['success', 'успех'], ['warning', 'внимание']];
  s += text(520, 40, 'Цвета тем (токены)', { size: 15, weight: 700 });
  rows.forEach(([n, t], ri) => {
    const y = 64 + ri * 128;
    s += text(520, y + 14, n, { size: 13, weight: 700 });
    keys.forEach(([k, lbl], i) => {
      const x = 520 + i * 78;
      s += rect(x, y + 24, 70, 48, { r: 8, fill: t[k], stroke: '#C9CED6' });
      s += text(x + 35, y + 88, lbl, { size: 11, anchor: 'middle' }) + text(x + 35, y + 103, t[k], { size: 10, anchor: 'middle', fill: '#5C6370' });
    });
  });
  // контрастность
  const y0 = 470;
  s += text(520, y0, 'Проверка контраста текста (WCAG 2.1, норма AA ≥ 4,5:1)', { size: 15, weight: 700 });
  const pairs = [['Текст / панель (светлая)', themes.light.text, themes.light.panel], ['Текст 2 / панель (светлая)', themes.light.text2, themes.light.panel],
    ['Кнопка: белый / акцент', themes.light.onAccent, themes.light.accent], ['Текст / панель (тёмная)', themes.dark.text, themes.dark.panel],
    ['Текст 2 / панель (тёмная)', themes.dark.text2, themes.dark.panel], ['Текст / фон (контрастная)', themes.contrast.text, themes.contrast.panel]];
  pairs.forEach(([n, f, b], i) => {
    const x = 520 + (i % 3) * 290, y = y0 + 20 + Math.floor(i / 3) * 62;
    const c = contrast(f, b);
    s += rect(x, y, 54, 46, { r: 8, fill: b, stroke: '#C9CED6' }) + text(x + 27, y + 30, 'Аа', { size: 18, anchor: 'middle', fill: f, weight: 700 });
    s += text(x + 64, y + 18, n, { size: 12 }) + text(x + 64, y + 38, c.toFixed(1).replace('.', ',') + ' : 1  ' + (c >= 7 ? 'AAA' : c >= 4.5 ? 'AA' : '—'), { size: 13, weight: 700, fill: c >= 4.5 ? '#16A34A' : '#DC2626' });
  });
  return svgWrap(1400, 640, s);
}

// ---------- UI-кит одной темы ----------
function uikit(key) {
  const t = themes[key];
  let s = rect(0, 0, 1400, 900, { fill: t.appBg });
  s += text(40, 52, `UI-кит «ByRo Paint» — ${t.name.toLowerCase()} тема`, { size: 26, weight: 700, fill: t.text });
  s += text(40, 80, 'Компоненты и их состояния. Шрифт Segoe UI, сетка 8 px, радиус 6 px, иконки 20 px.', { size: 14, fill: t.text2 });
  const card = (x, y, w, h, title) => rect(x, y, w, h, { r: 12, fill: t.panel, stroke: t.border }) + text(x + 20, y + 30, title, { size: 14, weight: 700, fill: t.text });
  const cap = (x, y, s2) => text(x, y, s2, { size: 11, fill: t.text3 });

  // Кнопки
  s += card(40, 100, 860, 250, 'Кнопки');
  const st = ['default', 'hover', 'pressed', 'focus', 'disabled'], stR = ['обычная', 'наведение', 'нажата', 'фокус', 'недоступна'];
  st.forEach((x, i) => s += cap(180 + i * 140, 140, stR[i]));
  [['primary', 'Основная', 'Создать'], ['secondary', 'Вторичная', 'Отмена'], ['ghost', 'Текстовая', 'Подробнее'], ['danger', 'Опасная', 'Удалить']].forEach(([k, n, l], j) => {
    const y = 156 + j * 46;
    s += text(60, y + 21, n, { size: 12, fill: t.text2 });
    st.forEach((x, i) => s += U.button(t, 180 + i * 140, y, 120, l, { kind: k, state: x, ic: k === 'danger' ? 'trash' : null }));
  });

  // Иконки-кнопки и инструменты
  s += card(920, 100, 440, 250, 'Инструменты и иконки-кнопки');
  ['default', 'hover', 'active', 'focus', 'disabled'].forEach((x, i) => {
    s += U.iconButton(t, 950 + i * 80, 150, 'brush', { size: 36, state: x, color: x === 'active' ? t.accent : x === 'disabled' ? t.text3 : t.text }) + cap(944 + i * 80, 204, ['обычная', 'наведение', 'выбрана', 'фокус', 'недоступна'][i]);
  });
  s += U.tooltip(t, 960, 236, 'Кисть', 'B') + cap(944, 290, 'подсказка (появляется через 500 мс)');
  s += U.toast(t, 944, 296, 392, 'Файл сохранён: Открытка.png', 'Открыть папку').replace(/y="296"/, 'y="296"');

  // Поля ввода
  s += card(40, 370, 560, 250, 'Поля ввода');
  s += U.input(t, 60, 430, 250, { label: 'Обычное', placeholder: 'Введите имя' });
  s += U.input(t, 330, 430, 250, { label: 'Фокус', value: 'Открытка', state: 'focus' });
  s += U.input(t, 60, 510, 250, { label: 'Ошибка', value: '20000', state: 'error', suffix: 'px', helper: 'Не больше 16 000 px' });
  s += U.input(t, 330, 510, 250, { label: 'Недоступно', value: '72 DPI', state: 'disabled' });
  s += U.select(t, 60, 580, 250, { value: 'Обычный' }) + U.input(t, 330, 580, 250, { icL: 'search', placeholder: 'Поиск' });

  // Переключатели
  s += card(620, 370, 280, 250, 'Флажки и переключатели');
  s += U.checkbox(t, 640, 414, true, 'Отмечен') + U.checkbox(t, 640, 444, false, 'Не отмечен') + U.checkbox(t, 640, 474, false, 'Наведение', 'hover') + U.checkbox(t, 640, 504, true, 'Недоступен', 'disabled');
  s += U.radio(t, 780, 414, true, 'Выбран') + U.radio(t, 780, 444, false, 'Нет');
  s += U.toggle(t, 640, 546, true, 'Вкл') + U.toggle(t, 760, 546, false, 'Выкл') + U.toggle(t, 640, 582, true, 'Недоступен', 'disabled');

  // Слайдеры, сегменты, вкладки
  s += card(920, 370, 440, 250, 'Слайдеры, сегменты, вкладки');
  s += U.slider(t, 944, 432, 180, 0.24, { label: 'Размер', valueText: '24 px' }) + U.slider(t, 1156, 432, 180, 0.6, { label: 'Нажат', valueText: '60 %', state: 'pressed' });
  s += U.slider(t, 944, 486, 180, 0.9, { label: 'Недоступен', valueText: '90 %', state: 'disabled' });
  s += U.segmented(t, 944, 510, ['PNG', 'JPG', 'SVG', 'PDF'], 0, { iw: 60 });
  s += U.tabs(t, 944, 560, 392, ['Слои', 'История'], 0);

  // Слои
  s += card(40, 640, 420, 240, 'Строка слоя');
  s += U.layerRow(t, 40, 676, 420, { name: 'Обычная', thumb: U.artwork(0) });
  s += U.layerRow(t, 40, 720, 420, { name: 'Наведение', thumb: U.artwork(1), state: 'hover' });
  s += U.layerRow(t, 40, 764, 420, { name: 'Выбрана', active: true, thumb: U.artwork(3) });
  s += U.layerRow(t, 40, 808, 420, { name: 'Скрыта, заблокирована', visible: false, locked: true, thumb: U.artwork(2) });

  // Меню
  s += card(480, 640, 420, 240, 'Выпадающее меню');
  s += U.menu(t, 500, 676, 300, [{ label: 'Новый…', kbd: 'Ctrl+N', ic: 'filenew' }, { label: 'Открыть…', kbd: 'Ctrl+O', ic: 'folder', active: true },
    { label: 'Сохранить', kbd: 'Ctrl+S', ic: 'save' }, { sep: 1 }, { label: 'Экспорт…', kbd: 'Ctrl+Shift+E', ic: 'export' }, { label: 'Печать', disabled: 1, ic: 'image' }]);

  // Цвет
  s += card(920, 640, 440, 240, 'Палитра');
  s += `<g transform="translate(944,676) scale(0.78)">${U.colorPanel(t, 0, 0, 300)}</g>`;
  s += text(1200, 700, 'Значок цвета', { size: 12, fill: t.text2 });
  ['#E63946', '#2A9D8F', '#E9C46A'].forEach((c, i) => s += rect(1200 + i * 34, 712, 26, 26, { r: 6, fill: c, stroke: t.border }));
  s += rect(1198, 710, 30, 30, { r: 8, stroke: t.accent, sw: 2 });
  s += text(1200, 770, 'выбранный — рамка\nакцентного цвета', { size: 11, fill: t.text3 });
  return svgWrap(1400, 900, s);
}

// ---------- Лист иконок ----------
function iconsheet() {
  const names = Object.keys(ICONS);
  const cols = 10, cw = 136, ch = 92;
  const rows = Math.ceil(names.length / cols);
  let s = rect(0, 0, cols * cw + 40, rows * ch + 90, { fill: '#fff' });
  s += text(20, 36, `Набор иконок: ${names.length} шт. · сетка 24×24 · линия 1.8 px · скругление концов · цвет currentColor`, { size: 16, weight: 700 });
  names.forEach((n, i) => {
    const x = 20 + (i % cols) * cw, y = 60 + Math.floor(i / cols) * ch;
    s += rect(x + 4, y, cw - 8, ch - 10, { r: 8, fill: '#F6F7F9', stroke: '#E3E5EA' });
    s += rect(x + cw / 2 - 16, y + 10, 32, 32, { stroke: '#F0B4CC', sw: 0.5, dash: '2 2' });
    s += icon(n, x + cw / 2 - 16, y + 10, 32, '#1F2329');
    s += text(x + cw / 2, y + 62, 'ic-' + n, { size: 11.5, anchor: 'middle', fill: '#5C6370', family: 'Consolas, monospace' });
    if (ICON_NAMES[n]) s += text(x + cw / 2, y + 76, ICON_NAMES[n].replace(/ \(.*/, ''), { size: 10, anchor: 'middle', fill: '#8A919E' });
  });
  return svgWrap(cols * cw + 40, rows * ch + 90, s);
}

// ---------- Спецификация размеров главного экрана ----------
function spec() {
  const t = themes.light, M = '#E5007E';
  const { editorParts } = require('./screens'); // подключается здесь, чтобы кит собирался без экранов
  let s = `<g opacity=".55">${editorParts.editor(t, { tool: 'brush' })}</g>`;
  const dimV = (x, y1, y2, lbl, side = 1) => line(x, y1, x, y2, { stroke: M, sw: 1.4 }) + line(x - 5, y1, x + 5, y1, { stroke: M, sw: 1.4 }) + line(x - 5, y2, x + 5, y2, { stroke: M, sw: 1.4 }) +
    rect(x + (side > 0 ? 6 : -6 - lbl.length * 7.4 - 8), (y1 + y2) / 2 - 10, lbl.length * 7.4 + 8, 20, { r: 4, fill: M }) + text(x + (side > 0 ? 10 : -10 - lbl.length * 7.4), (y1 + y2) / 2 + 4.5, lbl, { size: 12, fill: '#fff', weight: 700 });
  const dimH = (y, x1, x2, lbl) => line(x1, y, x2, y, { stroke: M, sw: 1.4 }) + line(x1, y - 5, x1, y + 5, { stroke: M, sw: 1.4 }) + line(x2, y - 5, x2, y + 5, { stroke: M, sw: 1.4 }) +
    rect((x1 + x2) / 2 - lbl.length * 3.7 - 4, y - 22, lbl.length * 7.4 + 8, 20, { r: 4, fill: M }) + text((x1 + x2) / 2, y - 7.5, lbl, { size: 12, fill: '#fff', weight: 700, anchor: 'middle' });
  const box = (x, y, w, h) => rect(x, y, w, h, { stroke: M, sw: 1.2, dash: '4 3' });
  s += box(0, 0, 1280, 40) + dimV(470, 0, 40, '40');
  s += box(0, 40, 1280, 44) + dimV(470, 40, 84, '44');
  s += box(0, 84, 52, 690) + dimH(760, 0, 52, '52');
  s += box(8, 180, 36, 36) + dimV(48, 180, 216, '36') + dimV(48, 216, 220, '4', 1);
  s += box(1000, 84, 280, 690) + dimH(320, 1000, 1280, '280');
  s += dimH(122, 1000, 1016, '16') + dimH(122, 1264, 1280, '16');
  s += box(1000, 462, 280, 44) + dimV(990, 462, 506, '44', -1);
  s += box(1000, 376, 280, 37) + dimV(990, 376, 413, '36', -1);
  s += box(0, 774, 1280, 26) + dimV(600, 774, 800, '26');
  s += box(1112, 5, 156, 30) + dimV(1104, 5, 35, '30', -1);
  s += box(96, 46, 160, 32) + dimH(100, 96, 256, '160 × 32');
  s += dimH(700, 52, 1000, 'рабочая область: тянется, холст по центру');
  // легенда
  s += rect(520, 300, 400, 130, { r: 10, fill: '#fff', stroke: M });
  s += text(540, 330, 'Размеры в px при масштабе 100 %', { size: 14, weight: 700, fill: M });
  s += text(540, 356, 'Сетка 8 px (мелкие отступы — 4 px)\nКнопка/поле — высота 32, большая — 40\nИконка 20×20 в зоне 32 или 36\nРадиус: 4 / 6 / 10 / 16', { size: 13 });
  return svgWrap(1280, 800, s);
}

module.exports = {
  moodboard, palette, iconsheet, spec,
  'uikit-light': () => uikit('light'), 'uikit-dark': () => uikit('dark'), 'uikit-contrast': () => uikit('contrast'),
};
