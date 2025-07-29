import { type ReactNode, forwardRef } from 'react';
import { type ScrollView, View } from 'react-native';

import {
  KeyboardAwareScrollView,
  type KeyboardAwareScrollViewProps,
} from 'react-native-keyboard-controller';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
} from 'react-native-reanimated';
import { StyleSheet } from 'react-native-unistyles';

export type PageProps = KeyboardAwareScrollViewProps & {
  footer?: ReactNode;
  gap?: number;
  keyboardBottomOffset?: number;
};

export const Page = forwardRef<ScrollView, PageProps>(
  (
    {
      children,
      contentContainerStyle,
      footer,
      gap = 0,
      keyboardBottomOffset = 0,
      keyboardDismissMode = 'interactive',
      keyboardShouldPersistTaps = 'handled',
      style,
      ...rest
    },
    ref
  ) => {
    const footerHeight = useSharedValue(0);

    const footerGapStyle = useAnimatedStyle(() => ({
      height: footerHeight.value,
    }));

    return (
      <View style={styles.root}>
        <KeyboardAwareScrollView
          ref={ref}
          {...rest}
          bottomOffset={keyboardBottomOffset}
          contentContainerStyle={[styles.content, contentContainerStyle]}
          keyboardDismissMode={keyboardDismissMode}
          keyboardShouldPersistTaps={keyboardShouldPersistTaps}
          style={style}
        >
          <View style={styles.scrollContent(gap)}>{children}</View>

          <Animated.View style={footerGapStyle} />
        </KeyboardAwareScrollView>

        {footer ? (
          <View
            style={styles.footerContainer}
            onLayout={(e) => (footerHeight.value = e.nativeEvent.layout.height)}
          >
            {footer}
          </View>
        ) : null}
      </View>
    );
  }
);

const styles = StyleSheet.create((theme) => ({
  content: {
    flexGrow: 1,
    paddingHorizontal: theme.components.page.paddingHorizontal,
    paddingVertical: theme.components.page.paddingVertical,
  },
  footerContainer: {
    bottom: 0,
    left: 0,
    position: 'absolute',
    right: 0,
  },
  root: {
    flex: 1,
  },
  scrollContent: (gap: number) => ({
    flex: 1,
    gap,
  }),
}));
