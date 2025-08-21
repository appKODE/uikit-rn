import {
  type CreateVariants,
  type IconColorFullKeys,
  type TypographyColorKeys,
} from '../../types';

export type ButtonSize = 'large' | 'medium';

type ButtonContentColor = 'accent' | 'negative';
type ButtonType = 'ghost' | 'primary' | 'secondary';

export type CustomButtonStyleProps = {
  backgroundColor: string;
  disabledBackgroundColor?: string;
  color: TypographyColorKeys;
  disabledColor?: TypographyColorKeys;
  disabledIconColor?: IconColorFullKeys;
  iconColor: IconColorFullKeys;
};

export type DefaultButtonVariant =
  | 'ghostNeutral'
  | CreateVariants<ButtonType, ButtonContentColor>;

export type ButtonVariant = DefaultButtonVariant | CustomButtonStyleProps;
