const path = require('path');
const { getConfig } = require('react-native-builder-bob/babel-config');
const pkg = require('../package.json');

const root = path.resolve(__dirname, '..');

const config = getConfig(
  {
    presets: ['module:@react-native/babel-preset'],
  },
  { root, pkg }
);

module.exports = function (api) {
  api.cache(true);

  return {
    ...config,
    plugins: [
      ...(config.plugins ?? []),
      [
        'react-native-unistyles/plugin',
        {
          root: 'src',
        },
      ],
    ],
  };
};
