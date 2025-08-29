import { forwardRef } from 'react';

import { type TextInputProps, type TextInputRef } from '../../primitives';
import { type FormFieldProps } from './form-field';
import { TextField } from './text-field';

export type TextAreaFieldProps = TextInputProps &
  Omit<
    FormFieldProps,
    | 'fieldHeight'
    | 'leadingAddon'
    | 'state'
    | 'trailingAddon'
    | 'variant'
    | 'children'
  > & {
    disabled?: boolean;
    error?: string;
    counterMaxLength?: number;
  };

export const TextAreaField = forwardRef<TextInputRef, TextAreaFieldProps>(
  (props, ref) => {
    return <TextField ref={ref} {...props} multiline fieldHeight={'auto'} />;
  }
);
