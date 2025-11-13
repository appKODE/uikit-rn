import {
  type ForwardedRef,
  type ReactElement,
  type ReactNode,
  forwardRef,
} from 'react';
import { SectionList, type SectionListProps, View } from 'react-native';

import Animated, {
  useAnimatedStyle,
  useSharedValue,
} from 'react-native-reanimated';
import { StyleSheet } from 'react-native-unistyles';
import { useBottomInsets } from '../../hooks';

export type PageSectionListProps<ItemT, SectionT> = SectionListProps<
  ItemT,
  SectionT
> & {
  footer?: ReactNode;
};

const PageSectionListInner = <ItemT, SectionT>(
  {
    ListFooterComponent,
    contentContainerStyle,
    footer,
    ...rest
  }: PageSectionListProps<ItemT, SectionT>,
  ref: ForwardedRef<SectionList<ItemT, SectionT>>
) => {
  const bottomInsets = useBottomInsets();
  const footerHeight = useSharedValue(0);

  const footerGapStyle = useAnimatedStyle(() => ({
    height: footerHeight.value,
  }));

  return (
    <View style={styles.root}>
      <SectionList
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

export const PageSectionList = forwardRef(PageSectionListInner) as <
  ItemT,
  SectionT,
>(
  props: PageSectionListProps<ItemT, SectionT> & {
    ref?: ForwardedRef<SectionList<ItemT>>;
  }
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
