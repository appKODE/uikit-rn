import { type ReactElement } from 'react';

import { type IconProps } from '../../types';
import { StyleSheet } from 'react-native-unistyles';

import { Button, type ButtonProps } from './button';

export type IconButtonProps = Omit<
  ButtonProps,
  'leadingIcon' | 'trailingIcon'
> & {
  children: ReactElement<IconProps>;
};

export const IconButton = (rest: IconButtonProps) => {
  styles.useVariants({
    size: rest.size ?? 'large',
  });

  return (
    <Button
      {...rest}
      leadingAddon={null}
      style={[styles.button, rest.style]}
      testID={rest.testID ?? 'icon-button'}
      trailingAddon={null}
    />
  );
};

const styles = StyleSheet.create({
  button: {
    variants: {
      size: {
        large: {
          height: 56,
          width: 56,
        },
        medium: {
          height: 44,
          width: 44,
        },
      },
    },
  },
});
