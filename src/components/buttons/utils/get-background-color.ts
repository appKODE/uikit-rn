import { type ButtonVariant, type DefaultButtonVariant } from '../types';
import type { DefaultTheme } from '../../../types';

type Params = {
  disabled: boolean;
  theme: DefaultTheme;
  variant: ButtonVariant;
};

export const getBackgroundColor = ({
  disabled,
  theme,
  variant,
}: Params): string => {
  if (typeof variant === 'string') {
    return mapVariants(theme)[variant]({ disabled });
  }

  const disabledBackgroundColor =
    variant.disabledBackgroundColor ?? variant.backgroundColor;

  return disabled ? disabledBackgroundColor : variant.backgroundColor;
};

type MapperParams = {
  disabled: boolean;
};

const mapVariants = (
  theme: DefaultTheme
): Record<DefaultButtonVariant, (params: MapperParams) => string> => {
  const { interactive, surface } = theme.palette;
  return {
    ghostAccent: ({}) => {
      return 'transparent';
    },
    ghostNegative: ({}) => {
      return 'transparent';
    },
    ghostNeutral: ({}) => {
      return 'transparent';
    },
    primaryAccent: ({ disabled }) => {
      return disabled ? interactive.layerAccentDisabled : surface.layerAccent;
    },
    primaryNegative: ({ disabled }) => {
      return disabled
        ? interactive.layerNegativeDisabled
        : surface.layerNegative;
    },
    secondaryAccent: ({ disabled }) => {
      return disabled
        ? interactive.layerTranslucentDisabled
        : surface.layerTranslucent;
    },
    secondaryNegative: ({ disabled }) => {
      return disabled
        ? interactive.layerTranslucentDisabled
        : surface.layerTranslucent;
    },
  };
};
