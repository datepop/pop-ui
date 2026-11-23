/* global penpot */
// Run this function in the POP-UI file with the Penpot plugin API.
function syncPopUiStyles() {
  const library = penpot.library.local;
  // 파일 ID 대신 POP-UI 토큰 구조로 대상을 확인한다. 라이브러리를 이전·복제해도 스크립트를 고치지 않는다.
  const tokens = library.tokens.sets.find((set) => set.name === 'global')?.tokens;
  if (
    !tokens?.some((token) => token.name === 'color.aqua.50' && token.type === 'color') ||
    !tokens.some((token) => token.name === 'web.H1-40-bold' && token.type === 'typography')
  ) {
    throw new Error('Open a file with the POP-UI global token set before syncing styles.');
  }
  const byName = new Map(tokens.map((token) => [token.name, token]));
  const sourceKey = 'pop-ui-token';

  function resolve(value) {
    if (Array.isArray(value)) return resolve(value[0]);
    const ref = /^\{(.+)\}$/.exec(value);
    if (!ref) return String(value).replace(/px$/, '');
    const resolved = byName.get(ref[1])?.resolvedValueString;
    if (resolved == null) throw new Error('Unresolved token ' + ref[1]);
    return String(resolved).replace(/px$/, '');
  }

  function findStyle(styles, token, create) {
    const parts = token.name.split('.');
    const name = parts.pop();
    const path = parts.join(' / ');
    const style = styles.find((item) => item.getPluginData(sourceKey) === token.name) ??
      styles.find((item) => item.name === name && item.path === path) ?? create();
    if (style.name !== name) style.name = name;
    if (style.path !== path) style.path = path;
    if (style.getPluginData(sourceKey) !== token.name) style.setPluginData(sourceKey, token.name);
    return style;
  }

  const colors = library.colors;
  const typographies = library.typographies;
  for (const token of tokens) {
    if (token.type === 'color') {
      const raw = token.resolvedValueString;
      if (!/^#(?:[0-9a-f]{3,4}|[0-9a-f]{6}|[0-9a-f]{8})$/i.test(raw)) {
        throw new Error('Unsupported color ' + token.name);
      }
      const digits = raw.length <= 5 ? raw.slice(1).replace(/./g, '$&$&') : raw.slice(1);
      const hex = '#' + digits.slice(0, 6);
      const opacity = digits.length === 8 ? parseInt(digits.slice(6), 16) / 255 : 1;
      const style = findStyle(colors, token, () => library.createColor());
      if (style.color?.toLowerCase() !== hex.toLowerCase()) style.color = hex;
      if (style.opacity !== opacity) style.opacity = opacity;
    } else if (token.type === 'typography') {
      const props = token.value;
      function property(key, plural) {
        const raw = props[key] ?? props[plural];
        if (raw == null) throw new Error('Missing ' + key + ' for ' + token.name);
        return resolve(raw);
      }
      const family = property('fontFamily', 'fontFamilies');
      const weight = property('fontWeight', 'fontWeights');
      const fontSize = property('fontSize', 'fontSizes');
      const lineHeight = property('lineHeight', 'lineHeights');
      const font = penpot.fonts.findByName(family);
      const variant = font?.variants.find((v) => v.fontWeight === weight && v.fontStyle === 'normal');
      if (!variant) throw new Error('Missing font for ' + token.name);
      const style = findStyle(typographies, token, () => library.createTypography());
      if (style.fontFamily !== family || style.fontWeight !== weight || style.fontStyle !== 'normal') {
        style.setFont(font, variant);
      }
      for (const [key, value] of Object.entries({
        fontSize,
        lineHeight,
        letterSpacing: resolve(props.letterSpacing ?? 0),
      })) {
        if (style[key] !== value) style[key] = value;
      }
    }
  }
  return { colors: library.colors.length, typographies: library.typographies.length };
}

syncPopUiStyles();
