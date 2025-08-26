import { useEffect } from 'react';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import { DEFAULT_DURATION } from '../../primitives/transitions';
import { ActivityIndicator } from '../../primitives/activity-indicator';
import type { IconColorFullKeys } from '../../types';
import { StyleSheet } from 'react-native-unistyles';

type Props = {
  iconColor: IconColorFullKeys;
  isLoading: boolean;
};

export const ButtonLoader = ({ iconColor, isLoading }: Props) => {
  const progress = useSharedValue(0);

  useEffect(() => {
    progress.value = withTiming(isLoading ? 1 : 0, {
      duration: DEFAULT_DURATION,
    });
  }, [isLoading, progress]);

  const animatedStyle = useAnimatedStyle(() => ({
    opacity: progress.value,
    transform: [{ scale: 0.7 + 0.3 * progress.value }],
  }));

  return (
    <Animated.View style={[styles.loader, animatedStyle]}>
      <ActivityIndicator animating={isLoading} color={iconColor} />
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  loader: {
    ...StyleSheet.absoluteFillObject,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
