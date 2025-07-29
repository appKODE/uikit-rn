import { Keyframe } from 'react-native-reanimated';

export const NON_SCALE_INTERPOLATOR = {
  inputRange: [0, 1],
  outputRange: [1, 1],
};

export const LIGHT_SCALE_INTERPOLATOR = {
  inputRange: [0, 1],
  outputRange: [0.8, 1],
};

export const DEFAULT_DURATION = 150;

export const DEFAULT_MOUNT_KEYFRAME = new Keyframe({
  0: {
    opacity: 0,
    transform: [{ scale: 0.7 }],
  },
  100: {
    opacity: 1,
    transform: [{ scale: 1 }],
  },
}).duration(DEFAULT_DURATION);

export const DEFAULT_UNMOUNT_KEYFRAME = new Keyframe({
  0: {
    opacity: 1,
    transform: [{ scale: 1 }],
  },
  100: {
    opacity: 0,
    transform: [{ scale: 0.7 }],
  },
}).duration(DEFAULT_DURATION);
