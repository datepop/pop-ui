import StyleDictionary from 'style-dictionary';

// px 문자열("6px")을 숫자(6)로 변환 — Mantine radius prop이 숫자를 기대
StyleDictionary.registerTransform({
  name: 'size/px-to-number',
  type: 'value',
  filter: (token) => token.type === 'borderRadius',
  transform: (token) => parseFloat(String(token.value).replace('px', '')),
});

// `js` transformGroup 기본 구성(v5.1.1): attribute/cti, name/pascal, size/rem, color/hex.
// `transforms`를 명시하면 transformGroup 기본값을 덮어쓰므로, 기본 목록을 그대로 나열한 뒤
// size/px-to-number를 추가한다. 기본 transform들은 borderRadius 토큰을 건드리지 않고
// (color/hex는 color만, size/rem은 dimension/fontSize만 필터), colors.ts 산출물은 변하지 않는다.
export default {
  source: ['./transformed-token.json'],
  platforms: {
    scss: {
      transformGroup: 'scss',
      buildPath: '../core/src/components/shared/',
      files: [
        {
          destination: 'variables.scss',
          format: 'scss/variables',
        },
        {
          destination: '_spacing-map.scss',
          format: 'scss/map-flat',
          filter: { type: 'spacing' },
          options: { mapName: 'spacing-tokens' },
        },
        {
          destination: '_font-size-map.scss',
          format: 'scss/map-flat',
          filter: { type: 'fontSizes' },
          options: { mapName: 'font-size-tokens' },
        },
        {
          destination: '_border-width-map.scss',
          format: 'scss/map-flat',
          filter: { type: 'borderWidth' },
          options: { mapName: 'border-width-tokens' },
        },
      ],
    },
    ts: {
      transforms: ['attribute/cti', 'name/pascal', 'size/rem', 'color/hex', 'size/px-to-number'],
      buildPath: './src/tokens/',
      files: [
        {
          destination: 'colors.ts',
          format: 'javascript/es6',
          filter: {
            type: 'color',
          },
        },
        {
          destination: 'radius.ts',
          format: 'javascript/es6',
          filter: {
            type: 'borderRadius',
          },
        },
      ],
    },
  },
};
