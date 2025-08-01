import { View } from 'react-native';

import { StyleSheet } from 'react-native-unistyles';

import { Typography } from '../../primitives';

export type PageHeaderProps = {
  subtitle?: string;
  title?: string;
};

export const PageHeader = ({ subtitle, title }: PageHeaderProps) => {
  return (
    <View style={styles.header}>
      {title ? <Typography variant={'headline5'}>{title}</Typography> : null}

      {subtitle ? (
        <Typography color={'textTertiary'} variant={'body2'}>
          {subtitle}
        </Typography>
      ) : null}
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    gap: 8,
    marginBottom: 8,
  },
});
