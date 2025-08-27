import { type IconColorFullKeys } from '../../../types';
import { type CheckboxType } from '../types';

type Props = {
  type: CheckboxType;
  isError?: boolean;
  isDisabled?: boolean;
};

type TMapColorsOutput = {
  defaultColor: IconColorFullKeys;
  errorColor: IconColorFullKeys;
  defaultDisabledColor: IconColorFullKeys;
  errorDisabledColor: IconColorFullKeys;
};

const fulfilledIconColors: TMapColorsOutput = {
  defaultColor: 'iconAccent',
  errorColor: 'iconNegative',
  defaultDisabledColor: 'iconAccentDisabled',
  errorDisabledColor: 'iconNegativeDisabled',
};

const mapColorsByType: Record<CheckboxType, TMapColorsOutput> = {
  indeterminate: fulfilledIconColors,
  selected: fulfilledIconColors,
  unselected: {
    defaultColor: 'iconTertiary',
    errorColor: 'iconNegative',
    defaultDisabledColor: 'iconDisabled',
    errorDisabledColor: 'iconNegativeDisabled',
  },
};

export const getIconColor = ({
  type,
  isError,
  isDisabled,
}: Props): IconColorFullKeys => {
  const { errorColor, errorDisabledColor, defaultDisabledColor, defaultColor } =
    mapColorsByType[type];

  if (isError && isDisabled) {
    return errorDisabledColor;
  }

  if (isError) {
    return errorColor;
  }

  if (isDisabled) {
    return defaultDisabledColor;
  }

  return defaultColor;
};
