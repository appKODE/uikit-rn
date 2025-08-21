import type { Meta, StoryFn } from '@storybook/react';

import { ScrollView, StyleSheet, View } from 'react-native';

import { Typography } from '@kode-frontend/uikit-rn/primitives';

import { PlaceholderIcon } from '../../icons';

import { Button } from './button';

const ButtonMeta: Meta<typeof Button> = {
  args: {
    disabled: false,
    leadingAddon: PlaceholderIcon,
    trailingAddon: PlaceholderIcon,
  },
  component: Button,
  title: 'ui/components',
};

export default ButtonMeta;

type Story = StoryFn<typeof Button>;

export const ButtonStory: Story = (args) => (
  <ScrollView contentContainerStyle={styles.contentContainer}>
    <Typography variant="headline1">Это кнопка</Typography>

    <Typography color="textQuaternary" variant="body1">
      Занимает всю ширину родителя
    </Typography>

    <View style={styles.group}>
      <Typography>Без переносов (nowrap=true)</Typography>
      <Button {...args} nowrap>
        Очень, очень, очень и очень длинный текст кнопки, Очень, очень, очень и
        очень длинный текст кнопки
      </Button>

      <Typography>Без переносов (nowrap=false)</Typography>
      <Button {...args}>
        Очень, очень, очень и очень длинный текст кнопки, Очень, очень, очень и
        очень длинный текст кнопки
      </Button>
    </View>

    <View style={styles.group}>
      <Typography>Размеры (size)</Typography>
      <Button {...args} size="large">
        Label
      </Button>
      <Button {...args} size="medium">
        Label
      </Button>
    </View>

    <View style={styles.group}>
      <Typography>Primary/Accent</Typography>
      <Button {...args} variant="primaryAccent">
        Rest
      </Button>
      <Button {...args} disabled variant="primaryAccent">
        disabled
      </Button>
      <Button {...args} loading variant="primaryAccent">
        Loading
      </Button>
    </View>

    <View style={styles.group}>
      <Typography>Primary/Negative</Typography>
      <Button {...args} variant="primaryNegative">
        Rest
      </Button>
      <Button {...args} disabled variant="primaryNegative">
        disabled
      </Button>
      <Button {...args} loading variant="primaryNegative">
        Loading
      </Button>
    </View>

    <View style={styles.group}>
      <Typography>Secondary/Accent</Typography>
      <Button {...args} variant="secondaryAccent">
        Rest
      </Button>
      <Button {...args} disabled variant="secondaryAccent">
        disabled
      </Button>
      <Button {...args} loading variant="secondaryAccent">
        Loading
      </Button>
    </View>

    <View style={styles.group}>
      <Typography>Secondary/Negative</Typography>
      <Button {...args} variant="secondaryNegative">
        Rest
      </Button>
      <Button {...args} disabled variant="secondaryNegative">
        disabled
      </Button>
      <Button {...args} loading variant="secondaryNegative">
        Loading
      </Button>
    </View>

    <View style={styles.group}>
      <Typography>Ghost/Accent</Typography>
      <Button {...args} variant="ghostAccent">
        Rest
      </Button>
      <Button {...args} disabled variant="ghostAccent">
        disabled
      </Button>
      <Button {...args} loading variant="ghostAccent">
        Loading
      </Button>
    </View>

    <View style={styles.group}>
      <Typography>Ghost/Negative</Typography>
      <Button {...args} variant="ghostNegative">
        Rest
      </Button>
      <Button {...args} disabled variant="ghostNegative">
        disabled
      </Button>
      <Button {...args} loading variant="ghostNegative">
        Loading
      </Button>
    </View>

    <View style={styles.group}>
      <Typography>Custom</Typography>
      <Button
        {...args}
        variant={{
          backgroundColor: 'red',
          color: 'textContrastPrimary',
          iconColor: 'iconContrastPrimary',
        }}
      >
        Rest
      </Button>
      <Button
        {...args}
        disabled
        variant={{
          backgroundColor: 'red',
          color: 'textOnAccent',
          iconColor: 'iconOnAccent',
          disabledColor: 'textOnAccentDisabled',
          disabledIconColor: 'iconOnAccentDisabled',
        }}
      >
        disabled
      </Button>
      <Button
        {...args}
        loading
        variant={{
          backgroundColor: 'red',
          color: 'textContrastPrimary',
          iconColor: 'iconContrastPrimary',
        }}
      >
        Loading
      </Button>
    </View>

    <View style={styles.group}>
      <Typography>Поддерживает асинхронный onPress</Typography>
      <Button
        {...args}
        onPress={async () => {
          await new Promise((resolve) => {
            setTimeout(resolve, 1000);
          });
        }}
      >
        Label
      </Button>
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
