import type { TypographyColorKeys } from '../../../types';

export const getFieldCounterColor = ({
  disabled,
  maxLength,
  valueLength,
}: {
  disabled?: boolean;
  maxLength?: number;
  valueLength: number;
}): TypographyColorKeys => {
  if (disabled) {
    return 'textDisabled';
  }

  if (maxLength === undefined || valueLength < maxLength) {
    return 'textSecondary';
  }

  if (valueLength === maxLength) {
    return 'textWarning';
  }

  return 'textNegative';
};
