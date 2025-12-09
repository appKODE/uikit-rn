import type { Meta, StoryFn } from '@storybook/react';

import { useState } from 'react';
import { ScrollView, StyleSheet } from 'react-native';

import { Button } from '@kode-frontend/uikit-rn/components';
import { Typography } from '@kode-frontend/uikit-rn/primitives';

import { TextAreaField } from './text-area-field';

type TextAreaFieldType = typeof TextAreaField;

const TextAreaFieldMeta: Meta<TextAreaFieldType> = {
  args: {
    placeholder: 'Placeholder',
  },
  component: TextAreaField,
  title: 'ui/components',
};

export default TextAreaFieldMeta;

type Story = StoryFn<TextAreaFieldType>;

export const TextAreaFieldStory: Story = (args) => {
  const [value, setValue] = useState('Value');
  const [error, setError] = useState('');

  return (
    <ScrollView contentContainerStyle={styles.contentContainer}>
      <Typography variant="headline1">Многострочное текстовое поле</Typography>

      <Typography color="textQuaternary" variant="body1">
        Многострочное текстовое поле ввода для большого объёма информации
      </Typography>

      <TextAreaField {...args} value={value} onChangeText={setValue} />

      <TextAreaField
        {...args}
        label={'С лейблом'}
        value={value}
        onChangeText={setValue}
      />

      <TextAreaField
        {...args}
        error={error}
        helperText={'Helper Text'}
        label={'Поддерживает Helper Text'}
        counterMaxLength={100}
        maxLength={100}
        value={value}
        onChangeText={setValue}
      />

      <TextAreaField
        {...args}
        disabled
        helperText={'Helper Text'}
        label={'Disabled'}
        counterMaxLength={100}
        maxLength={100}
        value={value}
        onChangeText={setValue}
      />

      <TextAreaField
        {...args}
        error={error}
        fieldContainerStyle={styles.fieldContainer}
        label={'Стилизация контейнера снаружи (fieldContainerStyle)'}
        value={value}
        onChangeText={setValue}
      />

      <TextAreaField
        {...args}
        error={error}
        label={'Стилизация лейбла'}
        labelColor={'textTertiary'}
        labelVariant={'headline3'}
        value={value}
        onChangeText={setValue}
      />

      <TextAreaField
        {...args}
        error={error}
        label={'Поле с кастомным helperText'}
        renderHelperText={({ text, style }) => {
          return (
            <Typography variant={'subhead1'} style={[style, styles.helperText]}>
              {text}
            </Typography>
          );
        }}
        labelColor={'textTertiary'}
        labelVariant={'headline3'}
        value={value}
        onChangeText={setValue}
      />

      <TextAreaField
        {...args}
        error={error}
        renderHelperText={null}
        label={'Поле со скрытым helperText'}
        labelColor={'textTertiary'}
        labelVariant={'headline3'}
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
  fieldContainer: {
    borderRadius: 0,
    minHeight: 200,
  },
  helperText: {
    color: 'blue',
  },
});
