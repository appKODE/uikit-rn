import type { Meta, StoryFn } from '@storybook/react';

import { useState } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';

import { Typography } from '@kode-frontend/uikit-rn/primitives';

import { Radio } from './radio';

const RadioMeta: Meta<typeof Radio> = {
  args: {
    disabled: false,
    isChecked: false,
    isError: false,
  },
  component: Radio,
  title: 'ui/components',
};

export default RadioMeta;

type Story = StoryFn<typeof Radio>;

const fn = () => undefined;

export const RadioStory: Story = (args) => {
  const [isChecked, setIsChecked] = useState(false);

  return (
    <ScrollView contentContainerStyle={styles.contentContainer}>
      <Typography variant={'headline1'}>Радио</Typography>

      <Typography color={'textQuaternary'} variant={'body1'}>
        Компонент с радио
      </Typography>

      <Typography>Кликабельный радио</Typography>
      <View style={styles.row}>
        <Radio
          {...args}
          isChecked={isChecked}
          onPress={() => setIsChecked((prevState) => !prevState)}
        />
      </View>

      <Typography>Все состояния</Typography>
      <View style={styles.row}>
        <Radio {...args} isChecked={false} onPress={fn} />
        <Radio {...args} isChecked={true} onPress={fn} />
      </View>

      <Typography>disabled</Typography>
      <View style={styles.row}>
        <Radio {...args} disabled isChecked={false} onPress={fn} />
        <Radio {...args} disabled isChecked={true} onPress={fn} />
      </View>

      <Typography>Все состояния + isError</Typography>
      <View style={styles.row}>
        <Radio {...args} isChecked={false} isError onPress={fn} />
        <Radio {...args} isChecked={true} isError onPress={fn} />
      </View>

      <Typography>disabled + isError</Typography>
      <View style={styles.row}>
        <Radio {...args} disabled isChecked={false} isError onPress={fn} />
        <Radio {...args} disabled isChecked={true} isError onPress={fn} />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  contentContainer: {
    gap: 16,
    padding: 16,
  },
  row: {
    alignItems: 'center',
    flexDirection: 'row',
    gap: 16,
  },
});
