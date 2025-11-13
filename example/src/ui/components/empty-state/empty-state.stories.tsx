import type { Meta, StoryFn } from '@storybook/react';

import { ScrollView, StyleSheet, View } from 'react-native';

import { Typography } from '../../primitives';
import { PlaceholderIcon } from '../../icons';

import { EmptyState } from './empty-state';

const EmptyStateMeta: Meta<typeof EmptyState> = {
  args: {
    titleText: 'Заголовок сообщения',
  },
  component: EmptyState,
  title: 'ui/components',
};

export default EmptyStateMeta;

type Story = StoryFn<typeof EmptyState>;

export const EmptyStateStory: Story = (args) => (
  <ScrollView contentContainerStyle={styles.contentContainer}>
    <Typography variant={'headline1'}>EmptyState</Typography>

    <Typography color={'textQuaternary'} variant={'body1'}>
      Используется для обозначения пустого состояния
    </Typography>

    <View style={styles.group}>
      <Typography>Полный</Typography>
      <EmptyState
        {...args}
        iconInstance={PlaceholderIcon}
        messageText="Текст сообщения опциональный, должен быть коротким и ясным"
      />

      <Typography>Без сообщения</Typography>
      <EmptyState {...args} iconInstance={PlaceholderIcon} />

      <Typography>Без иконки</Typography>
      <EmptyState
        {...args}
        messageText="Текст сообщения опциональный, должен быть коротким и ясным"
      />

      <Typography>Без иконки и без сообщения</Typography>
      <EmptyState {...args} />

      <Typography>С кастомным размером иконки</Typography>
      <EmptyState
        {...args}
        iconInstance={PlaceholderIcon}
        iconSize={120}
        messageText="Текст сообщения опциональный, должен быть коротким и ясным"
      />

      <Typography>С кастомнымыми цветами иконки/текст</Typography>
      <EmptyState
        {...args}
        iconInstance={PlaceholderIcon}
        iconColor="iconNegative"
        titleColor="textPositive"
        messageColor="textWarning"
        messageText="Текст сообщения опциональный, должен быть коротким и ясным"
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
