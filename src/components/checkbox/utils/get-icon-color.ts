import { type IconColorKeys } from '../../../types';
import { type CheckboxType } from '../types';

type Props = {
  type: CheckboxType;
  isError?: boolean;
};

export const getIconColor = ({ type, isError }: Props): IconColorKeys => {
  if (isError) {
    return 'iconNegative';
  }

  if (type === 'unselected') {
    return 'iconTertiary';
  }

  return 'iconAccent';
};
