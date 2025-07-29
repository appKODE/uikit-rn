import { type TextStyle } from 'react-native';

/**
 * Surface colors
 */
export type SurfaceColorKeys =
  | 'background'
  | 'layer1'
  | 'layer2'
  | 'layer3'
  | 'layerAccent'
  | 'layerAccentPale'
  | 'layerContrast'
  | 'layerNegative'
  | 'layerNegativePale'
  | 'layerOverlay'
  | 'layerPositive'
  | 'layerPositivePale'
  | 'layerTranslucent'
  | 'layerWarning'
  | 'layerWarningPale';

/**
 * Border colors
 */
export type BorderColorKeys =
  | 'borderAccent'
  | 'borderNegative'
  | 'borderRegular';

/**
 * Text colors
 */
export type TextColorKeys =
  | 'textAccent'
  | 'textContrastPrimary'
  | 'textContrastSecondary'
  | 'textNegative'
  | 'textOnAccent'
  | 'textOnNegative'
  | 'textOnPositive'
  | 'textOnWarning'
  | 'textPositive'
  | 'textPrimary'
  | 'textQuaternary'
  | 'textSecondary'
  | 'textTertiary'
  | 'textWarning';

/**
 * Icon colors
 */
export type IconColorKeys =
  | 'iconAccent'
  | 'iconContrastPrimary'
  | 'iconContrastSecondary'
  | 'iconNegative'
  | 'iconOnAccent'
  | 'iconOnNegative'
  | 'iconOnPositive'
  | 'iconOnWarning'
  | 'iconPositive'
  | 'iconPrimary'
  | 'iconQuaternary'
  | 'iconSecondary'
  | 'iconTertiary'
  | 'iconWarning';

/**
 * Interactive colors
 */
export type InteractiveIconColorKeys =
  | 'iconAccentDisabled'
  | 'iconDisabled'
  | 'iconNegativeDisabled'
  | 'iconOnAccentDisabled'
  | 'iconOnNegativeDisabled';

export type InteractiveLayerColorKeys =
  | 'layerAccentDisabled'
  | 'layerNegativeDisabled'
  | 'layerPressed'
  | 'layerTranslucentDisabled';

export type InteractiveTextColorKeys =
  | 'textAccentDisabled'
  | 'textDisabled'
  | 'textNegativeDisabled'
  | 'textOnAccentDisabled'
  | 'textOnNegativeDisabled';

export type InteractiveColorKeys =
  | InteractiveIconColorKeys
  | InteractiveLayerColorKeys
  | InteractiveTextColorKeys;

export type TypographyVariants =
  | 'body1'
  | 'body2'
  | 'caption1'
  | 'caption2'
  | 'caption3'
  | 'headline1'
  | 'headline2'
  | 'headline3'
  | 'headline4'
  | 'headline5'
  | 'subhead1'
  | 'subhead2';

export type TypographyColorKeys = InteractiveTextColorKeys | TextColorKeys;
export type IconColorFullKeys = IconColorKeys | InteractiveIconColorKeys;

export type DefaultTheme = {
  components: {
    bottomSheet: {
      borderRadius: number;
      contentBackgroundColor: SurfaceColorKeys;
      indicatorBackgroundColor: IconColorKeys;
      indicatorBorderRadius?: number;
      indicatorHeight?: number;
      indicatorTopOffset?: number;
      indicatorWidth?: number;
      modalTopOffset: number;
      overlayColor: SurfaceColorKeys;
    };
    button: {
      borderRadius: number;
    };
    checkbox: {
      hitSlop: number;
      iconSize: number;
      rippleRadius: number;
    };
    page: {
      paddingHorizontal: number;
      paddingVertical: number;
    };
  };
  palette: {
    all: Record<
      | BorderColorKeys
      | IconColorKeys
      | InteractiveColorKeys
      | SurfaceColorKeys
      | TextColorKeys,
      string
    >;
    border: Record<BorderColorKeys, string>;
    icon: Record<IconColorKeys, string>;
    interactive: Record<InteractiveColorKeys, string>;
    surface: Record<SurfaceColorKeys, string>;
    text: Record<TextColorKeys, string>;
  };
  scale: {
    auto: (value: number) => number;
    fontSize: (value: number) => number;
    height: (value: number) => number;
    width: (value: number) => number;
  };
  typography: Record<
    TypographyVariants,
    Pick<TextStyle, 'fontSize' | 'fontWeight' | 'lineHeight'>
  >;
};

export type IconProps = {
  color?: IconColorFullKeys;
  size?: number;
};

export type CreateVariants<
  Variant1 extends string,
  Variant2 extends string,
> = `${Variant1}${Capitalize<Variant2>}`;
