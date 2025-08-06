import {
  type ReactNode,
  useCallback,
  useEffect,
  useLayoutEffect,
  useState,
} from 'react';

import { type ISnack, type SnackData } from './types';
import { useSnacks } from './use-snacks';
import { View } from 'react-native';
import { StyleSheet } from 'react-native-unistyles';
import { generateId } from '../../utils';

type TSnackbarProps = {
  /**
   * Render snack
   */
  render: (props: { snack: SnackData; onRelease: () => void }) => ReactNode;
  children?: ReactNode;
};

type SnackInterface = {
  show: (snack: ISnack) => string;
  cancel: (id: string) => void;
  cancelAll: () => void;
};

export const Snack: SnackInterface = {
  show: () => {
    throw new Error('Wrap application with <Snackbar> component');
  },
  cancel: () => {
    throw new Error('Wrap application with <Snackbar> component');
  },
  cancelAll: () => {
    throw new Error('Wrap application with <Snackbar> component');
  },
} as const;

export const Snackbar = ({ render, children }: TSnackbarProps) => {
  const { snacks, shift, cancel, add, cancelAll } = useSnacks();
  const [snack, setSnack] = useState<SnackData | null>(null);

  const onRelease = useCallback(() => {
    if (snack) {
      shift();
    }
    setSnack(null);
  }, [snack, shift]);

  const interaction = useCallback(() => {
    if (snack?.payload?.hideAfterInteraction) {
      cancel(snack.id);
    }
  }, [snack, cancel]);

  useEffect(() => {
    const snackHasChanges = snack && snacks.at(0)?.id === snack?.id;

    const hasNewSnack = snacks.length > 0 && !snack;

    if (hasNewSnack || snackHasChanges) {
      setSnack(snacks.at(0) ?? null);
    }
  }, [snacks, snack]);

  useLayoutEffect(() => {
    Snack.show = (payload: ISnack) => {
      const id = generateId();
      add(id, payload);
      return id;
    };

    Snack.cancel = (id: string) => cancel(id);
    Snack.cancelAll = () => cancelAll();
  }, [add, cancel, cancelAll]);

  return (
    <>
      <View style={styles.container} onTouchStart={interaction}>
        {children}
      </View>

      {snack ? render({ snack, onRelease }) : null}
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
