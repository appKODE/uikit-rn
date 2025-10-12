import { forwardRef } from 'react';
import {
  TextInput as TextInputBase,
  type TextInputProps as TextInputBaseProps,
} from 'react-native';

import { StyleSheet, useUnistyles } from 'react-native-unistyles';

import { type TypographyColorKeys } from '../types';

const FONT_SIZE = 16;
const LINE_HEIGHT = 24;

type TextInputExtraProps = {
  color?: TypographyColorKeys;
  placeholderTextColor?: TypographyColorKeys;
  selectionColor?: TypographyColorKeys;
};

type InputProps<Input extends TextInputBaseProps> = Omit<
  Input,
  'keyboardAppearance' | 'placeholderTextColor' | 'selectionColor'
> &
  TextInputExtraProps;

export type TextInputRef = TextInputBase;
export type TextInputProps = InputProps<TextInputBaseProps>;

export const TextInput = forwardRef<TextInputBase, TextInputProps>(
  (
    {
      placeholderTextColor = 'textQuaternary',
      selectionColor = 'textAccent',
      style,
      ...props
    },
    ref
  ) => {
    const { rt, theme } = useUnistyles();

    return (
      <TextInputBase
        keyboardAppearance={rt.themeName === 'dark' ? 'dark' : 'light'}
        placeholderTextColor={theme.palette.all[placeholderTextColor]}
        ref={ref}
        selectionColor={
          selectionColor ? theme.palette.all[selectionColor] : undefined
        }
        {...props}
        style={[styles.input(props), style]}
      />
    );
  }
);

const styles = StyleSheet.create((theme) => ({
  input: ({
    color = 'textPrimary',
    multiline,
    numberOfLines,
  }: TextInputProps) => {
    const fontSize = theme.typography.body1.fontSize || FONT_SIZE;
    const lineHeight = theme.typography.body1.lineHeight || LINE_HEIGHT;

    return {
      alignSelf: 'stretch',
      color: theme.palette.all[color],
      fontSize: theme.scale.fontSize(fontSize),
      height: !multiline ? theme.scale.height(lineHeight) : undefined,
      lineHeight: multiline ? theme.scale.height(lineHeight) : undefined,
      minHeight:
        multiline && numberOfLines
          ? theme.scale.height(lineHeight) * numberOfLines
          : undefined,
      paddingBottom: 0,
      paddingTop: 0,
      textAlignVertical: multiline ? 'top' : 'center',
    };
  },
}));
