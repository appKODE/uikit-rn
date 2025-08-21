import { View, type ViewProps } from 'react-native';

import { StyleSheet } from 'react-native-unistyles';

export type PageListFooterProps = ViewProps;

export const PageListFooter = ({ style, ...rest }: PageListFooterProps) => {
  return <View {...rest} style={[styles.footer, style]} />;
};

const styles = StyleSheet.create((theme) => ({
  footer: {
    paddingHorizontal: theme.components.page.paddingHorizontal,
  },
}));
