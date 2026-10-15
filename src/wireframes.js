// Черновой прототип (wireframes): схемы экранов 1280×800 — зоны и их описание, без оформления.
// Здесь же User Flow Map: карта всех экранов, связанных навигацией.
const { text, rect, line, svgWrap } = require('./common');
const { flowArrow, arrowDefs } = require('./flow');

const W = 1280, H = 800;
const ST = '#8A919E', FILL = '#F1F2F4', LBL = '#5C6370', DARK = '#3A3F47';

const zone = (x, y, w, h, label, o = {}) =>
  rect(x, y, w, h, { fill: o.fill || FILL, stroke: ST, sw: 1.5, r: o.r || 0, dash: o.dash }) +
  (label ? text(x + w / 2, y + h / 2 + 5, label, { anchor: 'middle', size: o.size || 15, fill: LBL, middle: true }) : '');
const imgbox = (x, y, w, h) => rect(x, y, w, h, { fill: '#fff', stroke: ST, sw: 1.5 }) +
  line(x, y, x + w, y + h, { stroke: ST, sw: 1.2 }) + line(x + w, y, x, y + h, { stroke: ST, sw: 1.2 });
const tline = (x, y, w, h = 9) => rect(x, y, w, h, { fill: '#C9CED6', r: 4 });
const btn = (x, y, w, label, dark, h = 40) =>
  rect(x, y, w, h, { fill: dark ? DARK : '#fff', stroke: dark ? DARK : ST, sw: 1.5, r: 6 }) +
  text(x + w / 2, y + h / 2 + 5, label, { anchor: 'middle', size: 14, fill: dark ? '#fff' : LBL, weight: 600 });
const inp = (x, y, w, label) => text(x, y, label, { size: 13, fill: LBL }) + rect(x, y + 8, w, 40, { fill: '#fff', stroke: ST, sw: 1.5, r: 6 });
const frame = body => rect(0, 0, W, H, { fill: '#fff', stroke: '#5C6370', sw: 3 }) + body;

