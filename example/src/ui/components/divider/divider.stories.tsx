import type { Meta, StoryFn } from '@storybook/react';

import { ScrollView, StyleSheet, View } from 'react-native';

import { Typography } from '../../primitives';
import { PlaceholderIcon } from '../../icons';

import { Divider } from './divider';

const DividerMeta: Meta<typeof Divider> = {
  args: {
    dividerText: '',
  },
  component: Divider,
  title: 'ui/components',
};

export default DividerMeta;

type Story = StoryFn<typeof Divider>;

export const DividerStory: Story = (args) => (
  <ScrollView contentContainerStyle={styles.contentContainer}>
    <Typography variant={'headline1'}>Разделитель</Typography>

    <Typography color={'textQuaternary'} variant={'body1'}>
      Используется для разделения других компонентов
    </Typography>

    <View style={styles.group}>
      <Typography>Без пропсов</Typography>
      <Divider {...args} />

      <Typography>Высота разделителя (dividerHeight)</Typography>
      <Divider {...args} dividerHeight={8} />

      <Typography>Цвет разделителя (dividerColor)</Typography>
      <Divider {...args} dividerColor={'borderNegative'} />
    </View>

    <View style={styles.group}>
      <Typography>Левый отступ (leftOffset)</Typography>
      <Divider {...args} leftOffset={24} />

      <Typography>Правый отступ (rightOffset)</Typography>
      <Divider {...args} rightOffset={24} />

      <Typography>Оба отступа (leftOffset, rightOffset)</Typography>
      <Divider {...args} leftOffset={24} rightOffset={24} />
    </View>

    <View style={styles.group}>
      <Typography>С текстом (dividerText)</Typography>
      <Divider {...args} dividerText={'Divider text'} />

      <Typography>Длинный текст (dividerText)</Typography>
      <Divider
        {...args}
        dividerText={
          'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aliquam assumenda incidunt, libero minus molestias quas quibusdam similique sunt veritatis? Aut dolorem dolorum illum ipsa magni natus nesciunt optio quaerat voluptates!'
        }
      />
    </View>

    <View style={styles.group}>
      <Typography>С иконкой (icon)</Typography>
      <Divider
        {...args}
        icon={<PlaceholderIcon color={'iconQuaternary'} size={16} />}
      />

      <Typography>С иконкой (icon)</Typography>
      <Divider
        {...args}
        icon={<PlaceholderIcon color={'iconAccent'} size={24} />}
      />
    </View>
  </ScrollView>
);

const styles = StyleSheet.create({
  contentContainer: {
    gap: 32,
    padding: 16,
  },
  group: {
    gap: 16,
  },
});
