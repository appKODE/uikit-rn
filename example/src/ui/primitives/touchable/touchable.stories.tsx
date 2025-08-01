import type { Meta, StoryObj } from '@storybook/react';

import { StyleSheet, View } from 'react-native';

import { Touchable } from './touchable';

const TouchableMeta: Meta<typeof Touchable> = {
  component: Touchable,
  title: 'ui/primitives',
};

export default TouchableMeta;

type Story = StoryObj<typeof Touchable>;

export const TouchableStory: Story = {
  render: () => (
    <Touchable onPress={() => console.log('test')}>
      <View style={styles.box} />
    </Touchable>
  ),
};

const styles = StyleSheet.create({
  box: {
    backgroundColor: 'red',
    height: 50,
    width: 50,
  },
});
