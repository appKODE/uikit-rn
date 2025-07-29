import {
  RefreshControl as RefreshControlBase,
  type RefreshControlProps as RefreshControlPropsBase,
} from 'react-native';

import { useTheme } from '../hooks';
import { type IconColorKeys } from '../types';

export type RefetchControlProps = RefreshControlPropsBase & {
  color?: IconColorKeys;
};

export const RefreshControl = ({ color, ...rest }: RefetchControlProps) => {
  const theme = useTheme();

  const tint = color
    ? theme.palette.all[color]
    : theme.palette.icon.iconQuaternary;

  return <RefreshControlBase colors={[tint]} tintColor={tint} {...rest} />;
};
