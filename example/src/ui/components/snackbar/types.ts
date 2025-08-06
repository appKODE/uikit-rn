import { type ISnack } from '@kode-frontend/uikit-rn/components';

export type SnackProps = ISnack & {
  message: string;
  withIcon?: boolean;
  offset?: number;
  anchor?: 'top' | 'bottom';
  onPress?: () => void;
};
