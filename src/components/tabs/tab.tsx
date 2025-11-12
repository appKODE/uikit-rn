import { type LayoutChangeEvent, View } from 'react-native';
import { getTextColor } from './utils/get-text-color';
import { type TabProps as TabPropsBase, type TabGroupProps } from './types';
import { StyleSheet } from 'react-native-unistyles';
import { renderWithProps } from '../../utils';
import { Touchable, Typography } from '../../primitives';
import { type IconColorKeys } from '../../types';

type TabProps = TabPropsBase &
  Omit<TabGroupProps, 'dividerColor'> & {
    onPress: (id: string) => void;
    onLayout: (id: string) => (e: LayoutChangeEvent) => void;
  };

export const Tab = ({
  isDisabled,
  id,
  leadingAddon,
  trailingAddon,
  labelText,
  isSelected,
  height = 44,
  textColor = 'textPrimary',
  textDisabledColor = 'textDisabled',
  iconColor = 'iconPrimary',
  indicatorColor = 'iconAccent',
  indicatorHeight = 4,
  onPress,
  onLayout,
}: TabProps) => {
  return (
    <Touchable
      onPress={() => onPress(id)}
      onLayout={onLayout(id)}
      disabled={isDisabled || isSelected}
      rippleRadius={height * 0.9}
      isRippleBorderless
      style={styles.tab(height)}
    >
      {leadingAddon ? (
        <View style={styles.addon(isDisabled)}>
          {renderWithProps(leadingAddon, { color: iconColor })}
        </View>
      ) : null}

      <Typography
        color={getTextColor({
          isDisabled,
          disabledColor: textDisabledColor,
          color: textColor,
        })}
        numberOfLines={1}
        variant="subhead2"
      >
        {labelText}
      </Typography>

      {trailingAddon ? (
        <View style={styles.addon(isDisabled)}>
          {renderWithProps(trailingAddon, { color: iconColor })}
        </View>
      ) : null}

      {isSelected ? (
        <View style={styles.indicator(indicatorColor, indicatorHeight)} />
      ) : null}
    </Touchable>
  );
};

const styles = StyleSheet.create((theme) => ({
  tab: (height: number) => ({
    paddingHorizontal: 12,
    flexDirection: 'row',
    alignItems: 'center',
    position: 'relative',
    gap: 4,
    height,
  }),
  addon: (disabled?: boolean) => ({
    opacity: disabled ? 0.4 : 1,
  }),
  indicator: (color: IconColorKeys, height: number) => ({
    position: 'absolute',
    height,
    backgroundColor: theme.palette.all[color],
    left: 8,
    right: 8,
    bottom: 0,
    borderTopRightRadius: 4,
    borderTopLeftRadius: 4,
  }),
}));
