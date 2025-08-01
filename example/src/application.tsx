import StorybookUI from '../.rnstorybook';
import { BottomSheetModalProvider } from '@gorhom/bottom-sheet';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { KeyboardProvider } from 'react-native-keyboard-controller';

export const App = ({}: {}) => {
  return (
    <GestureHandlerRootView>
      <SafeAreaProvider>
        <KeyboardProvider>
          <BottomSheetModalProvider>
            <StorybookUI />
          </BottomSheetModalProvider>
        </KeyboardProvider>
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
};
