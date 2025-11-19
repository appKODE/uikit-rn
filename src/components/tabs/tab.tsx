import { type LayoutChangeEvent, View } from 'react-native';
import { getTextColor } from './utils/get-text-color';
import { type TabProps as TabPropsBase, type TabGroupProps } from './types';
import { StyleSheet } from 'react-native-unistyles';
import { renderWithProps } from '../../utils';
import { Touchable, Typography } from '../../primitives';

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
  tabStyles,
  textColor = 'textPrimary',
  textDisabledColor = 'textDisabled',
  iconColor = 'iconPrimary',
  indicatorStyles,
  onPress,
  onLayout,
}: TabProps) => {
  return (
    <Touchable
      onPress={() => onPress(id)}
      onLayout={onLayout(id)}
      disabled={isDisabled || isSelected}
      isRippleBorderless
      style={[styles.tab, tabStyles]}
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

      {isSelected ? <View style={[styles.indicator, indicatorStyles]} /> : null}
    </Touchable>
  );
};

const styles = StyleSheet.create((theme) => ({
  tab: {
    paddingHorizontal: 12,
    flexDirection: 'row',
    alignItems: 'center',
    position: 'relative',
    gap: 4,
    height: 44,
  },
  addon: (disabled?: boolean) => ({
    opacity: disabled ? 0.4 : 1,
  }),
  indicator: {
    position: 'absolute',
    height: 4,
    backgroundColor: theme.palette.icon.iconAccent,
    left: 8,
    right: 8,
    bottom: 0,
    borderTopRightRadius: 4,
    borderTopLeftRadius: 4,
  },
}));
