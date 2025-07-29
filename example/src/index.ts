import { createThemedApp } from '@kode-frontend/uikit-rn';
import { name as appName } from '../app.json';
import App from './application';
import { dark, light } from './theme';

createThemedApp(appName, () => App, {
  settings: {
    adaptiveThemes: true,
  },
  themes: {
    dark,
    light,
  },
});
