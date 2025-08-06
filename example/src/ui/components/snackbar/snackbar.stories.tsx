import type { Meta, StoryFn } from '@storybook/react';
import { Snackbar } from './snackbar';
import { Button } from '../button';
import { ScrollView } from 'react-native';
import { StyleSheet } from 'react-native-unistyles';
import { Typography } from '@kode-frontend/uikit-rn/primitives';
import { Snack } from '@kode-frontend/uikit-rn/components';

const SnackbarMeta: Meta<typeof Snackbar> = {
  title: 'ui/components',
  component: Snackbar,
  args: {},
};

export default SnackbarMeta;

type Story = StoryFn<typeof Snackbar>;

export const SnackbarStory: Story = () => {
  return (
    <ScrollView contentContainerStyle={styles.contentContainer}>
      <Typography variant="headline1">Snackbar</Typography>

      <Typography color="textQuaternary" variant="body1">
        Показывает всплывающее уведомление пользователю. Гибко настраивается.
        Расширь интерфейс ISnack для дополнительных возможностей
      </Typography>

      <Button
        onPress={() => {
          Snack.show({
            type: 'regular',
            message: 'Message text',
            duration: 3000,
            anchor: 'top',
          });
        }}
      >
        Показать снэк
      </Button>

      <Button
        onPress={() => {
          Snack.show({
            type: 'negative',
            message: 'Message text',
            duration: 3000,
            anchor: 'top',
          });
        }}
      >
        Показать снэк (negative)
      </Button>

      <Button
        onPress={() => {
          Snack.show({
            type: 'regular',
            message: 'Message text',
            duration: 3000,
            anchor: 'top',
            hideAfterInteraction: true,
          });
        }}
      >
        Снек будет отменен, при тапе на любую часть экрана (кроме снека)
      </Button>

      <Button
        onPress={() => {
          Snack.show({
            type: 'regular',
            message: 'Message text',
            duration: 3000,
            anchor: 'bottom',
          });
        }}
      >
        Снек внизу экрана
      </Button>

      <Button
        onPress={() => {
          Snack.show({
            type: 'regular',
            message: 'Нажми на меня',
            duration: 3000,
            anchor: 'top',
            onPress: () => {
              const id = Snack.show({
                type: 'regular',
                message: 'А теперь нажав на меня я исчезну',
                duration: 3000,
                anchor: 'bottom',
                onPress: () => {
                  Snack.cancel(id);
                },
              });
            },
          });
        }}
      >
        Снек с действием
      </Button>

      <Button
        onPress={() => {
          [...Array(3)].forEach((_, index) => {
            Snack.show({
              type: 'regular',
              message: `Снек ${index + 1}`,
              duration: 5000,
              anchor: 'top',
            });
          });
        }}
      >
        Создать несколько снэков
      </Button>

      <Button
        onPress={() => {
          Snack.cancelAll();
        }}
      >
        Отменить все снеки
      </Button>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  contentContainer: {
    gap: 16,
    padding: 16,
  },
});
