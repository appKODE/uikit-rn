import type { Meta, StoryFn } from '@storybook/react';

import { type TypographyVariants, useTheme } from '@kode-frontend/uikit-rn';

import { Typography } from './typography';

const TypographyMeta: Meta<typeof Typography> = {
  args: {},
  component: Typography,
  title: 'ui/primitives',
};

export default TypographyMeta;

type Story = StoryFn<typeof Typography>;

const Component = () => {
  const { typography } = useTheme();

  return (
    <>
      {Object.keys(typography).map((variant) => (
        <Typography key={variant} variant={variant as TypographyVariants}>
          {variant}
        </Typography>
      ))}
    </>
  );
};

export const TypographyStory: Story = () => <Component />;
