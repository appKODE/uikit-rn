import type { Meta, StoryFn } from '@storybook/react';

import { useState } from 'react';
import { ScrollView } from 'react-native';

import { Button } from '@kode-frontend/uikit-rn/components';
import { Typography } from '@kode-frontend/uikit-rn/primitives';
import { StyleSheet } from 'react-native-unistyles';

import { PlaceholderIcon } from '../../icons';

import { SelectField } from './select-field';

const SelectFieldMeta: Meta<typeof SelectField> = {
  args: {},
  component: SelectField,
  title: 'ui/components',
};

export default SelectFieldMeta;

type Story = StoryFn<typeof SelectField>;

const data: string[] = [
  'Значение 1',
  'Значение 2',
  'Значение 3',
  'Значение 4',
  'Значение 5',
];

export const SelectFieldStory: Story = (args) => {
  const [value, setValue] = useState('');
  const [error, setError] = useState('');

  const onCleanSelect = () => {
    setValue('');
  };

  return (
    <ScrollView contentContainerStyle={styles.contentContainer}>
      <Typography variant="headline1">Поле Select</Typography>

      <Typography color="textQuaternary" variant="body1">
        Используется для выбора значения из представленного списка
      </Typography>

      <Typography>Дефолтное поле</Typography>
      <SelectField
        {...args}
        data={data}
        error={error}
        helperText={'Helper text'}
        label={'Label'}
        leadingAddon={<PlaceholderIcon color="iconTertiary" />}
        placeholder={'Placeholder'}
        trailingAddon={<PlaceholderIcon color="iconTertiary" />}
        value={value}
        onCleanItem={onCleanSelect}
        onSelectItem={setValue}
      />

      <Typography>Поле с кнопкой очистки</Typography>
      <SelectField
        {...args}
        withCleanButton
        data={data}
        error={error}
        helperText={'Helper text'}
        label={'Label'}
        leadingAddon={<PlaceholderIcon color="iconTertiary" />}
        placeholder={'Placeholder'}
        trailingAddon={<PlaceholderIcon color="iconTertiary" />}
        value={value}
        onCleanItem={onCleanSelect}
        onSelectItem={setValue}
      />

      <Typography>Поле с кастомным helperText</Typography>
      <SelectField
        {...args}
        withCleanButton
        data={data}
        error={error}
        renderHelperText={({ text, style }) => {
          return (
            <Typography variant={'subhead1'} style={[style, styles.helperText]}>
              {text}
            </Typography>
          );
        }}
        label={'Label'}
        leadingAddon={<PlaceholderIcon color="iconTertiary" />}
        placeholder={'Placeholder'}
        trailingAddon={<PlaceholderIcon color="iconTertiary" />}
        value={value}
        onCleanItem={onCleanSelect}
        onSelectItem={setValue}
      />

      <Typography>Поле со скрытым helperText</Typography>
      <SelectField
        {...args}
        withCleanButton
        data={data}
        error={error}
        renderHelperText={null}
        label={'Label'}
        leadingAddon={<PlaceholderIcon color="iconTertiary" />}
        placeholder={'Placeholder'}
        trailingAddon={<PlaceholderIcon color="iconTertiary" />}
        value={value}
        onCleanItem={onCleanSelect}
        onSelectItem={setValue}
      />

      <Typography>Disabled поле</Typography>
      <SelectField
        {...args}
        disabled
        data={data}
        helperText={'Helper text'}
        label={'Label'}
        placeholder={'Placeholder'}
        value={value}
        onCleanItem={onCleanSelect}
        onSelectItem={setValue}
      />

      <Typography>Поле с кастомным labelText</Typography>
      <SelectField
        {...args}
        withCleanButton
        data={data}
        error={error}
        renderLabelText={({ style }) => {
          return (
            <Typography
              variant={'headline4'}
              style={[style, styles.helperText]}
            >
              Это кастомный лейбл
            </Typography>
          );
        }}
        leadingAddon={<PlaceholderIcon color="iconTertiary" />}
        placeholder={'Placeholder'}
        trailingAddon={<PlaceholderIcon color="iconTertiary" />}
        value={value}
        onCleanItem={onCleanSelect}
        onSelectItem={setValue}
      />

      <Button
        onPress={() => {
          setError(error ? '' : 'Error message');
        }}
      >
        {error ? 'Скрыть ошибку' : 'Показать ошибку'}
      </Button>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  contentContainer: {
    gap: 16,
    padding: 16,
  },
  helperText: {
    color: 'blue',
  },
});
