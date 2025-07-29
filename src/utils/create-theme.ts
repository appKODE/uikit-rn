import { type DefaultTheme } from '../types';

export type CreateThemeOptions = {
  components?: Partial<DefaultTheme['components']>;
  palette: Omit<DefaultTheme['palette'], 'all'>;
  scaling?: Partial<DefaultTheme['scale']>;
  typography: DefaultTheme['typography'];
};

export const createTheme = ({
  components,
  palette,
  scaling,
  typography,
}: CreateThemeOptions): DefaultTheme => ({
  components: {
    bottomSheet: {
      borderRadius: 24,
      contentBackgroundColor: 'layer1',
      indicatorBackgroundColor: 'iconQuaternary',
      modalTopOffset: 48,
      overlayColor: 'layerOverlay',
      ...components?.bottomSheet,
    },
    button: {
      borderRadius: 12,
      ...components?.button,
    },
    checkbox: {
      hitSlop: 10,
      iconSize: 24,
      rippleRadius: 20,
      ...components?.checkbox,
    },
    page: {
      paddingHorizontal: 16,
      paddingVertical: 16,
      ...components?.page,
    },
  },
  palette: {
    ...palette,
    all: {
      ...palette.border,
      ...palette.icon,
      ...palette.interactive,
      ...palette.surface,
      ...palette.text,
    },
  },
  scale: {
    auto: Number,
    fontSize: Number,
    height: Number,
    width: Number,
    ...scaling,
  },
  typography,
});
