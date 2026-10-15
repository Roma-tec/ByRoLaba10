// Дизайн-токены «ByRo Paint»: темы, типографика, отступы, размеры.
// Из этого же объекта сборка пишет tokens.json для разработчиков.
const themes = {
  light: {
    name: 'Светлая',
    appBg: '#F4F5F7', panel: '#FFFFFF', panel2: '#F4F5F7', hover: '#EBEDF1', border: '#DADDE3',
    text: '#1F2329', text2: '#5C6370', text3: '#8A919E',
    accent: '#4F46E5', accentHover: '#4338CA', accentPressed: '#3730A3', accentSoft: '#EEF0FF', onAccent: '#FFFFFF',
    work: '#D9DCE2', danger: '#DC2626', success: '#16A34A', warning: '#EA580C', focus: '#A5B4FC',
    overlay: 'rgba(15,17,21,0.45)', shadow: 'rgba(16,24,40,0.16)',
  },
  dark: {
    name: 'Тёмная',
    appBg: '#16181D', panel: '#1F2228', panel2: '#272A31', hover: '#2F333B', border: '#363A43',
    text: '#E8EAED', text2: '#A9AFB8', text3: '#7D838D',
    accent: '#6366F1', accentHover: '#818CF8', accentPressed: '#4F46E5', accentSoft: '#2B2D5C', onAccent: '#FFFFFF',
    work: '#101216', danger: '#F87171', success: '#4ADE80', warning: '#FB923C', focus: '#818CF8',
    overlay: 'rgba(0,0,0,0.6)', shadow: 'rgba(0,0,0,0.5)',
  },
  contrast: {
    name: 'Контрастная',
    appBg: '#000000', panel: '#000000', panel2: '#0D0D0D', hover: '#262626', border: '#FFFFFF',
    text: '#FFFFFF', text2: '#FFFFFF', text3: '#D0D0D0',
    accent: '#FFD60A', accentHover: '#FFE45C', accentPressed: '#E6C000', accentSoft: '#3D3300', onAccent: '#000000',
    work: '#1A1A1A', danger: '#FF6B6B', success: '#5CFF8A', warning: '#FFB020', focus: '#00E5FF',
    overlay: 'rgba(0,0,0,0.75)', shadow: 'rgba(0,0,0,0)', disabledBg: '#333333', tooltipBg: '#262626', tooltipFg: '#FFFFFF',
  },
};

const typography = {
  family: "'Segoe UI', 'SF Pro Text', Roboto, 'Noto Sans', Arial, sans-serif",
  sizes: { caption: 11, small: 12, body: 13, bodyL: 14, title: 16, h2: 20, h1: 28 },
  weights: { regular: 400, semibold: 600, bold: 700 },
  lineHeight: 1.4,
};

const spacing = [4, 8, 12, 16, 24, 32, 48];
const radius = { sm: 4, md: 6, lg: 10, xl: 16 };

// Размеры основных областей окна редактора (px, при масштабе 100 %)
const layout = {
  window: { min: '1280×720', base: '1280×800' },
  menuBar: 40, optionsBar: 44, toolBar: 52, toolButton: 36, icon: 20,
  rightPanel: 280, statusBar: 26, button: 32, buttonLarge: 40, input: 32, layerRow: 44,
};

const motion = { fast: '120ms ease-out', base: '180ms ease-out', slow: '260ms cubic-bezier(.2,.8,.2,1)' };

module.exports = { themes, typography, spacing, radius, layout, motion };
