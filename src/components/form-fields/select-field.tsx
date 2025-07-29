import { useCallback, useRef, useState } from 'react';
import { type GestureResponderEvent, type ListRenderItem } from 'react-native';

import { StyleSheet } from 'react-native-unistyles';

import {
  BottomSheet,
  BottomSheetFlatList,
  type BottomSheetProps,
  type BottomSheetRef,
} from '../../layouts';
import { Touchable } from '../../primitives';
import { SelectBase, type SelectBaseProps } from './select-base';

export type SelectFieldProps<T> = SelectBaseProps &
  BottomSheetProps & {
    data: T[];
    renderItem: ListRenderItem<T>;
    onSelectItem: (item: T) => void;
  };

export const SelectField = <T,>({
  data,
  disabled = false,
  error,
  fieldContainerStyle,
  helperText,
  label,
  labelColor,
  labelVariant,
  leadingAddon,
  placeholder,
  placeholderTextColor,
  renderItem,
  style,
  trailingAddon,
  value,
  onPress,
  onSelectItem,
  ...rest
}: SelectFieldProps<T>) => {
  const [isFocused, setIsFocused] = useState(false);

  const bottomSheetRef = useRef<BottomSheetRef>(null);

  const onFieldPress = useCallback(
    (e: GestureResponderEvent) => {
      setIsFocused(true);
      bottomSheetRef.current?.openBottomSheetModal();
      onPress?.(e);
    },
    [onPress]
  );

  const onModalDismiss = useCallback(() => {
    setIsFocused(false);
    rest.onDismiss?.();
  }, [rest]);

  return (
    <SelectBase
      disabled={disabled}
      error={error}
      fieldContainerStyle={fieldContainerStyle}
      helperText={helperText}
      label={label}
      labelColor={labelColor}
      labelVariant={labelVariant}
      leadingAddon={leadingAddon}
      placeholder={placeholder}
      placeholderTextColor={placeholderTextColor}
      style={style}
      trailingAddon={trailingAddon}
      value={value}
      isFocused={isFocused}
      onPress={onFieldPress}
    >
      <BottomSheet {...rest} ref={bottomSheetRef} onDismiss={onModalDismiss}>
        <BottomSheetFlatList
          contentContainerStyle={styles.listContainer}
          data={data}
          keyExtractor={(_, index) => index.toString()}
          renderItem={(props) => {
            return (
              <Touchable
                onPress={() => {
                  setIsFocused(false);
                  onSelectItem(props.item);
                  bottomSheetRef.current?.closeBottomSheetModal();
                }}
              >
                {renderItem(props)}
              </Touchable>
            );
          }}
        />
      </BottomSheet>
    </SelectBase>
  );
};

const styles = StyleSheet.create((theme) => ({
  listContainer: {
    padding: theme.scale.auto(16),
  },
}));
