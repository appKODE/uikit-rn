import {
  ActivityIndicator as ActivityIndicatorBase,
  type ActivityIndicatorProps as ActivityIndicatorPropsBase,
} from 'react-native';

import { useTheme } from '../hooks';
import { type IconColorFullKeys } from '../types';

export type ActivityIndicatorProps = ActivityIndicatorPropsBase & {
  color?: IconColorFullKeys;
};

export const ActivityIndicator = ({
  color,
  ...rest
}: ActivityIndicatorProps) => {
  const theme = useTheme();

  const tint = color
    ? theme.palette.all[color]
    : theme.palette.icon.iconQuaternary;

  return <ActivityIndicatorBase {...rest} color={tint} />;
};
