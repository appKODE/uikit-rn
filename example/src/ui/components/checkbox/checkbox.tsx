import {
  Checkbox as CheckBoxBase,
  type CheckboxProps as CheckboxBaseProps,
} from '@kode-frontend/uikit-rn/components';

import {
  CheckboxIndeterminate,
  CheckboxSelected,
  CheckboxUnselected,
} from '../../icons';

export type CheckboxProps = Omit<
  CheckboxBaseProps,
  'iconIndeterminate' | 'iconSelected' | 'iconUnselected'
>;

export const Checkbox = (props: CheckboxProps) => {
  return (
    <CheckBoxBase
      {...props}
      iconIndeterminate={<CheckboxIndeterminate />}
      iconSelected={<CheckboxSelected />}
      iconUnselected={<CheckboxUnselected />}
    />
  );
};
