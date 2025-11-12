import { type ReactElement } from 'react';
import {
  type TypographyColorKeys,
  type IconColorKeys,
  type BorderColorKeys,
} from '../../types';

export type TabProps = {
  id: string;
  labelText: string;
  isSelected?: boolean;
  isDisabled?: boolean;
  leadingAddon?: ReactElement;
  trailingAddon?: ReactElement;
  height?: number;
  textColor?: TypographyColorKeys;
  textDisabledColor?: TypographyColorKeys;
  iconColor?: IconColorKeys;
};

export type TabGroupProps = {
  dividerColor?: BorderColorKeys;
  indicatorColor?: IconColorKeys;
  indicatorHeight?: number;
};
