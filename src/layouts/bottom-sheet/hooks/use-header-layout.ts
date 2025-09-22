import { useCallback, useState } from 'react';
import { type LayoutChangeEvent } from 'react-native';

import { type BottomSheetHeaderTitleAlignment } from '../types';

type ContentWidths = {
  left: number;
  right: number;
};

export const useHeaderLayout = (
  titleAlign: BottomSheetHeaderTitleAlignment
) => {
  const [contentWidths, setContentWidths] = useState<ContentWidths>({
    left: 0,
    right: 0,
  });

  const handleLayout = useCallback(
    (isRight: boolean) => (event: LayoutChangeEvent) => {
      if (titleAlign !== 'center') {
        return;
      }

      const newWidth = Math.ceil(event.nativeEvent.layout.width);
      const side = isRight ? 'right' : 'left';

      setContentWidths((prev) =>
        prev[side] === newWidth ? prev : { ...prev, [side]: newWidth }
      );
    },
    [titleAlign]
  );

  return { contentWidths, handleLayout };
};
