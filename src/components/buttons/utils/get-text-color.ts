import { type ButtonVariant } from '../types';
import type { TypographyColorKeys } from '../../../types';

type Params = {
  disabled: boolean;
  variant: ButtonVariant;
};

export const getTextColor = ({
  disabled,
  variant,
}: Params): TypographyColorKeys => {
  return mapVariants[variant]({ disabled });
};

type MapperParams = {
  disabled: boolean;
};

const mapVariants: Record<
  ButtonVariant,
  (params: MapperParams) => TypographyColorKeys
> = {
  ghostAccent: ({ disabled }) => {
    return disabled ? 'textAccentDisabled' : 'textAccent';
  },
  ghostNegative: ({ disabled }) => {
    return disabled ? 'textNegativeDisabled' : 'textNegative';
  },
  ghostNeutral: ({ disabled }) => {
    return disabled ? 'textDisabled' : 'textTertiary';
  },
  primaryAccent: ({ disabled }) => {
    return disabled ? 'textOnAccentDisabled' : 'textOnAccent';
  },
  primaryNegative: ({ disabled }) => {
    return disabled ? 'textOnNegativeDisabled' : 'textOnNegative';
  },
  secondaryAccent: ({ disabled }) => {
    return disabled ? 'textAccentDisabled' : 'textAccent';
  },
  secondaryNegative: ({ disabled }) => {
    return disabled ? 'textNegativeDisabled' : 'textNegative';
  },
};
