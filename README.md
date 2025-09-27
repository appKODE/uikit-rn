# 💅 KODE UI kit

React Native имплементация [UI-кита](https://www.figma.com/design/lAtx3eLh9DZcY8QJhnyavC/KODE-UI) от компании [KODE](https://kode.ru)

#### 🛠️ Минимальные требования

- iOS 16
- Android 7.0 (API 24)
- React Native 0.78.0+
- New Architecture **Enabled** ❗
- Xcode 16+ (recommended 16.3+)

#### ⚠️ Зависимости

- [react-native-unistyles v3+](https://www.unistyl.es)
- [react-native-reanimated](https://docs.swmansion.com/react-native-reanimated/)
- [react-native-gesture-handler](https://docs.swmansion.com/react-native-gesture-handler/)
- [react-native-bottom-sheet](https://gorhom.dev/react-native-bottom-sheet/)
- [react-native-keyboard-controller](https://kirillzyusko.github.io/react-native-keyboard-controller/)
- [react-native-safe-area-context](https://www.npmjs.com/package/react-native-safe-area-context)
- [@react-navigation/native](https://reactnavigation.org)
- [@react-navigation/bottom-tabs](https://reactnavigation.org/docs/bottom-tab-navigator/)
- [react-native-screens](https://www.npmjs.com/package/react-native-screens)

#### 📥 Установка

- установить все зависимости выше, согласно их документации
- `yarn add @kode-frontend/uikit-rn`
- Настроить `react-native-unistyles/plugin` плагин

```js
//bebel.config.js

module.exports = function (api) {
  api.cache(true)

  return {
    ...
    plugins: [
      ... // any plugins
      [
        'react-native-unistyles/plugin',
        {
          root: 'src',
          /*
            Нужно добавить `autoProcessPaths`
          */
          autoProcessPaths: [
            '@kode-frontend/uikit-rn',
          ],
        },
      ],
    ],
  }
}
```

#### 🧑‍💻 Использование

1. **Задекларируй темы**

```ts
//ui-kit.d.ts

import { type DefaultTheme } from '@kode-frontend/uikit-rn';

import 'react-native-unistyles';

declare module 'react-native-unistyles' {
  export type AppThemes = {
    dark: DefaultTheme;
    light: DefaultTheme;
  };

  export interface UnistylesThemes extends AppThemes {}
}
```

2. **Создай темы**

```ts
const light: DefaultTheme = createTheme(...)
const dark: DefaultTheme = createTheme(...)
```

3. **оберни приложение в контекст UI kit'а**

```ts
// index.js (.ts)

AppRegistry.registerComponent(...) <- удали эту строку

// замени ее на:
createThemedApp('your_app_name', () => App, {
  settings: {
    adaptiveThemes: true,
  },
  themes: {
    dark, // <- твоя тема, должна наследоваться от DefaultTheme
    light,// <- твоя тема
  },
})
```

4. **используй компоненты**

```ts
import { Typography } from '@kode-frontend/uikit-rn/primitives';
import { TextField } from '@kode-frontend/uikit-rn/components';
import { BottomSheet } from '@kode-frontend/uikit-rn/layouts';
```

5. **используй темы со всеми преимуществами [unistyles](https://www.unistyl.es)**

```ts
import { StyleSheet } from '@kode-frontend/uikit-rn';

const styles = StyleSheet.create((theme) => ({
  box: {
    backgroundColor: theme.palette.surface.background,
  },
}));
```

#### 📦 Состав UI kit'а

- _primitives_
  - Touchable
  - Typography
  - ActivityIndicator
  - RefreshControl
  - TextInput
  - _transitions_
    - FadeTransition
    - CollapseTransition
    - SwitchTransition
- _components_
  - _buttons_
    - Button
    - IconButton
  - _form-fields_
    - FormField
    - TextField
    - TextAreaField
    - SelectField
  - Divider
  - Cell
  - Checkbox
  - [Snackbar](./docs/components/snackbar.md)
- _layouts_
  - _bottom-sheet_
    - BottomSheet
    - BottomSheetFlatList
    - BottomSheetHeader
    - BottomSheetScrollView
    - BottomSheetSectionList
    - BottomSheetView
  - _page_
    - Page
    - PageList
    - PageFooter
- _hooks_
  - useTheme
- _lib_
  - createTheme

#### 🚀 Хочу внести свой вклад в развитие, как мне это сделать?

тебе [сюда](./docs/development.md)
