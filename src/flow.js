// User Flow — блок-схема пути пользователя
const { text, rect, line, poly, svgWrap } = require('./common');

const INK = '#1F2329';
const ACC = '#4F46E5';
const GREY = '#8A919E';
const RW = 176, RH = 58, DW = 84, DH = 50;

function flowNode(n) {
  const { t, x, y, s, main } = n;
  const c = main ? ACC : INK;
  if (t === 'start') return `<circle cx="${x}" cy="${y}" r="30" fill="#fff" stroke="${c}" stroke-width="2.4"/>` +
    text(x, y + 5, s, { anchor: 'middle', size: 13, weight: 700 });
  if (t === 'end') return `<circle cx="${x}" cy="${y}" r="30" fill="${c}"/><circle cx="${x}" cy="${y}" r="35" fill="none" stroke="${c}" stroke-width="2"/>` +
    text(x, y + 5, s, { anchor: 'middle', size: 13, weight: 700, fill: '#fff' });
  if (t === 'dec') return `<path d="M${x},${y - DH} L${x + DW},${y} L${x},${y + DH} L${x - DW},${y} z" fill="#fff" stroke="${c}" stroke-width="2"/>` +
    text(x, y - 3, s, { anchor: 'middle', size: 12.5, middle: true });
  // экран / окно
  return rect(x - RW / 2, y - RH / 2, RW, RH, { r: 8, fill: main ? ACC : '#3A3F47' }) +
    text(x, y + 4, s, { anchor: 'middle', size: 13, fill: '#fff', weight: 600, middle: true });
}

// Стрелка по точкам; подпись ставится у сегмента li (по умолчанию первого)
function flowArrow(pts, label, o = {}) {
  const c = o.main ? ACC : GREY;
  let r = poly(pts, { stroke: c, sw: o.main ? 2.4 : 1.6, marker: o.main ? 'arrA' : 'arrG', dash: o.dash });
  if (label) {
    const i = o.li || 0, [x1, y1] = pts[i], [x2, y2] = pts[i + 1];
    const lx = (x1 + x2) / 2 + (o.dx || 0), ly = (y1 + y2) / 2 + (o.dy == null ? -8 : o.dy);
    r += text(lx, ly, label, { anchor: o.anchor || 'middle', size: 12, fill: o.main ? ACC : '#5C6370', weight: o.main ? 600 : 400, middle: true });
  }
  return r;
}

const arrowDefs = `<defs>
  <marker id="arrA" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse"><path d="M0,0 L10,5 L0,10 z" fill="${ACC}"/></marker>
  <marker id="arrG" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="8" markerHeight="8" orient="auto-start-reverse"><path d="M0,0 L10,5 L0,10 z" fill="${GREY}"/></marker></defs>`;

function legend(y, w) {
  let b = rect(30, y - 30, w - 60, 62, { r: 8, fill: '#F6F7F9', stroke: '#DADDE3' });
  b += text(50, y + 5, 'Легенда:', { size: 13, weight: 700 });
  b += `<circle cx="150" cy="${y}" r="14" fill="#fff" stroke="${INK}" stroke-width="2"/>` + text(172, y + 5, 'точка входа', { size: 12.5 });
  b += `<circle cx="290" cy="${y}" r="14" fill="${INK}"/>` + text(312, y + 5, 'цель (конец)', { size: 12.5 });
  b += rect(420, y - 14, 46, 28, { r: 5, fill: '#3A3F47' }) + text(476, y + 5, 'экран / окно', { size: 12.5 });
  b += `<path d="M600,${y - 16} L626,${y} L600,${y + 16} L574,${y} z" fill="#fff" stroke="${INK}" stroke-width="1.6"/>` + text(636, y + 5, 'развилка (решение)', { size: 12.5 });
  b += line(790, y, 840, y, { stroke: GREY, sw: 1.6, marker: 'arrG' }) + text(850, y + 5, 'действие пользователя', { size: 12.5 });
  b += line(1030, y, 1080, y, { stroke: ACC, sw: 2.4, marker: 'arrA' }) + text(1090, y + 5, 'основной (кратчайший) путь', { size: 12.5, fill: ACC, weight: 600 });
  return b;
}

