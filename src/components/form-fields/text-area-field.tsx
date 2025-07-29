import { forwardRef } from 'react';

import { type TextInputProps, type TextInputRef } from '../../primitives';
import { type FormFieldProps } from './form-field';
import { TextField } from './text-field';

export type TextAreaFieldProps = TextInputProps &
  Omit<
    FormFieldProps,
    'fieldHeight' | 'leadingAddon' | 'state' | 'trailingAddon' | 'variant'
  > & {
    disabled?: boolean;
    error?: string;
  };

export const TextAreaField = forwardRef<TextInputRef, TextAreaFieldProps>(
  (props, ref) => {
    return <TextField ref={ref} {...props} multiline fieldHeight={'auto'} />;
  }
);
