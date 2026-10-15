// Диаграммы: UML Use-Case, User Flow, User Flow Map
const { text, rect, line, poly, markers, svgWrap } = require('./common');

const INK = '#1F2329';
const ACC = '#4F46E5';

// ---------- UML Use-Case ----------
function actor(x, y, name) {
  return `<g stroke="${INK}" stroke-width="1.6" fill="none">
    <circle cx="${x}" cy="${y - 34}" r="11" fill="#fff"/>
    <line x1="${x}" y1="${y - 23}" x2="${x}" y2="${y + 6}"/>
    <line x1="${x - 18}" y1="${y - 13}" x2="${x + 18}" y2="${y - 13}"/>
    <line x1="${x}" y1="${y + 6}" x2="${x - 14}" y2="${y + 30}"/>
    <line x1="${x}" y1="${y + 6}" x2="${x + 14}" y2="${y + 30}"/></g>` +
    text(x, y + 50, name, { anchor: 'middle', size: 14, weight: 600 });
}

function usecase() {
  const UC = {
    reg:    [360, 75, 'Зарегистрироваться'],
    newc:   [360, 140, 'Создать холст'],
    open:   [360, 205, 'Открыть изображение'],
    draw:   [360, 270, 'Рисовать инструментами'],
    layers: [360, 335, 'Работать со слоями'],
    color:  [360, 400, 'Выбрать цвет'],
    undo:   [360, 465, 'Отменить / повторить'],
    exp:    [360, 530, 'Экспортировать изображение'],
    sett:   [360, 595, 'Настроить интерфейс'],
    txt:    [610, 225, 'Добавить текст'],
    shape:  [598, 315, 'Нарисовать фигуру'],
    fmt:    [610, 600, 'Выбрать формат и качество'],
    pass:   [610, 95, 'Восстановить пароль'],
    login:  [835, 165, 'Войти в аккаунт'],
    csave:  [835, 330, 'Сохранить проект\nв облако'],
    copen:  [835, 420, 'Открыть проект\nиз облака'],
  };
  const RX = 112, RY = 27;
  const edge = (k, tx, ty) => {
    const [cx, cy] = UC[k]; const dx = tx - cx, dy = ty - cy;
    const t = 1 / Math.sqrt((dx / RX) ** 2 + (dy / RY) ** 2);
    return [cx + dx * t, cy + dy * t];
  };
  // линия от актёра к крайней левой/правой точке эллипса — так линии не пересекают соседние варианты
  const assoc = (ax, ay, k) => { const [cx, cy] = UC[k]; const x = ax < cx ? cx - RX : cx + RX; return line(ax, ay, x, cy, { sw: 1.2 }); };
  const dep = (from, to, label) => {
    const [fx, fy] = UC[from], [tx, ty] = UC[to];
    const [x1, y1] = edge(from, tx, ty), [x2, y2] = edge(to, fx, fy);
    return line(x1, y1, x2, y2, { dash: '6 4', marker: 'open', sw: 1.2 }) +
      text((x1 + x2) / 2, (y1 + y2) / 2 - 7, `«${label}»`, { size: 12, fill: ACC, anchor: 'middle', italic: true });
  };

  let b = markers();
  b += rect(215, 25, 745, 625, { stroke: INK, sw: 1.6, r: 6, fill: '#FAFBFF' });
  b += text(587, 50, 'Система «ByRo Paint»', { anchor: 'middle', size: 16, weight: 700 });

  // ассоциации
  const G = [95, 330], U = [1085, 250], C = [1085, 520];
  ['reg', 'newc', 'open', 'draw', 'layers', 'color', 'undo', 'exp', 'sett'].forEach(k => b += assoc(G[0] + 20, G[1] - 15, k));
  ['login', 'csave', 'copen'].forEach(k => b += assoc(U[0] - 20, U[1] - 15, k));
  ['csave', 'copen'].forEach(k => b += assoc(C[0] - 20, C[1] - 15, k));


  for (const k in UC) {
    const [x, y, s] = UC[k];
    b += `<ellipse cx="${x}" cy="${y}" rx="${RX}" ry="${RY}" fill="#fff" stroke="${INK}" stroke-width="1.4"/>`;
    b += text(x, y + 5 - (s.includes('\n') ? 8 : 0), s, { anchor: 'middle', size: 13.5 });
  }

  // include / extend
  b += dep('txt', 'draw', 'extend');
  b += dep('shape', 'draw', 'extend');
  b += dep('exp', 'fmt', 'include');
  b += dep('pass', 'login', 'extend');

  b += actor(G[0], G[1], 'Гость');
  b += actor(U[0], U[1], 'Пользователь');
  b += actor(C[0], C[1], 'Облачное\nхранилище');
  // обобщение: Пользователь — наследник Гостя
  b += poly([[U[0], U[1] - 47], [U[0], 6], [G[0], 6], [G[0], G[1] - 47]], { marker: 'tri', sw: 1.3 });
  b += text(640, 20, 'обобщение: Пользователь может всё, что Гость, и работать с облаком', { anchor: 'middle', size: 11.5, fill: '#5C6370' });
  return svgWrap(1180, 665, b, '#fff');
}

module.exports = { usecase };
