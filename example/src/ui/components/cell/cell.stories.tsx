import type { Meta, StoryFn } from '@storybook/react';

import { ScrollView, StyleSheet, View } from 'react-native';

import { Typography } from '../../primitives';
import { PlaceholderIcon } from '../../icons';

import { Cell } from './cell';

const CellMeta: Meta<typeof Cell> = {
  args: {
    disabled: false,
    divider: true,
  },
  component: Cell,
  title: 'ui/components',
};

export default CellMeta;

type Story = StoryFn<typeof Cell>;

const fn = () => undefined;

export const CellStory: Story = (args) => (
  <ScrollView contentContainerStyle={styles.contentContainer}>
    <Typography variant={'headline1'}>Ячейка</Typography>

    <Typography color={'textQuaternary'} variant={'body1'}>
      Компонент для композиции и отображения нескольких слотов (слева, справа,
      иконки справа)
    </Typography>

    <View>
      <Typography>Без разделителя (divider=false)</Typography>
      <Cell
        {...args}
        divider={false}
        leadingContent={<Typography>leadingContent</Typography>}
      />
    </View>

    <View>
      <Typography>Слот слева (leadingContent)</Typography>
      <Cell
        {...args}
        leadingContent={<Typography>leadingContent</Typography>}
      />
    </View>

    <View>
      <Typography>
        Слот слева, справа (leadingContent, trailingContent)
      </Typography>
      <Cell
        {...args}
        leadingContent={<Typography>leadingContent</Typography>}
        trailingContent={<Typography>trailingContent</Typography>}
      />
    </View>

    <View>
      <Typography>Слот слева и иконка (leadingContent, rightIcon) </Typography>
      <Cell
        {...args}
        leadingContent={<Typography>leadingContent</Typography>}
        rightIcon={<PlaceholderIcon />}
        onPress={fn}
      />
    </View>

    <View>
      <Typography>gap, paddingHorizontal, paddingVertical </Typography>
      <Cell
        {...args}
        gap={32}
        leadingContent={<Typography>leadingContent</Typography>}
        paddingHorizontal={32}
        paddingVertical={32}
        rightIcon={<PlaceholderIcon />}
        trailingContent={<Typography>trailingContent</Typography>}
      />
    </View>

    <View>
      <Typography>Слот слева и onPress (leadingContent, onPress)</Typography>
      <Cell
        {...args}
        leadingContent={<Typography>leadingContent</Typography>}
        onPress={fn}
      />
    </View>

    <View>
      <Typography>
        leadingContent, trailingContent, rightIcon, onPress
      </Typography>
      <Cell
        {...args}
        leadingContent={<Typography>leadingContent</Typography>}
        rightIcon={<PlaceholderIcon />}
        trailingContent={<Typography>trailingContent</Typography>}
        onPress={fn}
      />
    </View>

    <View>
      <Typography>
        leadingContent, trailingContent, rightIcon, onPress, disabled
      </Typography>
      <Cell
        {...args}
        disabled
        divider
        leadingContent={<Typography>leadingContent</Typography>}
        rightIcon={<PlaceholderIcon />}
        trailingContent={<Typography>trailingContent</Typography>}
        onPress={fn}
      />
    </View>

    <View>
      <Typography>Длинный текст</Typography>
      <Cell
        {...args}
        divider
        leadingContent={
          <View style={styles.row}>
            <PlaceholderIcon />
            <Typography style={styles.text}>Leading content</Typography>
          </View>
        }
        rightIcon={<PlaceholderIcon color={'iconTertiary'} />}
        trailingContent={
          <View style={styles.row}>
            <Typography style={styles.text}>
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ea enim
              eos, exercitationem facilis, iste minima nesciunt officia,
              officiis repellat reprehenderit tenetur voluptate voluptatibus?
              Dicta laborum modi, omnis perferendis quod tempore.
            </Typography>
            <PlaceholderIcon />
          </View>
        }
        onPress={fn}
      />
    </View>

    <View>
      <Typography>Оффсет для Divider'а</Typography>
      <Cell
        {...args}
        leftOffset={52}
        leadingContent={<Typography>leadingContent</Typography>}
      />
    </View>
  </ScrollView>
);

const styles = StyleSheet.create({
  contentContainer: {
    gap: 16,
    padding: 16,
  },
  row: {
    alignItems: 'center',
    flex: 1,
    flexDirection: 'row',
    gap: 12,
  },
  text: {
    flexShrink: 1,
  },
});
