import {
  BottomSheetBackdrop,
  type BottomSheetBackdropProps,
} from '@gorhom/bottom-sheet';

import { useTheme } from '../../hooks';

export const Backdrop = (props: BottomSheetBackdropProps) => {
  const theme = useTheme();

  return (
    <BottomSheetBackdrop
      {...props}
      appearsOnIndex={0}
      disappearsOnIndex={-1}
      style={{
        backgroundColor:
          theme.palette.surface[theme.components.bottomSheet.overlayColor],
      }}
    />
  );
};
