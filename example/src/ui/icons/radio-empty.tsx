import { useTheme } from '@kode-frontend/uikit-rn';
import Svg, { Path } from 'react-native-svg';

import { type BaseIconProps } from './types';

export const RadioEmpty = ({
  color = 'iconPrimary',
  height,
  size = 24,
  width,
  ...rest
}: BaseIconProps) => {
  const theme = useTheme();
  return (
    <Svg
      fill="none"
      height={size ?? height ?? 24}
      viewBox="0 0 24 24"
      width={size ?? width ?? 24}
      {...rest}
    >
      <Path
        fill={theme.palette.all[color]}
        fillOpacity={0.5}
        d="M12 22a9.738 9.738 0 0 1-3.9-.788 10.099 10.099 0 0 1-3.175-2.137c-.9-.9-1.612-1.958-2.137-3.175A9.738 9.738 0 0 1 2 12c0-1.383.263-2.683.788-3.9a10.099 10.099 0 0 1 2.137-3.175c.9-.9 1.958-1.612 3.175-2.137A9.738 9.738 0 0 1 12 2c1.383 0 2.683.263 3.9.788a10.098 10.098 0 0 1 3.175 2.137c.9.9 1.613 1.958 2.137 3.175A9.738 9.738 0 0 1 22 12a9.738 9.738 0 0 1-.788 3.9 10.098 10.098 0 0 1-2.137 3.175c-.9.9-1.958 1.613-3.175 2.137A9.738 9.738 0 0 1 12 22Zm0-2c2.233 0 4.125-.775 5.675-2.325C19.225 16.125 20 14.233 20 12c0-2.233-.775-4.125-2.325-5.675C16.125 4.775 14.233 4 12 4c-2.233 0-4.125.775-5.675 2.325C4.775 7.875 4 9.767 4 12c0 2.233.775 4.125 2.325 5.675C7.875 19.225 9.767 20 12 20Z"
      />
    </Svg>
  );
};
