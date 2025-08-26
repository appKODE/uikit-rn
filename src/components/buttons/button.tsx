import { type ComponentType, type ReactElement } from 'react';
import { type StyleProp, type ViewStyle } from 'react-native';

import { StyleSheet } from 'react-native-unistyles';

import { useAsyncAction, useTheme } from '../../hooks';
import { renderWithProps } from '../../utils';
import {
  FadeTransition,
  LIGHT_SCALE_INTERPOLATOR,
  Touchable,
  type TouchableProps,
  Typography,
} from '../../primitives';
import { type IconProps } from '../../types';
import { getBackgroundColor } from './utils/get-background-color';
import { getIconColor } from './utils/get-icon-color';
import { getTextColor } from './utils/get-text-color';
import { type ButtonSize, type ButtonVariant } from './types';
import { ButtonLoader } from './button-loader';

export type ButtonProps = TouchableProps & {
  children: ComponentType<IconProps> | ReactElement<IconProps> | string;
  disabled?: boolean;
  leadingAddon?: ComponentType<IconProps> | ReactElement<IconProps> | null;
  loading?: boolean;
  nowrap?: boolean;
  size?: ButtonSize;
  style?: StyleProp<ViewStyle>;
  trailingAddon?: ComponentType<IconProps> | ReactElement<IconProps> | null;
  /**
   * Вариант визуального отображения кнопки.
   *
   * Используется для выбора предопределённого стиля компонента.
   * Например: 'primaryAccent', 'ghostNegative', 'secondaryAccent'.
   *
   * Если дефолтных вариантов недостаточно, на проекте нужен свой кастомный вариант, то можно прокинуть свои кастомные цвета.
   *
   * @example
   * <Button variant="primaryAccent" />
   * <Button variant={{
          backgroundColor: 'transparent',
          disabledIconColor: 'iconNegativeDisabled',
          iconColor: 'iconNegative',
          color: 'textOnNegative',
          disabledColor: 'textOnNegativeDisabled',
          disabledBackgroundColor: 'transparent',
      }} />
   */
  variant?: ButtonVariant;
};

export const Button = ({
  children,
  disabled = false,
  leadingAddon,
  loading = false,
  nowrap,
  size = 'large',
  style,
  trailingAddon,
  variant = 'primaryAccent',
  onPress,
  ...rest
}: ButtonProps) => {
  styles.useVariants({
    size,
  });

  const theme = useTheme();

  const { asyncAction, isAsyncLoading } = useAsyncAction(onPress);

  const isLoading = loading || isAsyncLoading;

  const iconColor = getIconColor({ disabled, variant });

  const textColor = getTextColor({ disabled, variant });

  const ripperColor = theme.palette.all[textColor];

  return (
    <Touchable
      accessibilityRole="button"
      accessibilityState={{ busy: isLoading, disabled }}
      disabled={disabled || isLoading}
      rippleColor={ripperColor}
      style={[
        styles.button({
          disabled: disabled || isLoading,
          variant,
        }),
        style,
      ]}
      testID={rest.testID ?? 'button'}
      onPress={asyncAction}
      {...rest}
    >
      <FadeTransition
        scaleInterpolate={LIGHT_SCALE_INTERPOLATOR}
        show={!isLoading}
        style={styles.contentWrapper}
      >
        {renderWithProps(leadingAddon, { color: iconColor })}

        {typeof children === 'string' ? (
          <Typography
            color={textColor}
            numberOfLines={nowrap ? 1 : undefined}
            style={styles.label}
            variant="subhead1"
          >
            {children}
          </Typography>
        ) : (
          renderWithProps(children, { color: iconColor })
        )}

        {renderWithProps(trailingAddon, { color: iconColor })}
      </FadeTransition>

      <ButtonLoader iconColor={iconColor} isLoading={isLoading} />
    </Touchable>
  );
};

type ButtonStyleParams = {
  disabled: boolean;
  variant: ButtonVariant;
};

const styles = StyleSheet.create((theme) => ({
  button: ({ disabled, variant }: ButtonStyleParams) => ({
    backgroundColor: getBackgroundColor({
      disabled,
      theme,
      variant,
    }),
    overflow: 'hidden',
    variants: {
      size: {
        large: {
          minHeight: 56,
          padding: 16,
        },
        medium: {
          minHeight: 44,
          padding: 10,
        },
      },
    },
    ...theme.components.button,
  }),
  contentWrapper: {
    alignItems: 'center',
    flex: 1,
    flexDirection: 'row',
    gap: 8,
    justifyContent: 'center',
  },
  label: {
    flexBasis: 'auto',
    flexGrow: 0,
    flexShrink: 1,
    textAlign: 'center',
  },
}));
