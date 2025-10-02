import { View, type ViewProps } from 'react-native';

import { StyleSheet } from 'react-native-unistyles';
import { useBottomInsets } from '../../hooks';

export type PageFooterProps = ViewProps;

export const PageFooter = ({ style, ...rest }: PageFooterProps) => {
  const bottomInsets = useBottomInsets();

  return <View {...rest} style={[styles.footer(bottomInsets), style]} />;
};

const styles = StyleSheet.create((theme) => ({
  footer: (bottomInsets: number) => ({
    paddingBottom: theme.components.page.paddingVertical + bottomInsets,
    paddingHorizontal: theme.components.page.paddingHorizontal,
  }),
}));
