import type { Meta, StoryFn } from '@storybook/react';

import { useState } from 'react';

import { PageFooter } from '@kode-frontend/uikit-rn/layouts';

import { Button, TextField } from '../../components';
import { Typography } from '../../primitives';
import { Page } from './page';

const PageMeta: Meta<typeof Page> = {
  args: {},
  component: Page,
  title: 'ui/layout',
};

export default PageMeta;

type Story = StoryFn<typeof Page>;

const text =
  'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ab assumenda doloribus, eligendi error iusto labore magni minima, nemo nihil numquam officiis quae quis quod quos repellat tempora voluptatum? Nesciunt, quam?';

export const PageStory: Story = (args) => {
  const [value, setValue] = useState('Value');

  return (
    <Page
      {...args}
      footer={
        <PageFooter>
          <Button nowrap>
            Очень, очень, очень и очень длинный текст кнопки, Очень, очень,
            очень и очень длинный текст кнопки
          </Button>
        </PageFooter>
      }
      gap={16}
      keyboardBottomOffset={40}
      subtitle={
        'При изменении данных потребуется подтверждение через код. После подтверждения менеджер обновит информацию в системе'
      }
      title={'Page'}
    >
      <Typography>{text}</Typography>
      <Typography>{text}</Typography>
      <Typography>{text}</Typography>

      <TextField
        helperText={'Helper text'}
        label={'Label'}
        placeholder={'Placeholder'}
        value={value}
        onChangeText={setValue}
      />

      <Typography>{text}</Typography>
      <Typography>{text}</Typography>
      <Typography>{text}</Typography>
    </Page>
  );
};
