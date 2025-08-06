import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type ReactNode,
} from 'react';
import {
  type LayoutChangeEvent,
  type StyleProp,
  type ViewStyle,
} from 'react-native';
import Animated, {
  Easing,
  runOnJS,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import { StyleSheet } from 'react-native-unistyles';

import { Touchable } from '@kode-frontend/uikit-rn/primitives';
import { usePrevious } from '../../hooks';
import { translateYAnimation } from './animations';
import { SnackState, type SnackAnimation } from './types';

export type SnackLayoutProps = {
  style?: StyleProp<ViewStyle>;
  /**
   * Timeout to close the snack (ms)
   * @default 3000
   */
  duration?: number;
  /**
   * Extra offset from top or bottom
   */
  offset?: number;
  /**
   * Snack position
   * @default top
   */
  anchor?: 'top' | 'bottom';
  /**
   * Animation duration to show the snack
   * @default 150
   */
  showAnimationDuration?: number;
  /**
   * Animation duration to hide the snack
   * @default 100
   */
  hideAnimationDuration?: number;
  children?: ReactNode;
  /**
   * Custom animation
   * @default translateY
   */
  animation?: SnackAnimation;
  /**
   * Press handler
   */
  onPress?: () => void;
  /**
   * Release handler. Called when the snack is closed
   */
  onRelease: () => void;
};

export const SnackLayout = ({
  anchor = 'top',
  offset = 0,
  style,
  duration: durationRaw = 3000,
  showAnimationDuration = 150,
  hideAnimationDuration = 100,
  children,
  animation = translateYAnimation,
  onRelease,
  onPress,
}: SnackLayoutProps) => {
  const [height, setHeight] = useState<number | null>(null);

  const transition = useSharedValue(SnackState.hide);

  const timeout = useRef<any>(null);
  const releaseRef = useRef(onRelease);
  releaseRef.current = onRelease;

  const duration =
    durationRaw === Infinity ? Number.MAX_SAFE_INTEGER : durationRaw;

  const prevDuration = usePrevious(duration, { initialValueAsPrevious: true });

  const onLayout = useCallback((e: LayoutChangeEvent) => {
    setHeight(e.nativeEvent.layout.height);
  }, []);

  const closeHandle = useCallback(() => {
    transition.value = withTiming(
      SnackState.hide,
      {
        duration: hideAnimationDuration,
        easing: Easing.ease,
      },
      (result) => {
        if (result) {
          runOnJS(releaseRef.current)();
        }
      }
    );
  }, [transition, hideAnimationDuration]);

  const pressHandle = useCallback(() => {
    if (onPress) {
      onPress();
      closeHandle();
    }
  }, [onPress, closeHandle]);

  const rootAnimatedStyles = useAnimatedStyle(() => {
    return animation(transition, {
      height,
      anchor,
      offset,
    });
  }, [height, offset, anchor, animation]);

  const runTimeout = useCallback(
    (timeoutMs: number) => {
      timeout.current = setTimeout(closeHandle, timeoutMs);
    },
    [closeHandle]
  );

  useEffect(() => {
    if (height !== null) {
      transition.value = withTiming(
        SnackState.show,
        {
          duration: showAnimationDuration,
          easing: Easing.ease,
        },
        (result) => {
          if (result) {
            runOnJS(runTimeout)(duration);
          }
        }
      );
    }
  }, [duration, runTimeout, transition, height, showAnimationDuration]);

  useEffect(() => {
    if (timeout.current !== null && prevDuration !== duration) {
      clearTimeout(timeout.current);
      runTimeout(duration);
    }
  }, [duration, prevDuration, runTimeout]);

  useEffect(() => {
    return () => {
      clearTimeout(timeout.current);
    };
  }, []);

  return (
    <Animated.View
      onLayout={onLayout}
      style={[styles.root(anchor), style, rootAnimatedStyles]}
    >
      <Touchable onPress={pressHandle}>{children}</Touchable>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  root: (anchor: SnackLayoutProps['anchor']) => ({
    position: 'absolute',
    left: 0,
    right: 0,
    [anchor ?? 'top']: 0,
    padding: 16,
  }),
});
