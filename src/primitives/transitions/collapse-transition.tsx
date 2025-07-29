import { type ReactNode, useCallback, useEffect, useState } from 'react';
import {
  type LayoutChangeEvent,
  type StyleProp,
  View,
  type ViewStyle,
} from 'react-native';

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
import { StyleSheet } from 'react-native-unistyles';

export type CollapseTransitionProps = {
  children: ReactNode;
  collapsed: boolean;
  /**
   * delay before starting animation
   */
  delay?: number;
  /**
   * duration of animation
   */
  duration?: number;
  /**
   * horizontal direction for collapsing
   *
   * @default false (vertical)
   */
  horizontal?: boolean;
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

export const CollapseTransition = ({
  children,
  collapsed,
  delay = 0,
  duration = 150,
  horizontal,
  style,
  unmountWhenFade,
}: CollapseTransitionProps) => {
  const condition = !collapsed;

  styles.useVariants({
    direction: horizontal ? 'horizontal' : 'vertical',
  });

  const [visible, setVisible] = useState(condition);
  const [height, setHeight] = useState<null | number>(null);
  const [width, setWidth] = useState<null | number>(null);
  const progress = useSharedValue(Number(condition));

  useEffect(() => {
    if (condition) {
      setVisible(true);
    }
    progress.value = withDelay(
      delay,
      withTiming(
        Number(condition),
        {
          duration,
          easing: Easing.ease,
        },
        (result) => {
          if (!condition && result) {
            runOnJS(setVisible)(false);
          }
        }
      )
    );
  }, [condition, duration, delay, progress]);

  const heightAnimate = useDerivedValue(() => {
    return interpolate(progress.value, [0, 1], [0, height ?? 0]);
  }, [height]);

  const widthAnimate = useDerivedValue(() => {
    return interpolate(progress.value, [0, 1], [0, width ?? 0]);
  }, [height]);

  const rootAnimatedStyles = useAnimatedStyle(() => {
    const animatedStyles: ViewStyle = horizontal
      ? { width: width === null ? 'auto' : widthAnimate.value }
      : { height: height === null ? 'auto' : heightAnimate.value };

    return {
      opacity: progress.value,
      overflow: 'hidden',
      ...animatedStyles,
    };
  }, [heightAnimate, height, width, horizontal]);

  const layoutHandle = useCallback(({ nativeEvent }: LayoutChangeEvent) => {
    setHeight(nativeEvent.layout.height);
    setWidth(nativeEvent.layout.width);
  }, []);

  if (!visible && unmountWhenFade === 'full') {
    return null;
  }

  return (
    <Animated.View style={[rootAnimatedStyles, style]}>
      <View style={styles.content} onLayout={layoutHandle}>
        {!unmountWhenFade || visible ? children : null}
      </View>
    </Animated.View>
  );
};

const styles = StyleSheet.create(() => ({
  content: {
    position: 'absolute',
    variants: {
      direction: {
        horizontal: {
          height: '100%',
        },
        vertical: {
          left: 0,
          right: 0,
        },
      },
    },
  },
}));
