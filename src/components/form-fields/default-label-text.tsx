import type { TextStyle } from 'react-native';

import type { TypographyVariants } from '../../types';
import { Typography } from '../../primitives';

export type TRenderLabelTextParams = {
  style: TextStyle;
  text?: string;
  variant?: TypographyVariants;
};

export const DefaultLabelText = ({
  text,
  style,
  variant,
}: TRenderLabelTextParams) => {
  if (!text) {
    return null;
  }

  return (
    <Typography style={style} variant={variant}>
      {text}
    </Typography>
  );
};
