import { type ReactElement } from 'react';
import { type StyleProp, type ViewStyle } from 'react-native';

import { StyleSheet } from 'react-native-unistyles';

import type { IconProps } from '../../types';

import { useTheme } from '../../hooks';
import { renderWithProps } from '../../utils';
import { SwitchTransition, Touchable } from '../../primitives';
import { getIconColor } from './utils/get-icon-color';

export type RadioProps = {
  disabled?: boolean;
  iconChecked: ReactElement<IconProps>;
  iconEmpty: ReactElement<IconProps>;
  style?: StyleProp<ViewStyle>;
  isError?: boolean;
  isChecked: boolean;
  onPress: (isChecked: boolean) => void;
};

export const Radio = ({
  disabled,
  iconChecked,
  iconEmpty,
  style,
  isChecked,
  isError,
  onPress,
}: RadioProps) => {
  const theme = useTheme();

  const iconColor = getIconColor({
    isChecked,
    isError,
    isDisabled: disabled,
  });

  const rippleColor = theme.palette.all[iconColor];

  return (
    <Touchable
      disabled={disabled}
      hitSlop={theme.components.radio.hitSlop}
      rippleColor={rippleColor}
      rippleRadius={theme.components.radio.rippleRadius}
      style={[styles.container(disabled), style]}
      isRippleBorderless
      onPress={() => onPress(isChecked)}
    >
      <SwitchTransition active={isChecked ? 1 : 0} interpolateOpacity={0.4}>
        {renderWithProps<IconProps>(iconEmpty, {
          color: iconColor,
          size: theme.components.radio.iconSize,
        })}

        {renderWithProps<IconProps>(iconChecked, {
          color: iconColor,
          size: theme.components.radio.iconSize,
        })}
      </SwitchTransition>
    </Touchable>
  );
};

const styles = StyleSheet.create({
  container: (disabled?: boolean) => ({
    alignSelf: 'flex-start',
    opacity: disabled ? 0.4 : 1,
  }),
});