function userflow() {
  const Y1 = 180, Y2 = 430;
  const N = {
    S:  { t: 'start', x: 60, y: Y1, s: 'Запуск', main: 1 },
    A:  { t: 'scr', x: 205, y: Y1, s: 'Экран входа', main: 1 },
    D1: { t: 'dec', x: 395, y: Y1, s: 'Войти\nв аккаунт?', main: 1 },
    B:  { t: 'scr', x: 590, y: Y1 - 70, s: 'Вход /\nрегистрация' },
    C:  { t: 'scr', x: 790, y: Y1, s: 'Стартовый экран', main: 1 },
    D2: { t: 'dec', x: 985, y: Y1, s: 'Создать\nили открыть?', main: 1 },
    E:  { t: 'scr', x: 1185, y: Y1 - 70, s: 'Диалог\n«Новый холст»', main: 1 },
    F:  { t: 'scr', x: 1185, y: Y1 + 70, s: 'Системный диалог\n«Открыть файл»' },
    G:  { t: 'scr', x: 1385, y: Y1, s: 'Редактор', main: 1 },
    D3: { t: 'dec', x: 1385, y: Y2, s: 'Результат\nустраивает?', main: 1 },
    H:  { t: 'scr', x: 1150, y: Y2, s: 'Диалог\n«Экспорт»', main: 1 },
    I:  { t: 'scr', x: 920, y: Y2, s: 'Системный диалог\n«Сохранить как»', main: 1 },
    D4: { t: 'dec', x: 700, y: Y2, s: 'Файл\nзаписан?', main: 1 },
    J:  { t: 'scr', x: 480, y: Y2, s: 'Уведомление\n«Файл сохранён»', main: 1 },
    Z:  { t: 'end', x: 270, y: Y2, s: 'Цель', main: 1 },
  };
  const R = RW / 2, A = flowArrow;
  let b = arrowDefs;
  b += text(30, 36, 'User Flow: «Нарисовать открытку и сохранить её в PNG»', { size: 22, weight: 700 });
  b += text(30, 60, 'Персона: Аня (без аккаунта). Точка входа — запуск программы, цель — PNG-файл на диске. Основной путь — 8 переходов.', { size: 13, fill: '#5C6370' });

  b += A([[90, Y1], [205 - R, Y1]], '', { main: 1 });
  b += A([[205 + R, Y1], [395 - DW, Y1]], '', { main: 1 });
  b += A([[395, Y1 - DH], [395, Y1 - 75], [590 - R, Y1 - 75]], 'Да', { li: 1, dy: -9 });
  b += A([[590 + R, Y1 - 75], [790, Y1 - 75], [790, Y1 - RH / 2]], 'вход выполнен', { dy: -9 });
  b += A([[395 + DW, Y1], [790 - R, Y1]], 'Нет · «Продолжить без входа»', { main: 1, dy: 18 });
  b += A([[790 + R, Y1], [985 - DW, Y1]], '', { main: 1 });
  b += A([[985, Y1 - DH], [985, Y1 - 70], [1185 - R, Y1 - 70]], '«Создать»', { main: 1, li: 1, dy: -9 });
  b += A([[985, Y1 + DH], [985, Y1 + 70], [1185 - R, Y1 + 70]], '«Открыть»', { li: 1, dy: 18 });
  b += A([[1185 + R, Y1 - 70], [1385, Y1 - 70], [1385, Y1 - RH / 2]], 'размер, фон', { main: 1, dy: -9 });
  b += A([[1185 + R, Y1 + 70], [1440, Y1 + 70], [1440, Y1 + RH / 2]], 'выбран файл', { dy: 18 });
  b += A([[1385, Y1 + RH / 2], [1385, Y2 - DH]], 'инструмент, цвет,\nрисование', { main: 1, dx: -12, dy: 0, anchor: 'end' });
  b += A([[1385 + DW, Y2], [1510, Y2], [1510, Y1], [1385 + R, Y1]], 'Нет ·\nCtrl+Z,\nдорисовать', { li: 1, dx: -8, dy: 50, anchor: 'end' });
  b += A([[1385 - DW, Y2], [1150 + R, Y2]], 'Да', { main: 1, dy: -10 });
  b += A([[1150 - R, Y2], [920 + R, Y2]], 'PNG,\nразмер', { main: 1, dy: -22 });
  b += A([[920 - R, Y2], [700 + DW, Y2]], 'папка,\nимя', { main: 1, dy: -22 });
  b += A([[700, Y2 + DH], [700, Y2 + 80], [920, Y2 + 80], [920, Y2 + RH / 2]], 'Нет · выбрать другую папку', { li: 1, dy: 15 });
  b += A([[700 - DW, Y2], [480 + R, Y2]], 'Да', { main: 1, dy: -10 });
  b += A([[480 - R, Y2], [270 + 36, Y2]], '', { main: 1 });

  for (const k in N) b += flowNode(N[k]);
  b += text(270, Y2 + 58, 'PNG-файл\nна диске', { anchor: 'middle', size: 12.5, weight: 600, fill: ACC });
  b += legend(580, 1560);
  return svgWrap(1560, 630, b, '#fff');
}

module.exports = { userflow, flowNode, flowArrow, arrowDefs, legend };
