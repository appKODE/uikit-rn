import type { Meta, StoryFn } from '@storybook/react';
import { AppPreview } from './app.preview';

const AppPreviewMeta: Meta<typeof AppPreview> = {
  title: 'app',
  component: AppPreview,
  args: {},
};

export default AppPreviewMeta;

type Story = StoryFn<typeof AppPreview>;

export const AppPreviewStory: Story = (args) => <AppPreview {...args} />;
