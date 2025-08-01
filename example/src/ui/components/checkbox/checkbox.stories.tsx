import type { Meta, StoryFn } from '@storybook/react';

import { useState } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';

import { type CheckboxType } from '@kode-frontend/uikit-rn/components';
import { Typography } from '@kode-frontend/uikit-rn/primitives';

import { Checkbox } from './checkbox';

const CheckboxMeta: Meta<typeof Checkbox> = {
  args: {
    disabled: false,
    type: 'unselected',
    isError: false,
  },
  component: Checkbox,
  title: 'ui/components',
};

export default CheckboxMeta;

type Story = StoryFn<typeof Checkbox>;

const fn = () => undefined;

export const CheckboxStory: Story = (args) => {
  const [checkboxType, setCheckboxType] = useState<CheckboxType>('unselected');

  return (
    <ScrollView contentContainerStyle={styles.contentContainer}>
      <Typography variant={'headline1'}>Чекбокс</Typography>

      <Typography color={'textQuaternary'} variant={'body1'}>
        Компонент с чекбоксом
      </Typography>

      <Typography>Кликабельный чекбокс</Typography>
      <View style={styles.row}>
        <Checkbox
          {...args}
          type={checkboxType}
          onPress={() => {
            setCheckboxType((prevState) => {
              if (prevState === 'unselected') {
                return 'selected';
              }
              if (prevState === 'selected') {
                return 'indeterminate';
              }
              return 'unselected';
            });
          }}
        />
      </View>

      <Typography>Все состояния</Typography>
      <View style={styles.row}>
        <Checkbox {...args} type={'unselected'} onPress={fn} />
        <Checkbox {...args} type={'selected'} onPress={fn} />
        <Checkbox {...args} type={'indeterminate'} onPress={fn} />
      </View>

      <Typography>disabled</Typography>
      <View style={styles.row}>
        <Checkbox {...args} disabled type={'unselected'} onPress={fn} />
        <Checkbox {...args} disabled type={'selected'} onPress={fn} />
        <Checkbox {...args} disabled type={'indeterminate'} onPress={fn} />
      </View>

      <Typography>Все состояния + isError</Typography>
      <View style={styles.row}>
        <Checkbox {...args} type={'unselected'} isError onPress={fn} />
        <Checkbox {...args} type={'selected'} isError onPress={fn} />
        <Checkbox {...args} type={'indeterminate'} isError onPress={fn} />
      </View>

      <Typography>disabled + isError</Typography>
      <View style={styles.row}>
        <Checkbox {...args} disabled type={'unselected'} isError onPress={fn} />
        <Checkbox {...args} disabled type={'selected'} isError onPress={fn} />
        <Checkbox
          {...args}
          disabled
          type={'indeterminate'}
          isError
          onPress={fn}
        />
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