const WF = {
  register: () => frame(
    imgbox(0, 0, 560, 800) + text(280, 380, 'Иллюстрация + слоган', { anchor: 'middle', size: 18, fill: LBL }) +
    text(680, 140, 'Создание аккаунта', { size: 30, weight: 700, fill: DARK }) + tline(680, 165, 300) +
    inp(680, 220, 460, 'Имя') + inp(680, 300, 460, 'E-mail') + inp(680, 380, 460, 'Пароль (глаз — показать)') +
    rect(680, 456, 20, 20, { stroke: ST, sw: 1.5, fill: '#fff' }) + tline(712, 461, 320) +
    btn(680, 500, 460, 'Зарегистрироваться', true) +
    text(910, 572, '— или —', { anchor: 'middle', size: 13, fill: LBL }) +
    btn(680, 590, 224, 'Google') + btn(916, 590, 224, 'VK') +
    text(910, 680, 'Уже есть аккаунт? Войти', { anchor: 'middle', size: 14, fill: LBL }) +
    text(910, 720, 'Продолжить без входа →', { anchor: 'middle', size: 14, fill: DARK, weight: 600 })),

  start: () => frame(
    zone(0, 0, W, 56, 'Шапка: логотип · поиск по файлам · аватар / вход') +
    zone(0, 56, 220, 744, 'Навигация:\nГлавная\nНедавние\nОблако\nШаблоны\n\nНастройки') +
    zone(250, 86, 320, 150, 'Создать (Ctrl+N)', { r: 10, fill: '#E3E5EA' }) + zone(590, 86, 300, 150, 'Открыть файл (Ctrl+O)', { r: 10 }) +
    zone(910, 86, 340, 150, 'Перетащите файл сюда', { r: 10, dash: '8 6', fill: '#fff' }) +
    text(250, 280, 'Недавние', { size: 18, weight: 700, fill: DARK }) +
    [0, 1, 2, 3].map(i => imgbox(250 + i * 252, 300, 232, 150) + tline(250 + i * 252, 462, 150) + tline(250 + i * 252, 480, 90, 7)).join('') +
    text(250, 545, 'Шаблоны размеров', { size: 18, weight: 700, fill: DARK }) +
    [0, 1, 2, 3, 4].map(i => zone(250 + i * 202, 565, 186, 110, ['Открытка', 'Full HD', 'A4', 'Квадрат', 'Аватар'][i], { r: 8 })).join('')),

  editor: () => frame(
    zone(0, 0, W, 40, 'Меню: Файл · Правка · Изображение · Слой · Вид · Справка | отмена/повтор | масштаб | Экспорт') +
    zone(0, 40, W, 44, 'Параметры активного инструмента (размер, непрозрачность, жёсткость…)') +
    zone(0, 84, 52, 690, 'И\nн\nс\nт\nр\nу\nм\nе\nн\nт\nы', { size: 14 }) +
    rect(52, 84, 948, 690, { fill: '#E3E5EA', stroke: ST, sw: 1.5 }) + imgbox(176, 160, 700, 440) +
    text(526, 640, 'Рабочая область: холст по центру, прокрутка, масштаб', { anchor: 'middle', size: 15, fill: LBL }) +
    zone(1000, 84, 280, 300, 'Панель «Цвет»:\nпалитра, HEX,\nнедавние цвета') +
    zone(1000, 384, 280, 40, 'Вкладки: Слои | История', { size: 13 }) +
    zone(1000, 424, 280, 350, 'Список слоёв\n(видимость, блокировка,\nминиатюра, имя)\n\n+ / копия / удалить') +
    zone(0, 774, W, 26, 'Строка состояния: координаты · размер холста · масштаб · «Сохранено»', { size: 12 })),

  newcanvas: () => frame(
    rect(0, 0, W, H, { fill: '#D5D8DE' }) + text(640, 60, '(затемнённый стартовый экран)', { anchor: 'middle', size: 14, fill: LBL }) +
    rect(240, 130, 800, 540, { fill: '#fff', stroke: DARK, sw: 2, r: 10 }) +
    text(270, 175, 'Новый холст', { size: 22, weight: 700, fill: DARK }) + text(1010, 175, '×', { size: 24, fill: LBL }) +
    zone(270, 200, 230, 400, 'Пресеты:\nFull HD\nОткрытка\nA4\nКвадрат\nАватар\nНедавние', { r: 6 }) +
    inp(530, 220, 470, 'Название') + inp(530, 300, 210, 'Ширина, px') + inp(790, 300, 210, 'Высота, px (пропорции связаны)') +
    inp(530, 380, 210, 'Разрешение, DPI') + inp(790, 380, 210, 'Ориентация') +
    text(530, 470, 'Фон', { size: 13, fill: LBL }) + [0, 1, 2].map(i => zone(530 + i * 160, 482, 150, 44, ['Белый', 'Прозрачный', 'Свой цвет'][i], { r: 6, size: 13 })).join('') +
    btn(720, 610, 130, 'Отмена') + btn(870, 610, 130, 'Создать', true)),

  export: () => frame(
    rect(0, 0, W, H, { fill: '#D5D8DE' }) + text(640, 60, '(затемнённый редактор)', { anchor: 'middle', size: 14, fill: LBL }) +
    rect(160, 110, 960, 580, { fill: '#fff', stroke: DARK, sw: 2, r: 10 }) +
    text(190, 155, 'Экспорт изображения', { size: 22, weight: 700, fill: DARK }) +
    imgbox(190, 180, 520, 420) + text(450, 625, 'Предпросмотр результата', { anchor: 'middle', size: 13, fill: LBL }) +
    text(740, 200, 'Формат', { size: 13, fill: LBL }) + [0, 1, 2, 3, 4].map(i => zone(740 + i * 70, 210, 66, 40, ['PNG', 'JPG', 'SVG', 'PDF', 'BMP'][i], { r: 6, size: 13 })).join('') +
    text(740, 290, 'Качество', { size: 13, fill: LBL }) + line(740, 312, 1090, 312, { stroke: ST, sw: 3 }) + `<circle cx="1000" cy="312" r="9" fill="#fff" stroke="${ST}" stroke-width="2"/>` +
    inp(740, 350, 165, 'Ширина') + inp(925, 350, 165, 'Высота') +
    rect(740, 438, 20, 20, { stroke: ST, sw: 1.5, fill: '#fff' }) + tline(772, 443, 200) +
    text(740, 500, 'Размер файла ≈ …', { size: 14, fill: LBL }) +
    btn(820, 620, 130, 'Отмена') + btn(960, 620, 130, 'Экспорт', true)),

  settings: () => frame(
    zone(0, 0, W, 56, 'Шапка: ← назад · «Настройки»') +
    zone(0, 56, 260, 744, 'Разделы:\nВнешний вид\nХолст и инструменты\nГорячие клавиши\nСохранение\nАккаунт\nО программе') +
    text(300, 110, 'Внешний вид', { size: 24, weight: 700, fill: DARK }) +
    text(300, 150, 'Тема', { size: 14, fill: LBL }) +
    [0, 1, 2, 3].map(i => zone(300 + i * 230, 165, 210, 140, ['Светлая', 'Тёмная', 'Контрастная', 'Как в системе'][i], { r: 8 })).join('') +
    inp(300, 350, 300, 'Язык интерфейса') + text(300, 450, 'Масштаб интерфейса', { size: 13, fill: LBL }) +
    line(300, 480, 700, 480, { stroke: ST, sw: 3 }) +
    [0, 1, 2].map(i => tline(300, 540 + i * 50, 360) + rect(1120, 532 + i * 50, 48, 26, { r: 13, stroke: ST, sw: 1.5, fill: '#fff' })).join('')),
};

