// Общие помощники для генерации SVG
const FONT = "'Segoe UI', Arial, sans-serif";

const esc = s => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

// Текст; несколько строк — через '\n'
function text(x, y, s, o = {}) {
  const { size = 14, fill = '#1F2329', anchor = 'start', weight = 400, lh = 1.25, family = FONT, italic = false } = o;
  const lines = String(s).split('\n');
  const y0 = y - ((lines.length - 1) * size * lh) / 2 * (o.middle ? 1 : 0);
  return `<text x="${x}" y="${y0}" font-family="${family}" font-size="${size}" font-weight="${weight}"` +
    `${italic ? ' font-style="italic"' : ''} fill="${fill}" text-anchor="${anchor}">` +
    lines.map((l, i) => `<tspan x="${x}" dy="${i ? size * lh : 0}">${esc(l)}</tspan>`).join('') + '</text>';
}

const rect = (x, y, w, h, o = {}) =>
  `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="${o.r || 0}" fill="${o.fill || 'none'}"` +
  `${o.stroke ? ` stroke="${o.stroke}" stroke-width="${o.sw || 1}"` : ''}${o.dash ? ` stroke-dasharray="${o.dash}"` : ''}` +
  `${o.opacity != null ? ` opacity="${o.opacity}"` : ''}/>`;

const line = (x1, y1, x2, y2, o = {}) =>
  `<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" stroke="${o.stroke || '#1F2329'}" stroke-width="${o.sw || 1.4}"` +
  `${o.dash ? ` stroke-dasharray="${o.dash}"` : ''}${o.marker ? ` marker-end="url(#${o.marker})"` : ''}/>`;

const poly = (pts, o = {}) =>
  `<polyline points="${pts.map(p => p.join(',')).join(' ')}" fill="none" stroke="${o.stroke || '#1F2329'}"` +
  ` stroke-width="${o.sw || 1.4}"${o.dash ? ` stroke-dasharray="${o.dash}"` : ''}` +
  `${o.marker ? ` marker-end="url(#${o.marker})"` : ''} stroke-linejoin="round"/>`;

// Стандартные наконечники стрелок
const markers = (color = '#1F2329') => `<defs>
  <marker id="arr" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="8" markerHeight="8" orient="auto-start-reverse">
    <path d="M0,0 L10,5 L0,10 z" fill="${color}"/></marker>
  <marker id="open" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="9" markerHeight="9" orient="auto-start-reverse">
    <path d="M0,0 L10,5 L0,10" fill="none" stroke="${color}" stroke-width="1.4"/></marker>
  <marker id="tri" viewBox="0 0 12 12" refX="11" refY="6" markerWidth="12" markerHeight="12" orient="auto-start-reverse">
    <path d="M0,0 L11,6 L0,12 z" fill="#fff" stroke="${color}" stroke-width="1.2"/></marker>
</defs>`;

const svgWrap = (w, h, body, bg) =>
  `<svg viewBox="0 0 ${w} ${h}" width="${w}" height="${h}">${bg ? rect(0, 0, w, h, { fill: bg }) : ''}${body}</svg>`;

module.exports = { FONT, esc, text, rect, line, poly, markers, svgWrap };
