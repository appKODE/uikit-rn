import { forwardRef, useImperativeHandle, useRef, useState } from 'react';
import {
  type TextInputFocusEventData,
  type NativeSyntheticEvent,
} from 'react-native';

import { StyleSheet } from 'react-native-unistyles';

import {
  TextInput,
  type TextInputProps,
  type TextInputRef,
  Typography,
} from '../../primitives';
import { FormField, type FormFieldProps } from './form-field';
import { getFieldCounterColor } from './utils/get-field-counter-color';
import { getFieldState } from './utils/get-field-state';
import { getFieldVariant } from './utils/get-field-variant';

export type TextFieldProps = TextInputProps &
  Omit<FormFieldProps, 'children' | 'state' | 'variant'> & {
    disabled?: boolean;
    error?: string;
  };

export const TextField = forwardRef<TextInputRef, TextFieldProps>(
  (
    {
      disabled = false,
      error,
      fieldContainerStyle,
      fieldHeight,
      helperText,
      label,
      labelColor,
      labelVariant,
      leadingAddon,
      style,
      trailingAddon,
      onBlur,
      onChangeText,
      onFocus,
      ...rest
    },
    ref
  ) => {
    const inputRef = useRef<TextInputRef>(null);

    const [isFocused, setIsFocused] = useState(false);

    const handleFocus = (e: NativeSyntheticEvent<TextInputFocusEventData>) => {
      setIsFocused(true);
      onFocus?.(e);
    };

    const handleBlur = (e: NativeSyntheticEvent<TextInputFocusEventData>) => {
      setIsFocused(false);
      onBlur?.(e);
    };

    const handlePressOverlay = () => {
      inputRef.current?.focus();
    };

    useImperativeHandle(ref, () => inputRef.current!);

    const valueLength = rest.value?.length ?? 0;

    const variant = getFieldVariant({
      disabled,
      hasError: Boolean(error),
    });

    const state = getFieldState({
      focused: isFocused,
      hasValue: Boolean(rest.value),
    });

    const counterColor = getFieldCounterColor({
      disabled,
      maxLength: rest.maxLength,
      valueLength,
    });

    return (
      <FormField
        counterSlot={
          rest.maxLength ? (
            <Typography
              color={counterColor}
              variant={'caption1'}
            >{`${valueLength}/${rest.maxLength}`}</Typography>
          ) : undefined
        }
        fieldContainerStyle={fieldContainerStyle}
        fieldHeight={fieldHeight}
        helperText={error || helperText}
        label={label}
        labelColor={labelColor}
        labelVariant={labelVariant}
        leadingAddon={leadingAddon}
        state={state}
        trailingAddon={trailingAddon}
        variant={variant}
        onPress={handlePressOverlay}
      >
        <TextInput
          style={[styles.input, style]}
          {...rest}
          color={disabled ? 'textDisabled' : 'textPrimary'}
          editable={!disabled}
          ref={inputRef}
          selectionColor={'textAccent'}
          onBlur={handleBlur}
          onChangeText={onChangeText}
          onFocus={handleFocus}
        />
      </FormField>
    );
  }
);

const styles = StyleSheet.create((theme) => ({
  input: {
    flex: 1,
    marginBottom: theme.scale.height(12),
    marginTop: theme.scale.height(12),
    paddingLeft: 0,
    paddingRight: 0,
  },
}));
