import { View, type ViewProps } from 'react-native';

import { StyleSheet } from 'react-native-unistyles';

export type PageFooterProps = ViewProps;

export const PageFooter = ({ style, ...rest }: PageFooterProps) => {
  return <View {...rest} style={[styles.footer, style]} />;
};

const styles = StyleSheet.create((theme) => ({
  footer: {
    paddingBottom: theme.components.page.paddingVertical,
    paddingHorizontal: theme.components.page.paddingHorizontal,
  },
}));
