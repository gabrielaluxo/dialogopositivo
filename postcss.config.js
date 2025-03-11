const combineMediaQuery = require('postcss-combine-media-query');
const presetEnv = require('postcss-preset-env');
const cssnano = require('cssnano');
const atImport = require('postcss-import');
const autoprefixer = require('autoprefixer');

module.exports = {
  plugins: [
    atImport({
      path: ['./assets/css'],
    }),
    presetEnv({ stage: 0 }),
    combineMediaQuery(),
    autoprefixer(),
    cssnano({
      preset: 'default',
    }),
  ],
};
