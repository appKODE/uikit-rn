import {
  Radio as RadioBase,
  type RadioProps as RadioBaseProps,
} from '@kode-frontend/uikit-rn/components';

import { RadioChecked, RadioEmpty } from '../../icons';

export type RadioProps = Omit<RadioBaseProps, 'iconChecked' | 'iconEmpty'>;

export const Radio = (props: RadioProps) => {
  return (
    <RadioBase
      {...props}
      iconChecked={<RadioChecked />}
      iconEmpty={<RadioEmpty />}
    />
  );
};
