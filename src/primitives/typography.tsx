import { Text, type TextProps, type TextStyle } from 'react-native';

import { StyleSheet } from 'react-native-unistyles';

import type { TypographyColorKeys, TypographyVariants } from '../types';

export type TypographyProps = TextProps & {
  color?: TypographyColorKeys;
  textAlign?: TextStyle['textAlign'];
  variant?: TypographyVariants;
};

export const Typography = ({
  color = 'textPrimary',
  style,
  textAlign,
  variant = 'body1',
  ...rest
}: TypographyProps) => {
  return (
    <Text
      style={[styles.typography(variant, color), { textAlign }, style]}
      {...rest}
    />
  );
};

const styles = StyleSheet.create((theme) => ({
  typography: (variant: TypographyVariants, color: TypographyColorKeys) => ({
    color: theme.palette.all[color],
    ...theme.typography[variant],
  }),
}));
