import type { TextStyle } from 'react-native';

import { Typography } from '../../primitives';

export type TRenderHelperTextParams = {
  style: TextStyle;
  text?: string;
};

export const DefaultHelperText = ({ text, style }: TRenderHelperTextParams) => {
  return (
    <Typography style={style} variant={'caption1'}>
      {text ?? ' '}
    </Typography>
  );
};
