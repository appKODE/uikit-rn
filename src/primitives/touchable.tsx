import { useCallback } from 'react';
import {
  type GestureResponderEvent,
  Platform,
  Pressable as PressableBase,
  type PressableProps,
} from 'react-native';

import Animated, {
  Easing,
  Extrapolation,
  interpolate,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';

import { useTheme } from '../hooks';
import { getHexWithOpacity } from '../lib';

export type TouchableProps = PressableProps & {
  rippleColor?: string;
  rippleRadius?: number;
  isRippleBorderless?: boolean;
};

const Pressable = Animated.createAnimatedComponent(PressableBase);

export const Touchable = ({
  rippleColor,
  rippleRadius,
  style,
  isRippleBorderless,
  onPressIn,
  onPressOut,
  ...rest
}: TouchableProps) => {
  const theme = useTheme();
  const pressed = useSharedValue(0);

  const onPressInDecorator = useCallback(
    (event: GestureResponderEvent) => {
      if (Platform.OS === 'ios') {
        pressed.value = withTiming(1, { duration: 150 });
      }

      if (onPressIn) {
        onPressIn(event);
      }
    },
    [pressed, onPressIn]
  );

  const onPressOutDecorator = useCallback(
    (event: GestureResponderEvent) => {
      if (Platform.OS === 'ios') {
        pressed.value = withTiming(0, { duration: 250, easing: Easing.ease });
      }

      if (onPressOut) {
        onPressOut(event);
      }
    },
    [pressed, onPressOut]
  );

  const animatedStyles = useAnimatedStyle(() => {
    return {
      opacity: interpolate(
        pressed.value,
        [0, 1],
        [1, 0.4],
        Extrapolation.CLAMP
      ),
    };
  });

  return (
    <Pressable
      android_ripple={{
        borderless: isRippleBorderless,
        color: getHexWithOpacity(
          rippleColor ?? theme.palette.text.textPrimary,
          20
        ),
        foreground: true,
        radius: rippleRadius,
      }}
      onPressIn={onPressInDecorator}
      onPressOut={onPressOutDecorator}
      {...rest}
      style={[animatedStyles, style]}
    />
  );
};
