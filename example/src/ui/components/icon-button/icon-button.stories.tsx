import type { Meta, StoryFn } from '@storybook/react';

import { ScrollView, StyleSheet, View } from 'react-native';

import { Typography } from '../../primitives';

import { PlaceholderIcon } from '../../icons';

import { IconButton } from './icon-button';

const IconButtonMeta: Meta<typeof IconButton> = {
  args: {
    disabled: false,
    leadingAddon: PlaceholderIcon,
    trailingAddon: PlaceholderIcon,
  },
  component: IconButton,
  title: 'ui/components',
};

export default IconButtonMeta;

type Story = StoryFn<typeof IconButton>;

export const IconButtonStory: Story = (args) => (
  <ScrollView contentContainerStyle={styles.contentContainer}>
    <Typography variant="headline1">Кнопка с иконкой</Typography>

    <Typography color="textQuaternary" variant="body1">
      Используется для создания кликабельных иконок
    </Typography>

    <View style={styles.group}>
      <Typography>Размеры (size)</Typography>
      <IconButton {...args} size="large">
        <PlaceholderIcon />
      </IconButton>
      <IconButton {...args} size="medium">
        <PlaceholderIcon />
      </IconButton>
    </View>

    <View style={styles.group}>
      <Typography>Primary/Accent</Typography>
      <IconButton {...args} variant="primaryAccent">
        <PlaceholderIcon />
      </IconButton>
      <IconButton {...args} disabled variant="primaryAccent">
        <PlaceholderIcon />
      </IconButton>
      <IconButton {...args} loading variant="primaryAccent">
        <PlaceholderIcon />
      </IconButton>
    </View>

    <View style={styles.group}>
      <Typography>Primary/Negative</Typography>
      <IconButton {...args} variant="primaryNegative">
        <PlaceholderIcon />
      </IconButton>
      <IconButton {...args} disabled variant="primaryNegative">
        <PlaceholderIcon />
      </IconButton>
      <IconButton {...args} loading variant="primaryNegative">
        <PlaceholderIcon />
      </IconButton>
    </View>

    <View style={styles.group}>
      <Typography>Secondary/Accent</Typography>
      <IconButton {...args} variant="secondaryAccent">
        <PlaceholderIcon />
      </IconButton>
      <IconButton {...args} disabled variant="secondaryAccent">
        <PlaceholderIcon />
      </IconButton>
      <IconButton {...args} loading variant="secondaryAccent">
        <PlaceholderIcon />
      </IconButton>
    </View>

    <View style={styles.group}>
      <Typography>Secondary/Negative</Typography>
      <IconButton {...args} variant="secondaryNegative">
        <PlaceholderIcon />
      </IconButton>
      <IconButton {...args} disabled variant="secondaryNegative">
        <PlaceholderIcon />
      </IconButton>
      <IconButton {...args} loading variant="secondaryNegative">
        <PlaceholderIcon />
      </IconButton>
    </View>

    <View style={styles.group}>
      <Typography>Ghost/Accent</Typography>
      <IconButton {...args} variant="ghostAccent">
        <PlaceholderIcon />
      </IconButton>
      <IconButton {...args} disabled variant="ghostAccent">
        <PlaceholderIcon />
      </IconButton>
      <IconButton {...args} loading variant="ghostAccent">
        <PlaceholderIcon />
      </IconButton>
    </View>

    <View style={styles.group}>
      <Typography>Ghost/Negative</Typography>
      <IconButton {...args} variant="ghostNegative">
        <PlaceholderIcon />
      </IconButton>
      <IconButton {...args} disabled variant="ghostNegative">
        <PlaceholderIcon />
      </IconButton>
      <IconButton {...args} loading variant="ghostNegative">
        <PlaceholderIcon />
      </IconButton>
    </View>

    <View style={styles.group}>
      <Typography>Ghost/Neutral</Typography>
      <IconButton {...args} variant="ghostNeutral">
        <PlaceholderIcon />
      </IconButton>
      <IconButton {...args} disabled variant="ghostNeutral">
        <PlaceholderIcon />
      </IconButton>
      <IconButton {...args} loading variant="ghostNeutral">
        <PlaceholderIcon />
      </IconButton>
    </View>

    <View style={styles.group}>
      <Typography>Поддерживает асинхронный onPress</Typography>
      <IconButton
        {...args}
        onPress={async () => {
          await new Promise((resolve) => {
            setTimeout(resolve, 1000);
          });
        }}
      >
        <PlaceholderIcon />
      </IconButton>
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
