import { View } from 'react-native';

import { StyleSheet } from 'react-native-unistyles';

import type { IconProps, TextColorKeys, IconColorKeys } from '../../types';

import { Typography } from '../../primitives';
import type { FC } from 'react';

export type EmptyStateProps = {
  titleText: string;
  iconInstance?: FC<IconProps>;
  messageText?: string;
  iconSize?: number;
  iconColor?: IconColorKeys;
  titleColor?: TextColorKeys;
  messageColor?: TextColorKeys;
};

export const EmptyState = ({
  messageText,
  titleText,
  iconInstance: Icon,
  messageColor = 'textTertiary',
  titleColor = 'textTertiary',
  iconColor = 'iconQuaternary',
  iconSize = 56,
}: EmptyStateProps) => {
  return (
    <View style={styles.container}>
      {Icon ? (
        <View>
          <Icon color={iconColor} size={iconSize} />
        </View>
      ) : null}

      <View style={styles.wrapper}>
        <Typography color={titleColor} textAlign="center" variant="headline5">
          {titleText}
        </Typography>

        {messageText ? (
          <Typography color={messageColor} textAlign="center" variant="body2">
            {messageText}
          </Typography>
        ) : null}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    gap: 32,
  },
  wrapper: {
    justifyContent: 'center',
    alignItems: 'center',
    gap: 12,
  },
});
