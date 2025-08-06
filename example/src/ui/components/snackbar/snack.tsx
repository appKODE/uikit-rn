import {
  SnackAnimations,
  SnackLayout,
  type ISnack,
} from '@kode-frontend/uikit-rn/components';
import { StyleSheet } from 'react-native-unistyles';
import { View } from 'react-native';
import { Typography } from '@kode-frontend/uikit-rn/primitives';
import { PlaceholderIcon } from '../../icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export type SnackProps = ISnack & {
  onRelease: () => void;
};

export const Snack = ({ message, type, anchor, ...snack }: SnackProps) => {
  styles.useVariants({
    type,
  });

  const inset = useSafeAreaInsets();

  const insetOffset = anchor === 'top' ? inset.top : inset.bottom;
  const insetBottom = snack.offset !== undefined ? 0 : insetOffset;

  const offset = insetBottom + (snack.offset ?? 0);

  return (
    <SnackLayout
      {...snack}
      animation={
        anchor === 'top' ? SnackAnimations.translateY : SnackAnimations.fade
      }
      offset={offset}
      anchor={anchor}
    >
      <View style={styles.content}>
        <PlaceholderIcon
          size={20}
          color={type === 'negative' ? 'iconOnNegative' : 'iconContrastPrimary'}
        />
        <Typography
          variant="body2"
          color={type === 'negative' ? 'textOnNegative' : 'textContrastPrimary'}
        >
          {message}
        </Typography>
      </View>
    </SnackLayout>
  );
};

const styles = StyleSheet.create((theme) => ({
  content: {
    variants: {
      type: {
        regular: {
          backgroundColor: theme.palette.surface.layerContrast,
        },
        negative: {
          backgroundColor: theme.palette.surface.layerNegative,
        },
      },
    },
    paddingHorizontal: 16,
    paddingVertical: 14,
    gap: 8,
    flexDirection: 'row',
    borderRadius: 12,
    alignItems: 'center',
  },
}));
