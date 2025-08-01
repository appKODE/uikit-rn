import { type ButtonVariant } from '../types';
import type { IconColorFullKeys } from '../../../types';

type Params = {
  disabled: boolean;
  variant: ButtonVariant;
};

export const getIconColor = ({
  disabled,
  variant,
}: Params): IconColorFullKeys => {
  return mapVariants[variant]({ disabled });
};

type MapperParams = {
  disabled: boolean;
};

const mapVariants: Record<
  ButtonVariant,
  (params: MapperParams) => IconColorFullKeys
> = {
  ghostAccent: ({ disabled }) => {
    return disabled ? 'iconAccentDisabled' : 'iconAccent';
  },
  ghostNegative: ({ disabled }) => {
    return disabled ? 'iconNegativeDisabled' : 'iconNegative';
  },
  ghostNeutral: ({ disabled }) => {
    return disabled ? 'iconDisabled' : 'iconTertiary';
  },
  primaryAccent: ({ disabled }) => {
    return disabled ? 'iconOnAccentDisabled' : 'iconOnAccent';
  },
  primaryNegative: ({ disabled }) => {
    return disabled ? 'iconOnNegativeDisabled' : 'iconOnNegative';
  },
  secondaryAccent: ({ disabled }) => {
    return disabled ? 'iconAccentDisabled' : 'iconAccent';
  },
  secondaryNegative: ({ disabled }) => {
    return disabled ? 'iconNegativeDisabled' : 'iconNegative';
  },
};
