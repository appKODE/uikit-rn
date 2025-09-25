import {
  type ForwardedRef,
  forwardRef,
  type Ref,
  useCallback,
  useImperativeHandle,
  useRef,
  useState,
} from 'react';
import { type GestureResponderEvent, type ListRenderItem } from 'react-native';

import { useReanimatedKeyboardAnimation } from 'react-native-keyboard-controller';
import Animated, {
  interpolate,
  useAnimatedStyle,
} from 'react-native-reanimated';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { StyleSheet } from 'react-native-unistyles';

import {
  BottomSheet,
  BottomSheetFlatList,
  type BottomSheetProps,
  type BottomSheetRef,
} from '../../layouts';
import { Touchable } from '../../primitives';
import { SelectBase, type SelectBaseProps } from './select-base';

export type SelectFieldRef = {
  close: () => void;
};

export type SelectFieldProps<T> = SelectBaseProps &
  Omit<BottomSheetProps, 'ref'> & {
    data: T[];
    renderItem: ListRenderItem<T>;
    onSelectItem: (item: T) => void;
  };

export const SelectField = forwardRef(
  <T,>(
    {
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
    }: SelectFieldProps<T>,
    ref: ForwardedRef<SelectFieldRef>
  ) => {
    const insets = useSafeAreaInsets();
    const { progress } = useReanimatedKeyboardAnimation();

    const [isFocused, setIsFocused] = useState(false);

    const bottomSheetRef = useRef<BottomSheetRef>(null);

    useImperativeHandle(ref, () => ({
      close: () => bottomSheetRef.current?.closeBottomSheetModal(),
    }));

    const footerAnimatedStyle = useAnimatedStyle(
      () => ({
        backgroundColor: 'transparent',
        height: interpolate(
          progress.value,
          [0, 1],
          [insets.bottom, 0],
          'clamp'
        ),
      }),
      [insets.bottom]
    );

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
            ListFooterComponent={<Animated.View style={footerAnimatedStyle} />}
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
  }
) as <T>(
  props: SelectFieldProps<T> & { ref?: Ref<SelectFieldRef> }
) => JSX.Element;

const styles = StyleSheet.create((theme) => ({
  listContainer: {
    padding: theme.scale.auto(16),
  },
}));
