import { type FormFieldState } from '../types';

export const getFieldState = ({
  focused,
  hasValue,
}: {
  focused: boolean;
  hasValue: boolean;
}): FormFieldState => {
  if (hasValue) {
    return focused ? 'focusFilling' : 'filled';
  }

  if (focused) {
    return 'focusEmpty';
  }

  return 'empty';
};
