import { type FormFieldVariant } from '../types';

export const getFieldVariant = ({
  disabled,
  hasError,
}: {
  disabled: boolean;
  hasError: boolean;
}): FormFieldVariant => {
  if (disabled) {
    return 'disabled';
  }

  if (hasError) {
    return 'error';
  }

  return 'default';
};
