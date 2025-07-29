import { type ReactElement } from 'react';
import { View, type ViewProps } from 'react-native';

import { StyleSheet } from 'react-native-unistyles';

import type { IconProps } from '../../types';

import { renderWithProps } from '../../lib';
import { Touchable } from '../../primitives';
import { Divider } from '../divider';

type ContainerStyleParams = {
  gap?: number;
  paddingHorizontal?: number;
  paddingVertical?: number;
};

export type CellProps = ViewProps &
  ContainerStyleParams & {
    disabled?: boolean;
    divider?: boolean;
    leadingContent: ReactElement;
    rightIcon?: ReactElement<IconProps>;
    trailingContent?: ReactElement;
    onPress?: () => void;
  };

export const Cell = ({
  disabled,
  divider = true,
  gap,
  leadingContent,
  paddingHorizontal,
  paddingVertical,
  rightIcon,
  trailingContent,
  onPress,
  ...rest
}: CellProps) => {
  const containerStyles = styles.container({
    gap,
    paddingHorizontal,
    paddingVertical,
  });

  return (
    <Touchable
      disabled={disabled || !onPress}
      style={styles.disabled(disabled)}
      onPress={onPress}
    >
      <View style={containerStyles} {...rest}>
        {leadingContent}
        {trailingContent}
        {renderWithProps(rightIcon)}
      </View>

      {divider ? <Divider /> : null}
    </Touchable>
  );
};

const styles = StyleSheet.create({
  container: ({
    gap = 12,
    paddingHorizontal = 16,
    paddingVertical = 12,
  }: ContainerStyleParams) => ({
    alignItems: 'center',
    flexDirection: 'row',
    gap,
    justifyContent: 'space-between',
    paddingHorizontal,
    paddingVertical,
  }),
  disabled: (disabled?: boolean) => ({
    opacity: disabled ? 0.4 : 1,
  }),
});
