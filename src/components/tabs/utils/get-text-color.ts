import { type TypographyColorKeys } from '../../../types';

type Params = {
  isDisabled?: boolean;
  disabledColor: TypographyColorKeys;
  color: TypographyColorKeys;
};

export const getTextColor = ({
  isDisabled,
  color,
  disabledColor,
}: Params): TypographyColorKeys => {
  if (isDisabled) {
    return disabledColor;
  }

  return color;
};
