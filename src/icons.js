// Набор иконок «ByRo Paint»: сетка 24×24, линия 1.8 px, скруглённые концы.
// В интерфейсе выводятся размером 20×20 (панели) и 16×16 (списки).
const ICONS = {
  select: '<rect x="4" y="4" width="16" height="16" rx="1" stroke-dasharray="3 3"/>',
  move: '<path d="M12 3v18M3 12h18M12 3l-3 3M12 3l3 3M12 21l-3-3M12 21l3-3M3 12l3-3M3 12l3 3M21 12l-3-3M21 12l-3 3"/>',
  brush: '<path d="M18.5 3.5l2 2-9 9-2-2z"/><path d="M9.5 12.5c-2 0-3.5 1.5-3.5 3.5 0 1.5-1 2.5-2.5 3 3 1.5 7.5 1 8-2.5"/>',
  pencil: '<path d="M4 20l1-4L16 5l3 3L8 19z"/><path d="M14 7l3 3"/>',
  eraser: '<path d="M8 20h12"/><path d="M4.5 14.5l9-9a2 2 0 0 1 2.8 0l2.2 2.2a2 2 0 0 1 0 2.8L11 18H8z"/><path d="M9 10l5 5"/>',
  fill: '<path d="M5 11l7-7 7 7-7 7z"/><path d="M5 11h14"/><path d="M20 15.5c0 1.4-1 2.3-1 3.2a1 1 0 0 0 2 0c0-.9-1-1.8-1-3.2z" fill="currentColor"/>',
  picker: '<path d="M17 3l4 4-3 3-4-4z"/><path d="M14.5 8.5L5 18v2h2l9.5-9.5"/><path d="M13 5l6 6"/>',
  text: '<path d="M5 6.5V4h14v2.5M12 4v16M9 20h6"/>',
  rect: '<rect x="4" y="6" width="16" height="12" rx="1.5"/>',
  ellipse: '<ellipse cx="12" cy="12" rx="8.5" ry="6.5"/>',
  line: '<path d="M5.5 18.5l13-13"/><circle cx="5" cy="19" r="1.7" fill="currentColor"/><circle cx="19" cy="5" r="1.7" fill="currentColor"/>',
  crop: '<path d="M6 2v16h16"/><path d="M2 6h16v16"/>',
  hand: '<path d="M8 13V5.5a1.5 1.5 0 0 1 3 0V11M11 10V4.5a1.5 1.5 0 0 1 3 0V11M14 10.5V6a1.5 1.5 0 0 1 3 0v8a7 7 0 0 1-7 7h-.5a6 6 0 0 1-4.6-2.2L3 15.5a1.6 1.6 0 0 1 2.4-2L8 16"/>',
  zoom: '<circle cx="10.5" cy="10.5" r="6.5"/><path d="M20 20l-4.8-4.8M8 10.5h5M10.5 8v5"/>',
  undo: '<path d="M9 14L4 9l5-5"/><path d="M4 9h10.5a5.5 5.5 0 0 1 0 11H11"/>',
  redo: '<path d="M15 14l5-5-5-5"/><path d="M20 9H9.5a5.5 5.5 0 0 0 0 11H13"/>',
  eye: '<path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7S2 12 2 12z"/><circle cx="12" cy="12" r="3"/>',
  eyeoff: '<path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7S2 12 2 12z"/><circle cx="12" cy="12" r="3"/><path d="M3 3l18 18"/>',
  lock: '<rect x="5" y="11" width="14" height="10" rx="2"/><path d="M8 11V7a4 4 0 0 1 8 0v4"/>',
  unlock: '<rect x="5" y="11" width="14" height="10" rx="2"/><path d="M8 11V7a4 4 0 0 1 7.5-2"/>',
  plus: '<path d="M12 5v14M5 12h14"/>',
  minus: '<path d="M5 12h14"/>',
  trash: '<path d="M4 7h16M10 11v6M14 11v6M6 7l1 13h10l1-13M9 7V4h6v3"/>',
  copy: '<rect x="8" y="8" width="12" height="12" rx="2"/><path d="M16 8V5a1 1 0 0 0-1-1H5a1 1 0 0 0-1 1v10a1 1 0 0 0 1 1h3"/>',
  layers: '<path d="M12 3l9 5-9 5-9-5z"/><path d="M3 13l9 5 9-5"/>',
  settings: '<path d="M4 6h10M18 6h2M4 12h4M12 12h8M4 18h12"/><circle cx="16" cy="6" r="2"/><circle cx="10" cy="12" r="2"/><circle cx="18" cy="18" r="2"/>',
  export: '<path d="M12 15V3M7 8l5-5 5 5"/><path d="M4 14v5a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-5"/>',
  save: '<path d="M5 3h11l4 4v13a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1z"/><path d="M8 3v5h7V3M7 21v-7h10v7"/>',
  folder: '<path d="M3 6.5A1.5 1.5 0 0 1 4.5 5H9l2 2.5h8.5A1.5 1.5 0 0 1 21 9v9.5a1.5 1.5 0 0 1-1.5 1.5h-15A1.5 1.5 0 0 1 3 18.5z"/>',
  filenew: '<path d="M14 3H6.5A1.5 1.5 0 0 0 5 4.5v15A1.5 1.5 0 0 0 6.5 21h11a1.5 1.5 0 0 0 1.5-1.5V8z"/><path d="M14 3v5h5M12 11v6M9 14h6"/>',
  image: '<rect x="3" y="4" width="18" height="16" rx="2"/><circle cx="9" cy="9.5" r="1.8"/><path d="M21 16l-5-5-9 9"/>',
  clipboard: '<rect x="6" y="4" width="12" height="17" rx="2"/><path d="M9 4V3h6v1M9 10h6M9 14h6"/>',
  template: '<rect x="3" y="3" width="18" height="18" rx="2"/><path d="M3 9h18M9 9v12"/>',
  cloud: '<path d="M7 18a4.5 4.5 0 0 1-.6-9A6 6 0 0 1 18 9.5a4 4 0 0 1-.5 8.5z"/>',
  home: '<path d="M3 11l9-7 9 7"/><path d="M5 9.5V20h5v-6h4v6h5V9.5"/>',
  clock: '<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>',
  history: '<path d="M3 12a9 9 0 1 0 3-6.7L3 8"/><path d="M3 3v5h5"/><path d="M12 7v5l3 2"/>',
  user: '<circle cx="12" cy="8" r="4"/><path d="M4 21a8 8 0 0 1 16 0"/>',
  mail: '<rect x="3" y="5" width="18" height="14" rx="2"/><path d="M3 7l9 6 9-6"/>',
  search: '<circle cx="11" cy="11" r="7"/><path d="M20 20l-4-4"/>',
  chevdown: '<path d="M6 9l6 6 6-6"/>',
  chevright: '<path d="M9 6l6 6-6 6"/>',
  close: '<path d="M6 6l12 12M18 6L6 18"/>',
  check: '<path d="M5 12.5l4.5 4.5L19 7.5"/>',
  sun: '<circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4"/>',
  moon: '<path d="M20 14.5A8 8 0 1 1 9.5 4a6.5 6.5 0 0 0 10.5 10.5z"/>',
  contrast: '<circle cx="12" cy="12" r="9"/><path d="M12 3a9 9 0 0 1 0 18z" fill="currentColor"/>',
  palette: '<path d="M12 3a9 9 0 0 0 0 18c1.2 0 2-.8 2-1.8 0-.5-.2-.9-.5-1.2-.3-.3-.5-.7-.5-1.2 0-1 .8-1.8 1.8-1.8H17a4 4 0 0 0 4-4C21 6.5 17 3 12 3z"/><circle cx="7.5" cy="11" r="1.2" fill="currentColor"/><circle cx="10" cy="7" r="1.2" fill="currentColor"/><circle cx="15" cy="7" r="1.2" fill="currentColor"/>',
  swap: '<path d="M16 3l4 4-4 4M20 7H9M8 21l-4-4 4-4M4 17h11"/>',
  grid: '<rect x="4" y="4" width="16" height="16" rx="1"/><path d="M4 9.3h16M4 14.6h16M9.3 4v16M14.6 4v16"/>',
  more: '<circle cx="5" cy="12" r="1.3" fill="currentColor"/><circle cx="12" cy="12" r="1.3" fill="currentColor"/><circle cx="19" cy="12" r="1.3" fill="currentColor"/>',
  keyboard: '<rect x="2" y="6" width="20" height="12" rx="2"/><path d="M6 10h.01M10 10h.01M14 10h.01M18 10h.01M7 14h10"/>',
  globe: '<circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3a14 14 0 0 1 0 18M12 3a14 14 0 0 0 0 18"/>',
  info: '<circle cx="12" cy="12" r="9"/><path d="M12 11v6M12 7.5h.01"/>',
  alert: '<path d="M12 3l10 18H2z"/><path d="M12 10v5M12 18h.01"/>',
  bold: '<path d="M7 4h6a4 4 0 0 1 0 8H7zM7 12h7a4 4 0 0 1 0 8H7z"/>',
  italic: '<path d="M10 4h8M6 20h8M14 4l-4 16"/>',
  alignleft: '<path d="M4 6h16M4 10h10M4 14h16M4 18h10"/>',
  aligncenter: '<path d="M4 6h16M7 10h10M4 14h16M7 18h10"/>',
  link: '<path d="M10 14a4 4 0 0 0 6 .5l3-3a4 4 0 0 0-5.7-5.7L12 7"/><path d="M14 10a4 4 0 0 0-6-.5l-3 3a4 4 0 0 0 5.7 5.7L12 17"/>',
  logout: '<path d="M15 4h3a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2h-3M10 17l5-5-5-5M15 12H4"/>',
};

const ICON_NAMES = {
  select: 'Выделение (M)', move: 'Перемещение (V)', brush: 'Кисть (B)', pencil: 'Карандаш (P)', eraser: 'Ластик (E)',
  fill: 'Заливка (G)', picker: 'Пипетка (I)', text: 'Текст (T)', rect: 'Прямоугольник (U)', ellipse: 'Эллипс (Shift+U)',
  line: 'Линия (L)', crop: 'Кадрирование (C)', hand: 'Рука (H / Пробел)', zoom: 'Масштаб (Z)',
};

// Иконка в точке (x, y) размером size; цвет через currentColor
function icon(name, x, y, size = 20, color = 'currentColor', sw = 1.8) {
  const s = size / 24;
  return `<g transform="translate(${x},${y}) scale(${s})" color="${color}" fill="none" stroke="currentColor"` +
    ` stroke-width="${sw}" stroke-linecap="round" stroke-linejoin="round">${ICONS[name]}</g>`;
}

module.exports = { ICONS, ICON_NAMES, icon };
