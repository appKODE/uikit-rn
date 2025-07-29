import { type ReactNode, useEffect, useState } from 'react';
import { type StyleProp, type ViewStyle } from 'react-native';

import Animated, {
  Easing,
  interpolate,
  runOnJS,
  useAnimatedStyle,
  useDerivedValue,
  useSharedValue,
  withDelay,
  withTiming,
} from 'react-native-reanimated';

import { NON_SCALE_INTERPOLATOR } from './constants';

export type FadeTransitionProps = {
  children: ReactNode;
  /**
   * delay before starting animation
   */
  delay?: number;
  /**
   * duration of animation
   */
  duration?: number;
  /**
   * custom scale interpolation
   *
   * @default not scale outputRange: [1, 1]
   */
  scaleInterpolate?: {
    inputRange: number[];
    outputRange: number[];
  };
  show: boolean;
  style?: StyleProp<ViewStyle>;
  /**
   * behavior of unmount component when children will be faded
   *
   * `children` - unmount only children (the animated container will remain shown)
   *
   * `full` - unmount full component
   */
  unmountWhenFade?: 'children' | 'full';
};

export const FadeTransition = ({
  children,
  delay = 0,
  duration = 150,
  scaleInterpolate = NON_SCALE_INTERPOLATOR,
  show,
  style,
  unmountWhenFade,
}: FadeTransitionProps) => {
  const [visible, setVisible] = useState(show);
  const progress = useSharedValue(Number(show));

  useEffect(() => {
    if (show) {
      setVisible(true);
    }
    progress.value = withDelay(
      delay,
      withTiming(
        Number(show),
        {
          duration,
          easing: Easing.ease,
        },
        (result) => {
          if (!show && result) {
            runOnJS(setVisible)(false);
          }
        }
      )
    );
  }, [show, duration, delay, progress]);

  const inputRange = scaleInterpolate?.inputRange ?? [0, 1];
  const outputRange = scaleInterpolate?.outputRange ?? [0, 1];

  const scale = useDerivedValue(() => {
    return interpolate(progress.value, inputRange, outputRange);
  }, [inputRange, outputRange]);

  const styles = useAnimatedStyle(
    () => ({
      opacity: progress.value,
      transform: [
        {
          scale: scale.value,
        },
      ],
    }),
    [scale]
  );

  if (!visible && unmountWhenFade === 'full') {
    return null;
  }

  return (
    <Animated.View style={[styles, style]}>
      {!unmountWhenFade || visible ? children : null}
    </Animated.View>
  );
};
