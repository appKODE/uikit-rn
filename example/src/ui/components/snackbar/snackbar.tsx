import { Snackbar as SnackbarBase } from '@kode-frontend/uikit-rn/components';
import { Snack } from './snack';

type TSnackbarProps = {
  children?: React.ReactNode;
};

export const Snackbar = ({ children }: TSnackbarProps) => {
  return (
    <SnackbarBase
      render={({ snack, onRelease }) => {
        return <Snack onRelease={onRelease} {...snack.payload} />;
      }}
    >
      {children}
    </SnackbarBase>
  );
};
