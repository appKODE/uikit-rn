import React, { forwardRef } from 'react';

import {
  BottomSheetModal,
  type BottomSheetModalProps,
} from '@gorhom/bottom-sheet';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { StyleSheet } from 'react-native-unistyles';

import type { BottomSheetRef } from './types';
import { Backdrop } from './backdrop';
import { useAddRefHandlers } from './hooks/use-add-ref-handlers';
import { useTheme } from '../../hooks';

export type BottomSheetProps = Omit<BottomSheetModalProps, 'children'> & {
  children: React.ReactElement;
};

/**
 * Базовый компонент для модалки боттом-шита. Используется для композиции.
 * В качестве children'ов **должен** принимать один из четырех компонентов:
 * - **BottomSheetView**
 * - **BottomSheetScrollView**
 * - **BottomSheetFlatList**
 * - **BottomSheetSectionList**
 *
 * Пример:
 * ```tsx
 * const bottomSheetRef = useRef<BottomSheetRef>(null)
 *
 * <BottomSheet ref={bottomSheetRef}>
 *   <BottomSheetView>
 *     <Typography>Content</Typography>
 *   </BottomSheetView>
 * </BottomSheet>
 * ```
 */
export const BottomSheet = forwardRef<BottomSheetRef, BottomSheetModalProps>(
  ({ children, ...rest }, ref) => {
    const theme = useTheme();
    const { top } = useSafeAreaInsets();

    const { bottomSheetModalRef } = useAddRefHandlers({ ref });

    return (
      <BottomSheetModal
        ref={bottomSheetModalRef}
        {...rest}
        backdropComponent={Backdrop}
        backgroundStyle={styles.modal}
        handleIndicatorStyle={[styles.indicator, rest.handleIndicatorStyle]}
        handleStyle={[styles.indicatorWrapper, rest.handleStyle]}
        topInset={top + theme.components.bottomSheet.modalTopOffset}
      >
        {children}
      </BottomSheetModal>
    );
  }
);

const styles = StyleSheet.create((theme) => {
  const {
    borderRadius,
    contentBackgroundColor,
    indicatorBackgroundColor,
    indicatorBorderRadius,
    indicatorHeight,
    indicatorTopOffset,
    indicatorWidth,
  } = theme.components.bottomSheet;

  return {
    indicator: {
      backgroundColor: theme.palette.icon[indicatorBackgroundColor],
      ...(indicatorWidth ? { width: indicatorWidth } : {}),
      ...(indicatorHeight ? { height: indicatorHeight } : {}),
      ...(indicatorBorderRadius !== undefined && {
        borderRadius: indicatorBorderRadius,
      }),
    },
    indicatorWrapper: {
      ...(indicatorTopOffset ? { paddingTop: indicatorTopOffset } : {}),
    },
    modal: {
      backgroundColor: theme.palette.surface[contentBackgroundColor],
      borderRadius,
    },
  };
});
