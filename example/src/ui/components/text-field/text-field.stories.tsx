import type { Meta, StoryFn } from '@storybook/react';

import { useState } from 'react';
import { ScrollView, StyleSheet } from 'react-native';

import { Button } from '@kode-frontend/uikit-rn/components';
import { Typography } from '@kode-frontend/uikit-rn/primitives';

import { PlaceholderIcon } from '../../icons';

import { TextField } from './text-field';

const TextFieldMeta: Meta<typeof TextField> = {
  args: {
    placeholder: 'Placeholder',
  },
  component: TextField,
  title: 'ui/components',
};

export default TextFieldMeta;

type Story = StoryFn<typeof TextField>;

export const TextFieldStory: Story = (args) => {
  const [value, setValue] = useState('Value');
  const [error, setError] = useState('');

  return (
    <ScrollView contentContainerStyle={styles.contentContainer}>
      <Typography variant="headline1">Текстовое поле</Typography>

      <Typography color="textQuaternary" variant="body1">
        Простое текстовое поле ввода
      </Typography>

      <TextField {...args} value={value} onChangeText={setValue} />

      <TextField
        {...args}
        label="Label"
        value={value}
        onChangeText={setValue}
      />

      <TextField
        {...args}
        helperText="Поддерживает Helper Text"
        label="Label"
        value={value}
        onChangeText={setValue}
      />

      <TextField
        {...args}
        helperText="Поддерживает левый и правый Addon"
        label="Label"
        leadingAddon={<PlaceholderIcon color="iconTertiary" />}
        trailingAddon={<PlaceholderIcon color="iconTertiary" />}
        value={value}
        onChangeText={setValue}
      />

      <TextField
        {...args}
        withClean
        helperText="С кнопкой очистки"
        label="Label"
        leadingAddon={<PlaceholderIcon color="iconTertiary" />}
        maxLength={100}
        trailingAddon={<PlaceholderIcon color="iconTertiary" />}
        value={value}
        onChangeText={setValue}
      />

      <TextField
        {...args}
        disabled
        withClean
        helperText="Disabled field"
        label="Label"
        leadingAddon={<PlaceholderIcon color="iconTertiary" />}
        maxLength={100}
        trailingAddon={<PlaceholderIcon color="iconTertiary" />}
        value={value}
        onChangeText={setValue}
      />

      <TextField
        {...args}
        withClean
        counterMaxLength={100}
        error={error}
        label="Label"
        leadingAddon={<PlaceholderIcon color="iconTertiary" />}
        trailingAddon={<PlaceholderIcon color="iconTertiary" />}
        value={value}
        onChangeText={setValue}
      />

      <TextField
        {...args}
        withClean
        counterMaxLength={100}
        error={error}
        label={'Поле с кастомным helperText'}
        leadingAddon={<PlaceholderIcon color="iconTertiary" />}
        maxLength={100}
        renderHelperText={({ text, style }) => {
          return (
            <Typography variant={'subhead1'} style={[style, styles.helperText]}>
              {text}
            </Typography>
          );
        }}
        trailingAddon={<PlaceholderIcon color="iconTertiary" />}
        value={value}
        onChangeText={setValue}
      />

      <TextField
        {...args}
        withClean
        error={error}
        label={'Поле со скрытым helperText'}
        leadingAddon={<PlaceholderIcon color="iconTertiary" />}
        maxLength={100}
        renderHelperText={null}
        trailingAddon={<PlaceholderIcon color="iconTertiary" />}
        value={value}
        onChangeText={setValue}
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
