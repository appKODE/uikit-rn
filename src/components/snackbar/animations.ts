import { Dimensions } from 'react-native';
import { interpolate } from 'react-native-reanimated';
import { SnackState, type SnackAnimation } from './types';

const DEFAULT_HIDDEN_POSITION = Dimensions.get('window').height;

export const translateYAnimation: SnackAnimation = (
  transition,
  { height, anchor, offset }
) => {
  'worklet';
  const hiddenPositionY = height;
  const translateY =
    anchor === 'bottom'
      ? interpolate(
          transition.value,
          [SnackState.hide, SnackState.show],
          [hiddenPositionY ?? -DEFAULT_HIDDEN_POSITION, -offset]
        )
      : interpolate(
          transition.value,
          [SnackState.hide, SnackState.show],
          [
            hiddenPositionY ? -hiddenPositionY : -DEFAULT_HIDDEN_POSITION,
            offset,
          ]
        );

  return {
    transform: [
      {
        translateY,
      },
    ],
  };
};

export const fadeAnimation: SnackAnimation = (
  transition,
  { anchor, offset }
) => {
  'worklet';

  return {
    opacity: transition.value,
    transform: [
      {
        translateY: anchor === 'bottom' ? -offset : offset,
      },
      {
        scale: interpolate(
          transition.value,
          [SnackState.hide, SnackState.show],
          [0.8, 1]
        ),
      },
    ],
  };
};
