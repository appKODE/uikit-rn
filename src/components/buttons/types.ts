import { type CreateVariants } from '../../types';

export type ButtonSize = 'large' | 'medium';

type ButtonContentColor = 'accent' | 'negative';
type ButtonType = 'ghost' | 'primary' | 'secondary';

export type ButtonVariant =
  | 'ghostNeutral'
  | CreateVariants<ButtonType, ButtonContentColor>;
