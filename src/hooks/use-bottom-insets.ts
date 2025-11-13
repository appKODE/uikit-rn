import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { BottomTabBarHeightContext } from '@react-navigation/bottom-tabs';
import { useContext } from 'react';

export const useBottomInsets = () => {
  const { bottom } = useSafeAreaInsets();
  const tabBarHeight = useContext(BottomTabBarHeightContext);

  return tabBarHeight ? 0 : bottom;
};
