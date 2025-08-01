import type { TypographyColorKeys } from '../../../types';

type Props = {
  disabled?: boolean;
  hasValue?: boolean;
  placeholderTextColor: TypographyColorKeys;
};

export const getFieldTextColor = ({
  disabled,
  hasValue,
  placeholderTextColor,
}: Props): TypographyColorKeys => {
  if (disabled) {
    return 'textDisabled';
  }

  if (hasValue) {
    return 'textPrimary';
  }

  return placeholderTextColor;
};
