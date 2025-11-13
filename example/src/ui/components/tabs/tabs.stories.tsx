import type { Meta, StoryFn } from '@storybook/react';

import { ScrollView, StyleSheet, View } from 'react-native';

import { Typography } from '../../primitives';

import { Tabs } from './tabs';
import { useState } from 'react';
import { PlaceholderIcon } from '../../icons';
import { useTheme } from '@kode-frontend/uikit-rn';

const TabsMeta: Meta<typeof Tabs> = {
  args: {
    tabs: [
      { id: 'tab1', labelText: 'Tab' },
      { id: 'tab2', labelText: 'Tab', isDisabled: true },
      { id: 'tab3', labelText: 'Tab' },
      { id: 'tab4', labelText: 'Very long Tab' },
      { id: 'tab5', labelText: 'Tab' },
      { id: 'tab6', labelText: 'Tab' },
    ],
    activeTab: 'tab1',
  },
  component: Tabs,
  title: 'ui/components',
};

export default TabsMeta;

type Story = StoryFn<typeof Tabs>;

export const TabsStory: Story = (args) => {
  const theme = useTheme();
  const [tab, setTab] = useState('tab1');

  return (
    <ScrollView contentContainerStyle={styles.contentContainer}>
      <Typography variant={'headline1'}>Табы</Typography>

      <Typography color={'textQuaternary'} variant={'body1'}>
        Используется для навигации вложенного уровня (подразделы текущего
        раздела)
      </Typography>

      <View style={styles.group}>
        <Typography>Без иконок</Typography>
        <Tabs {...args} activeTab={tab} onChange={setTab} />

        <Typography>С иконками</Typography>
        <Tabs
          {...args}
          tabs={args.tabs.map((el) => ({
            ...el,
            leadingAddon: <PlaceholderIcon />,
            trailingAddon: <PlaceholderIcon />,
          }))}
          activeTab={tab}
          onChange={setTab}
        />

        <Typography>Кастомный цвет</Typography>
        <Tabs
          {...args}
          tabs={args.tabs.map((el) => ({
            ...el,
            leadingAddon: <PlaceholderIcon />,
            trailingAddon: <PlaceholderIcon />,
            textColor: 'textAccent',
            textDisabledColor: 'textAccentDisabled',
            iconColor: 'iconAccent',
          }))}
          activeTab={tab}
          onChange={setTab}
        />

        <Typography>Кастомное подчеркивание</Typography>
        <Tabs
          {...args}
          tabs={args.tabs.map((el) => ({
            ...el,
            leadingAddon: <PlaceholderIcon />,
            trailingAddon: <PlaceholderIcon />,
          }))}
          indicatorStyles={{
            height: 8,
            backgroundColor: theme.palette.icon.iconNegative,
          }}
          activeTab={tab}
          onChange={setTab}
        />

        <Typography>С разделителем</Typography>
        <Tabs
          {...args}
          tabs={args.tabs.map((el) => ({
            ...el,
            leadingAddon: <PlaceholderIcon />,
            trailingAddon: <PlaceholderIcon />,
          }))}
          activeTab={tab}
          onChange={setTab}
          dividerColor="borderRegular"
        />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  contentContainer: {
    gap: 32,
    padding: 16,
  },
  group: {
    gap: 16,
  },
});
