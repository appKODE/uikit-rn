import { type DefaultTheme } from '@kode-frontend/uikit-rn'

import 'react-native-unistyles'

declare module 'react-native-unistyles' {
  export type AppThemes = {
    dark: DefaultTheme
    light: DefaultTheme
  }

  export interface UnistylesThemes extends AppThemes {}
}
