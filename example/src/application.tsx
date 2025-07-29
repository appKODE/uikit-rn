import { View } from 'react-native';
import { StyleSheet } from '@kode-frontend/uikit-rn';
import { Typography } from '@kode-frontend/uikit-rn/primitives';

export default function App() {
  return (
    <View style={styles.container}>
      <Typography variant="headline1">Hello UI Kit</Typography>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
