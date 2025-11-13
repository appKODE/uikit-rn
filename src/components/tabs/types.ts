import { type ReactElement } from 'react';
import {
  type TypographyColorKeys,
  type IconColorKeys,
  type BorderColorKeys,
} from '../../types';
import { type StyleProp, type ViewStyle } from 'react-native';

export type TabProps = {
  id: string;
  labelText: string;
  isSelected?: boolean;
  isDisabled?: boolean;
  leadingAddon?: ReactElement;
  trailingAddon?: ReactElement;
  tabStyles?: StyleProp<ViewStyle>;
  textColor?: TypographyColorKeys;
  textDisabledColor?: TypographyColorKeys;
  iconColor?: IconColorKeys;
};

export type TabGroupProps = {
  dividerColor?: BorderColorKeys;
  indicatorStyles?: StyleProp<ViewStyle>;
};
