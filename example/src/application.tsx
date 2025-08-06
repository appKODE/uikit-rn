import StorybookUI from '../.rnstorybook';
import { BottomSheetModalProvider } from '@gorhom/bottom-sheet';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { KeyboardProvider } from 'react-native-keyboard-controller';
import { Snackbar } from './ui/components/snackbar';
import { StatusBar, useColorScheme } from 'react-native';

export const App = ({}: {}) => {
  const isDark = useColorScheme() === 'dark';

  return (
    <GestureHandlerRootView>
      <SafeAreaProvider>
        <KeyboardProvider>
          <BottomSheetModalProvider>
            <Snackbar>
              <StatusBar barStyle={isDark ? 'light-content' : 'dark-content'} />

              <StorybookUI />
            </Snackbar>
          </BottomSheetModalProvider>
        </KeyboardProvider>
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
};
