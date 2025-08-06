import type { ViewStyle } from 'react-native';
import { type SharedValue } from 'react-native-reanimated';

export type SnackData = {
  id: string;
  payload: ISnack;
};

export interface ISnack {
  /**
   * Notification type
   */
  type: 'regular' | 'negative';
  /**
   * Cancel notification after interaction (touch any place on screen)
   */
  hideAfterInteraction?: boolean;
  /**
   * timeout in ms
   */
  duration?: number;
  /**
   * Message for notification
   */
  message?: string;
  /**
   * Place notification. @warning Don't override it!
   */
  anchor?: 'top' | 'bottom';
  /**
   * OffsetY for notification
   */
  offset?: number;
  /**
   * Notification press handler
   */
  onPress?: () => void;
}

export enum SnackState {
  hide = 0,
  show = 1,
}

export type SnackAnimationProps = {
  /**
   * Height of snack
   */
  height: number | null;
  /**
   * Extra offsetY
   */
  offset: number;
  /**
   * Snack placement
   */
  anchor: ISnack['anchor'];
};

export type SnackAnimation = (
  /**
   * Animation value of showing snack. 0 - hide, 1 - show
   */
  transition: SharedValue<number>,
  props: SnackAnimationProps
) => ViewStyle;
