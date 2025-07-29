import { type ReactElement } from 'react';
import {
  type GestureResponderEvent,
  Pressable,
  type StyleProp,
  View,
  type ViewStyle,
} from 'react-native';

import { StyleSheet } from 'react-native-unistyles';

import type { TypographyColorKeys, TypographyVariants } from '../../types';

import { CollapseTransition, Typography } from '../../primitives';
import { type FormFieldState, type FormFieldVariant } from './types';

export type FormFieldProps = {
  children: ReactElement;
  counterSlot?: ReactElement;
  fieldContainerStyle?: StyleProp<ViewStyle>;
  /**
   * Высота поля.
   * @example Для multiline устанавливается auto, чтобы высота поля увеличивалась в зависимости от количества строк
   */
  fieldHeight?: 'auto' | 'fixed';
  /**
   * Пояснительный текст
   */
  helperText?: string;
  label?: string;
  labelColor?: TypographyColorKeys;
  labelVariant?: TypographyVariants;
  leadingAddon?: ReactElement;
  /**
   * Состояние поля
   */
  state?: FormFieldState;
  testID?: string;
  trailingAddon?: ReactElement;
  /**
   * Вариант поля
   */
  variant?: FormFieldVariant;
  onPress?: (e: GestureResponderEvent) => void;
};

export const FormField = ({
  children,
  counterSlot,
  fieldContainerStyle,
  fieldHeight = 'fixed',
  helperText,
  label,
  labelColor,
  labelVariant = 'subhead2',
  leadingAddon,
  state = 'empty',
  testID,
  trailingAddon,
  variant = 'default',
  onPress,
}: FormFieldProps) => {
  styles.useVariants({
    fieldHeight,
    state: variant === 'default' ? state : variant,
  });

  return (
    <Pressable testID={testID ?? 'form-field'} onPress={onPress}>
      {label ? (
        <Typography
          color={labelColor}
          style={styles.label}
          variant={labelVariant}
        >
          {label}
        </Typography>
      ) : null}

      <View style={[styles.inner, fieldContainerStyle]}>
        {leadingAddon}

        {children}

        {trailingAddon}
      </View>

      <View style={styles.footer}>
        <CollapseTransition
          collapsed={!helperText}
          style={styles.helperTextContainer}
          unmountWhenFade="children"
        >
          <Typography style={styles.helperText} variant="caption1">
            {helperText ?? ' '}
          </Typography>
        </CollapseTransition>

        {counterSlot}
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create((theme) => ({
  footer: {
    flexDirection: 'row',
    gap: 8,
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingTop: 8,
  },
  helperText: {
    variants: {
      state: {
        default: {
          color: theme.palette.text.textSecondary,
        },
        disabled: {
          color: theme.palette.interactive.textDisabled,
        },
        empty: {
          color: theme.palette.text.textSecondary,
        },
        error: {
          color: theme.palette.text.textNegative,
        },
        filled: {
          color: theme.palette.text.textSecondary,
        },
        focusEmpty: {
          color: theme.palette.text.textSecondary,
        },
        focusFilling: {
          color: theme.palette.text.textSecondary,
        },
      },
    },
  },
  helperTextContainer: {
    flex: 1,
  },
  inner: {
    alignItems: 'center',
    backgroundColor: theme.palette.surface.layerTranslucent,
    borderColor: theme.palette.border.borderRegular,
    borderRadius: 12,
    borderWidth: 1,
    flexDirection: 'row',
    gap: 8,
    minHeight: MIN_HEIGHT,
    overflow: 'hidden',
    paddingHorizontal: 16,
    variants: {
      fieldHeight: {
        auto: {
          height: 'auto',
        },
        fixed: {
          height: MIN_HEIGHT,
        },
      },
      state: {
        disabled: {
          borderColor: theme.palette.border.borderRegular,
        },
        empty: {
          borderColor: theme.palette.border.borderRegular,
        },
        error: {
          borderColor: theme.palette.border.borderNegative,
        },
        filled: {
          borderColor: theme.palette.border.borderRegular,
        },
        focusEmpty: {
          borderColor: theme.palette.border.borderAccent,
        },
        focusFilling: {
          borderColor: theme.palette.border.borderAccent,
        },
      },
    },
  },
  label: {
    paddingBottom: 8,
    paddingHorizontal: 16,
    variants: {
      state: {
        default: {
          color: theme.palette.text.textSecondary,
        },
        disabled: {
          color: theme.palette.interactive.textDisabled,
        },
        error: {
          color: theme.palette.text.textNegative,
        },
        focusEmpty: {
          color: theme.palette.text.textAccent,
        },
        focusFilling: {
          color: theme.palette.text.textAccent,
        },
      },
    },
  },
}));

const MIN_HEIGHT = 48;
