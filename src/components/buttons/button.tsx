import { type ComponentType, type ReactElement } from 'react';
import { type StyleProp, type TextStyle, type ViewStyle } from 'react-native';

import Animated from 'react-native-reanimated';
import { StyleSheet } from 'react-native-unistyles';

import { useAsyncAction, useTheme } from '../../hooks';
import { renderWithProps } from '../../utils';
import {
  ActivityIndicator,
  DEFAULT_MOUNT_KEYFRAME,
  DEFAULT_UNMOUNT_KEYFRAME,
  FadeTransition,
  LIGHT_SCALE_INTERPOLATOR,
  Touchable,
  type TouchableProps,
  Typography,
} from '../../primitives';
import { type IconProps, type TypographyVariants } from '../../types';
import { getBackgroundColor } from './utils/get-background-color';
import { getIconColor } from './utils/get-icon-color';
import { getTextColor } from './utils/get-text-color';
import { type ButtonSize, type ButtonVariant } from './types';

export type ButtonProps = TouchableProps & {
  children: ComponentType<IconProps> | ReactElement<IconProps> | string;
  disabled?: boolean;
  leadingAddon?: ComponentType<IconProps> | ReactElement<IconProps> | null;
  loading?: boolean;
  nowrap?: boolean;
  size?: ButtonSize;
  style?: StyleProp<ViewStyle>;
  trailingAddon?: ComponentType<IconProps> | ReactElement<IconProps> | null;
  variant?: ButtonVariant;
  textVariant?: TypographyVariants;
  textStyle?: StyleProp<TextStyle>;
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
  textVariant = 'subhead1',
  textStyle,
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
            style={[styles.label, textStyle]}
            variant={textVariant}
          >
            {children}
          </Typography>
        ) : (
          renderWithProps(children, { color: iconColor })
        )}

        {renderWithProps(trailingAddon, { color: iconColor })}
      </FadeTransition>

      {isLoading ? (
        <Animated.View
          entering={DEFAULT_MOUNT_KEYFRAME}
          exiting={DEFAULT_UNMOUNT_KEYFRAME}
          style={styles.loader}
        >
          <ActivityIndicator color={iconColor} />
        </Animated.View>
      ) : null}
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
  loader: {
    ...StyleSheet.absoluteFillObject,
    alignItems: 'center',
    justifyContent: 'center',
  },
}));
