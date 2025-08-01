import { Typography } from '@kode-frontend/uikit-rn/primitives';
import { StyleSheet } from '@kode-frontend/uikit-rn';
import { View } from 'react-native';

type TAppPreviewProps = {};

export const AppPreview = ({}: TAppPreviewProps) => {
  return (
    <View style={styles.root}>
      <Typography variant="headline1">KODE UI</Typography>

      <Typography variant="subhead1" color="textTertiary">
        React Native реализация
      </Typography>
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
    gap: 16,
    padding: 16,
  },
});
