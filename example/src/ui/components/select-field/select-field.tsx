import { useCallback } from 'react';
import { type ListRenderItem, View } from 'react-native';

import {
  Cell,
  IconButton,
  SelectField as SelectFieldBase,
  type SelectFieldProps as SelectFieldBaseProps,
} from '@kode-frontend/uikit-rn/components';
import {
  CollapseTransition,
  FadeTransition,
  Typography,
} from '@kode-frontend/uikit-rn/primitives';
import { StyleSheet } from 'react-native-unistyles';

import { AlertHexagon, Delete } from '../../icons';

export type SelectFieldProps<T> = SelectFieldBaseProps<T> & {
  withCleanButton?: boolean;
  onCleanItem?: () => void;
  onSelectItem: (item: T) => void;
};

export const SelectField = <T extends string>({
  data,
  trailingAddon,
  withCleanButton = false,
  onCleanItem,
  onSelectItem,
  ...rest
}: SelectFieldProps<T>) => {
  const showCleanButton =
    withCleanButton && !rest.disabled && Boolean(rest.value);

  const renderItem: ListRenderItem<T> = useCallback(
    ({ index, item }) => {
      const isFirstItem = index === 0;
      const isLastItem = index === data.length - 1;

      return (
        <Cell
          divider={!isLastItem}
          leadingContent={<Typography>{item}</Typography>}
          style={styles.cell({ isFirstItem, isLastItem })}
        />
      );
    },
    [data.length]
  );

  return (
    <SelectFieldBase
      {...rest}
      data={data}
      renderItem={renderItem}
      trailingAddon={
        <View style={styles.trailingAddon}>
          <FadeTransition show={showCleanButton} unmountWhenFade={'full'}>
            <IconButton
              size={'medium'}
              style={styles.cleanButton}
              variant={'ghostNeutral'}
              onPress={onCleanItem}
            >
              <Delete size={24} />
            </IconButton>
          </FadeTransition>

          {trailingAddon}

          <CollapseTransition
            horizontal
            collapsed={!rest.error}
            unmountWhenFade={'full'}
          >
            <AlertHexagon color={'iconNegative'} size={24} />
          </CollapseTransition>
        </View>
      }
      onSelectItem={onSelectItem}
    />
  );
};

const styles = StyleSheet.create((theme) => ({
  cell: ({
    isFirstItem,
    isLastItem,
  }: {
    isFirstItem: boolean;
    isLastItem: boolean;
  }) => ({
    backgroundColor: theme.palette.surface.layer2,
    borderBottomLeftRadius: isLastItem ? 12 : 0,
    borderBottomRightRadius: isLastItem ? 12 : 0,
    borderTopLeftRadius: isFirstItem ? 12 : 0,
    borderTopRightRadius: isFirstItem ? 12 : 0,
    paddingHorizontal: theme.scale.width(12),
    paddingVertical: theme.scale.height(16),
  }),
  cleanButton: {
    borderRadius: 999,
    marginHorizontal: -10,
    marginVertical: -10,
  },
  trailingAddon: {
    flexDirection: 'row',
    gap: 8,
    minHeight: 24,
  },
}));
