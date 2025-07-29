import { type ReactElement } from 'react';
import { View, type ViewProps } from 'react-native';

import { StyleSheet } from 'react-native-unistyles';

import type { BorderColorKeys, IconProps, TextColorKeys } from '../../types';

import { renderWithProps } from '../../lib';
import { Typography } from '../../primitives';

type OffsetStyleParams = {
  leftOffset?: number;
  rightOffset?: number;
};

type DividerStyleParams = {
  dividerColor?: BorderColorKeys;
  dividerHeight?: number;
};

type SingleDividerStyleParams = OffsetStyleParams & DividerStyleParams;

export type DividerProps = ViewProps &
  OffsetStyleParams &
  DividerStyleParams & {
    dividerText?: string;
    icon?: ReactElement<IconProps>;
    textColor?: TextColorKeys;
  };

export const Divider = ({
  dividerColor,
  dividerHeight,
  dividerText,
  icon,
  leftOffset,
  rightOffset,
  style,
  textColor,
  ...rest
}: DividerProps) => {
  const containerStyles = styles.container({
    leftOffset,
    rightOffset,
  });

  const splitDividerStyles = styles.splitDivider({
    dividerColor,
    dividerHeight,
  });

  const singleDividerStyles = styles.singleDivider({
    dividerColor,
    dividerHeight,
    leftOffset,
    rightOffset,
  });

  if (dividerText || icon) {
    return (
      <View {...rest} style={[containerStyles, style]}>
        <View style={splitDividerStyles} />

        {dividerText ? (
          <Typography
            color={textColor || 'textQuaternary'}
            style={styles.text}
            variant={'caption1'}
          >
            {dividerText}
          </Typography>
        ) : icon ? (
          renderWithProps(icon)
        ) : null}

        <View style={splitDividerStyles} />
      </View>
    );
  }

  return <View style={[singleDividerStyles, style]} />;
};

const styles = StyleSheet.create((theme) => ({
  container: ({ leftOffset, rightOffset }: OffsetStyleParams) => ({
    alignItems: 'center',
    flexDirection: 'row',
    gap: 12,
    marginLeft: leftOffset,
    marginRight: rightOffset,
  }),
  singleDivider: ({
    dividerColor,
    dividerHeight,
    leftOffset,
    rightOffset,
  }: SingleDividerStyleParams) => ({
    backgroundColor: theme.palette.border[dividerColor || 'borderRegular'],
    flex: 1,
    height: dividerHeight || 1,
    marginLeft: leftOffset,
    marginRight: rightOffset,
  }),
  splitDivider: ({ dividerColor, dividerHeight }: DividerStyleParams) => ({
    backgroundColor: theme.palette.border[dividerColor || 'borderRegular'],
    flex: 1,
    height: dividerHeight || 1,
    minWidth: 16,
  }),
  text: {
    flexShrink: 1,
    textAlign: 'center',
  },
}));
