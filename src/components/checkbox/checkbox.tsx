import { type ReactElement } from 'react';
import { type StyleProp, type ViewStyle } from 'react-native';

import { StyleSheet } from 'react-native-unistyles';

import type { IconProps } from '../../types';
import type { CheckboxType } from './types';

import { useTheme } from '../../hooks';
import { renderWithProps } from '../../utils';
import { SwitchTransition, Touchable } from '../../primitives';
import { getIconColor } from './lib/get-icon-color';

const mapTypeToActiveNumber: Record<CheckboxType, number> = {
  indeterminate: 2,
  selected: 1,
  unselected: 0,
};

export type CheckboxProps = {
  disabled?: boolean;
  iconIndeterminate?: ReactElement<IconProps>;
  iconSelected: ReactElement<IconProps>;
  iconUnselected: ReactElement<IconProps>;
  style?: StyleProp<ViewStyle>;
  type: CheckboxType;
  isError?: boolean;
  onPress: (type: CheckboxType) => void;
};

export const Checkbox = ({
  disabled,
  iconIndeterminate,
  iconSelected,
  iconUnselected,
  style,
  type,
  isError,
  onPress,
}: CheckboxProps) => {
  const theme = useTheme();

  const iconColor = getIconColor({
    type,
    isError,
  });

  const rippleColor = theme.palette.all[iconColor];

  return (
    <Touchable
      disabled={disabled}
      hitSlop={theme.components.checkbox.hitSlop}
      rippleColor={rippleColor}
      rippleRadius={theme.components.checkbox.rippleRadius}
      style={[styles.container(disabled), style]}
      isRippleBorderless
      onPress={() => onPress(type)}
    >
      <SwitchTransition
        active={mapTypeToActiveNumber[type]}
        interpolateOpacity={0.4}
      >
        {renderWithProps<IconProps>(iconUnselected, {
          color: iconColor,
          size: theme.components.checkbox.iconSize,
        })}

        {renderWithProps<IconProps>(iconSelected, {
          color: iconColor,
          size: theme.components.checkbox.iconSize,
        })}

        {renderWithProps<IconProps>(iconIndeterminate, {
          color: iconColor,
          size: theme.components.checkbox.iconSize,
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
