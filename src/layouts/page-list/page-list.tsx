import {
  type ForwardedRef,
  forwardRef,
  type ReactElement,
  type ReactNode,
} from 'react';
import { FlatList, type FlatListProps, View } from 'react-native';

import Animated, {
  useAnimatedStyle,
  useSharedValue,
} from 'react-native-reanimated';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { StyleSheet } from 'react-native-unistyles';

export type PageListProps<T> = FlatListProps<T> & {
  footer?: ReactNode;
};

const PageListInner = <T,>(
  { contentContainerStyle, footer, ...rest }: PageListProps<T>,
  ref: ForwardedRef<FlatList<T>>
) => {
  const insets = useSafeAreaInsets();
  const footerHeight = useSharedValue(0);

  const footerGapStyle = useAnimatedStyle(() => ({
    height: footerHeight.value,
  }));

  return (
    <View style={styles.root}>
      <FlatList
        ref={ref}
        {...rest}
        ListFooterComponent={<Animated.View style={footerGapStyle} />}
        contentContainerStyle={[
          styles.content(footer ? undefined : insets.bottom),
          contentContainerStyle,
        ]}
      />

      {footer ? (
        <View
          style={styles.footerContainer(insets.bottom)}
          onLayout={(e) => (footerHeight.value = e.nativeEvent.layout.height)}
        >
          {footer}
        </View>
      ) : null}
    </View>
  );
};

export const PageList = forwardRef(PageListInner) as <T>(
  props: PageListProps<T> & { ref?: ForwardedRef<FlatList<T>> }
) => ReactElement;

const styles = StyleSheet.create((theme) => ({
  content: (bottomInset?: number) => ({
    flexGrow: 1,
    paddingBottom: bottomInset ?? theme.components.page.paddingVertical,
    paddingHorizontal: theme.components.page.paddingHorizontal,
    paddingTop: theme.components.page.paddingVertical,
  }),
  footerContainer: (bottomInset: number) => ({
    bottom: 0,
    left: 0,
    paddingBottom: bottomInset,
    position: 'absolute',
    right: 0,
  }),
  root: {
    flex: 1,
  },
}));
