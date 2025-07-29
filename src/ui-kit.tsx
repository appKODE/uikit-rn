import { AppRegistry } from 'react-native'

import { StyleSheet } from 'react-native-unistyles'

type TUIkitConfig = Parameters<typeof StyleSheet.configure>[0]

export const createThemedApp = <T extends {}>(
  appName: string,
  AppComponent: () => React.ComponentType<T>,
  config: TUIkitConfig,
) => {
  StyleSheet.configure(config)

  AppRegistry.registerComponent(appName, AppComponent)
}
