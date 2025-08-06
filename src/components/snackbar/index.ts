import { fadeAnimation, translateYAnimation } from './animations';

export { Snackbar, Snack } from './snackbar';
export { SnackLayout, type SnackLayoutProps } from './snack-layout';
export type {
  SnackData,
  ISnack,
  SnackState,
  SnackAnimation,
  SnackAnimationProps,
} from './types';

export const SnackAnimations = {
  translateY: translateYAnimation,
  fade: fadeAnimation,
};