const wrapWF = name => () => svgWrap(W, H, WF[name]());

// ---------- User Flow Map ----------
function userflowmap() {
  const s = 0.2, tw = W * s, th = H * s; // миниатюра 256×160
  const Y1 = 90, Y2 = 420;
  const pos = {
    register: [40, Y1, 'Регистрация / вход'], start: [400, Y1, 'Стартовый экран'], newcanvas: [760, Y1, 'Новый холст'],
    editor: [1120, Y1, 'Редактор'], settings: [400, Y2, 'Настройки'], export: [1120, Y2, 'Экспорт'],
  };
  const A = flowArrow, m = Y1 + th / 2, L = Y1 + th + 36; // m — середина миниатюр, L — ниже подписей
  let b = arrowDefs;
  b += A([[40 + tw, m], [400, m]], 'вход /\nбез входа', { main: 1, dy: -22 });
  b += A([[400 + tw, m], [760, m]], '«Создать»', { main: 1, dy: -10 });
  b += A([[760 + tw, m], [1120, m]], 'размер, фон', { main: 1, dy: -10 });
  b += A([[528, Y1], [528, 40], [1248, 40], [1248, Y1]], '«Открыть» / недавний файл', { li: 1, dy: -8 });
  b += A([[1220, L], [1220, Y2]], 'Ctrl+Shift+E', { main: 1, dx: -10, anchor: 'end', dy: 0 });
  b += A([[1290, Y2], [1290, L]], 'отмена /\nготово', { dx: 10, anchor: 'start', dy: 0 });
  b += A([[500, L], [500, Y2]], 'меню →\nНастройки', { dx: -10, anchor: 'end', dy: 0 });
  b += A([[560, Y2], [560, L]], 'назад', { dx: 10, anchor: 'start', dy: 0 });
  b += A([[1120, m + 50], [1070, m + 50], [1070, Y2 + th / 2], [400 + tw, Y2 + th / 2]], 'из меню редактора → Настройки', { li: 2, dy: -10 });
  for (const k in pos) {
    const [x, y, label] = pos[k];
    b += `<g transform="translate(${x},${y}) scale(${s})">${WF[k]()}</g>` +
      text(x + tw / 2, y + th + 24, label, { anchor: 'middle', size: 15, weight: 700 });
  }
  return svgWrap(1420, 620, b, '#fff');
}

module.exports = {
  'wf-register': wrapWF('register'), 'wf-start': wrapWF('start'), 'wf-editor': wrapWF('editor'),
  'wf-newcanvas': wrapWF('newcanvas'), 'wf-export': wrapWF('export'), 'wf-settings': wrapWF('settings'),
  userflowmap, WF,
};
