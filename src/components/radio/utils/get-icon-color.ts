import { type IconColorFullKeys } from '../../../types';

type Props = {
  isChecked: boolean;
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

const emptyIconColors: TMapColorsOutput = {
  defaultColor: 'iconTertiary',
  errorColor: 'iconNegative',
  defaultDisabledColor: 'iconDisabled',
  errorDisabledColor: 'iconNegativeDisabled',
};

export const getIconColor = ({
  isChecked,
  isError,
  isDisabled,
}: Props): IconColorFullKeys => {
  const colors = isChecked ? fulfilledIconColors : emptyIconColors;
  const { errorColor, errorDisabledColor, defaultDisabledColor, defaultColor } =
    colors;

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
