import type { Meta, StoryFn } from '@storybook/react';

import { useCallback, useRef } from 'react';

import { Button } from '../../components';
import { Typography } from '../../primitives';
import { PageList } from './page-list';
import { StyleSheet } from 'react-native-unistyles';
import { type FlatList, type ListRenderItem, View } from 'react-native';
import { PageListFooter } from './page-list-footer';

type TItem = {
  id: string;
  title: string;
};

const title =
  'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Dolore dolores, facere itaque similique tempora vel? Ad architecto consequuntur cupiditate fugiat laborum quae quisquam, quod veritatis. Ab architecto commodi dolorem vitae?';

const keyExtractor = (item: TItem) => item.id;

const PageListMeta: Meta<typeof PageList> = {
  args: {
    data: [
      {
        id: '1',
        title,
      },
      {
        id: '2',
        title,
      },
      {
        id: '3',
        title,
      },
      {
        id: '4',
        title,
      },
      {
        id: '5',
        title,
      },
    ],
  },
  component: PageList,
  title: 'ui/layout',
};

export default PageListMeta;

type Story = StoryFn<typeof PageList<TItem>>;

export const PageListStory: Story = (args) => {
  const listRef = useRef<FlatList<TItem>>(null);

  const renderItem: ListRenderItem<TItem> = useCallback(({ item }) => {
    return (
      <View style={styles.item}>
        <Typography variant={'subhead2'}>{item.title}</Typography>
      </View>
    );
  }, []);

  return (
    <PageList
      {...args}
      ref={listRef}
      footer={
        <PageListFooter>
          <Button
            nowrap
            onPress={() => {
              listRef.current?.scrollToEnd();
            }}
          >
            listRef.current?.scrollToEnd()
          </Button>
        </PageListFooter>
      }
      keyExtractor={keyExtractor}
      renderItem={renderItem}
      contentContainerStyle={styles.content}
      subtitle={title}
      title={'PageList'}
    />
  );
};

const styles = StyleSheet.create((theme) => ({
  image: {
    height: '100%',
    width: '100%',
  },
  imageWrapper: {
    flexShrink: 1,
    padding: 8,
  },
  item: {
    backgroundColor: theme.palette.surface.layer1,
    borderRadius: 16,
    padding: 16,
  },
  content: {
    flexGrow: 1,
    gap: 12,
    backgroundColor: theme.palette.surface.background,
  },
}));
