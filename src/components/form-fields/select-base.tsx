import { type ReactElement, useCallback } from 'react';
import { type GestureResponderEvent, View } from 'react-native';

import { StyleSheet } from 'react-native-unistyles';

import { type TextInputProps, Typography } from '../../primitives';
import { FormField, type FormFieldProps } from './form-field';
import { getFieldState } from './utils/get-field-state';
import { getFieldTextColor } from './utils/get-field-text-color';
import { getFieldVariant } from './utils/get-field-variant';

type InputProps = Pick<
  TextInputProps,
  'placeholder' | 'placeholderTextColor' | 'style' | 'value'
>;

type FieldProps = Omit<
  FormFieldProps,
  'children' | 'counterSlot' | 'fieldHeight' | 'state' | 'variant'
>;

export type SelectBaseProps = FieldProps &
  InputProps & {
    children: ReactElement;
    disabled?: boolean;
    error?: string;
    isFocused: boolean;
  };

export const SelectBase = ({
  children,
  disabled = false,
  error,
  fieldContainerStyle,
  helperText,
  label,
  labelColor,
  labelVariant,
  leadingAddon,
  placeholder,
  placeholderTextColor = 'textQuaternary',
  style,
  trailingAddon,
  value,
  isFocused,
  onPress,
}: SelectBaseProps) => {
  const handleFieldPress = useCallback(
    (e: GestureResponderEvent) => {
      if (disabled) {
        return;
      }

      onPress?.(e);
    },
    [disabled, onPress]
  );

  const variant = getFieldVariant({
    disabled,
    hasError: Boolean(error),
  });

  const state = getFieldState({
    focused: isFocused,
    hasValue: Boolean(value),
  });

  const textColor = getFieldTextColor({
    disabled,
    hasValue: Boolean(value),
    placeholderTextColor,
  });

  return (
    <FormField
      fieldContainerStyle={fieldContainerStyle}
      helperText={error || helperText}
      label={label}
      labelColor={labelColor}
      labelVariant={labelVariant}
      leadingAddon={leadingAddon}
      state={state}
      trailingAddon={trailingAddon}
      variant={variant}
      onPress={handleFieldPress}
    >
      <View style={styles.container}>
        {children}

        <Typography color={textColor} style={style}>
          {value || placeholder}
        </Typography>
      </View>
    </FormField>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
