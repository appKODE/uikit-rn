import { type ReactElement } from 'react';
import { View, type ViewProps } from 'react-native';

import { StyleSheet } from 'react-native-unistyles';

import type { IconProps } from '../../types';

import { renderWithProps } from '../../utils';
import { Touchable } from '../../primitives';
import { Divider, type DividerProps } from '../divider';

type ContainerStyleParams = {
  gap?: number;
  paddingHorizontal?: number;
  paddingVertical?: number;
};

const DEFAULT_PADDING_HORIZONTAL = 16;

export type CellProps = Pick<DividerProps, 'leftOffset'> &
  ViewProps &
  ContainerStyleParams & {
    disabled?: boolean;
    divider?: boolean;
    leadingContent: ReactElement;
    rightIcon?: ReactElement<IconProps>;
    trailingContent?: ReactElement;
    onPress?: () => void;
    delayLongPress?: number;
    onLongPress?: () => void;
  };

export const Cell = ({
  disabled,
  divider = true,
  gap,
  leadingContent,
  leftOffset = DEFAULT_PADDING_HORIZONTAL,
  paddingHorizontal,
  paddingVertical,
  rightIcon,
  style,
  trailingContent,
  onPress,
  delayLongPress,
  onLongPress,
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
      onLongPress={onLongPress}
      delayLongPress={delayLongPress}
    >
      <View style={[containerStyles, style]} {...rest}>
        {leadingContent}
        {trailingContent}
        {renderWithProps(rightIcon)}
      </View>

      {divider ? <Divider leftOffset={leftOffset} /> : null}
    </Touchable>
  );
};

const styles = StyleSheet.create({
  container: ({
    gap = 12,
    paddingHorizontal = DEFAULT_PADDING_HORIZONTAL,
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
