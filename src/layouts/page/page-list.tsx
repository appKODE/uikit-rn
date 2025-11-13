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
import { StyleSheet } from 'react-native-unistyles';
import { useBottomInsets } from '../../hooks';

export type PageListProps<T> = FlatListProps<T> & {
  footer?: ReactNode;
};

const PageListInner = <T,>(
  {
    ListFooterComponent,
    contentContainerStyle,
    footer,
    ...rest
  }: PageListProps<T>,
  ref: ForwardedRef<FlatList<T>>
) => {
  const bottomInsets = useBottomInsets();
  const footerHeight = useSharedValue(0);

  const footerGapStyle = useAnimatedStyle(() => ({
    height: footerHeight.value,
  }));

  return (
    <View style={styles.root}>
      <FlatList
        ref={ref}
        {...rest}
        ListFooterComponent={
          <>
            {ListFooterComponent}
            <Animated.View style={footerGapStyle} />
          </>
        }
        contentContainerStyle={[
          styles.content(footer ? undefined : bottomInsets),
          contentContainerStyle,
        ]}
      />

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
  footerContainer: {
    bottom: 0,
    left: 0,
    position: 'absolute',
    right: 0,
  },
  root: {
    flex: 1,
  },
}));
