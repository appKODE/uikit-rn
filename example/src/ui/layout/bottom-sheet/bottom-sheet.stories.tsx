import type { Meta, StoryFn } from '@storybook/react';

import { useCallback, useRef } from 'react';
import { ScrollView, View } from 'react-native';

import { StyleSheet } from 'react-native-unistyles';

import { Button } from '../../components';
import { Typography } from '../../primitives';
import { BottomSheet, type BottomSheetRef } from './bottom-sheet';
import { BottomSheetFlatList } from './bottom-sheet-flat-list';
import { BottomSheetScrollView } from './bottom-sheet-scroll-view';
import { BottomSheetSectionList } from './bottom-sheet-section-list';
import { BottomSheetView } from './bottom-sheet-view';

const BottomSheetMeta: Meta<typeof BottomSheet> = {
  args: {},
  component: BottomSheet,
  title: 'ui/layout',
};

export default BottomSheetMeta;

type Story = StoryFn<typeof BottomSheet>;

export const BottomSheetStory: Story = (args) => {
  const bottomSheetRef = useRef<BottomSheetRef>(null);
  const bottomSheetRef2 = useRef<BottomSheetRef>(null);
  const bottomSheetRef3 = useRef<BottomSheetRef>(null);
  const bottomSheetRef4 = useRef<BottomSheetRef>(null);
  const bottomSheetRef5 = useRef<BottomSheetRef>(null);

  const handleComponent = useCallback(() => {
    return (
      <View style={styles.customHeaderContainer}>
        <Button
          size={'medium'}
          variant={'ghostAccent'}
          onPress={() => {
            bottomSheetRef5.current?.closeBottomSheetModal();
          }}
        >
          Отмена
        </Button>
        <View style={styles.customHeaderTitleContainer}>
          <Typography variant={'subhead1'}>Privet</Typography>
        </View>
      </View>
    );
  }, []);

  return (
    <ScrollView contentContainerStyle={styles.contentContainer}>
      <Typography variant={'headline1'}>BottomSheet</Typography>

      <Typography>Модалка с BottomSheetView</Typography>
      <BottomSheet
        {...args}
        ref={bottomSheetRef}
        onDismiss={() => {
          bottomSheetRef.current?.closeBottomSheetModal();
        }}
      >
        <BottomSheetView style={styles.modalContent}>
          <Typography>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit.
            Consequatur, earum enim harum id ipsam ipsum minus necessitatibus
            praesentium quam quasi repellendus sit veritatis voluptatum!
            Dignissimos eos laboriosam molestiae sunt vitae!
          </Typography>
          <Typography>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit.
            Consequatur, earum enim harum id ipsam ipsum minus necessitatibus
            praesentium quam quasi repellendus sit veritatis voluptatum!
            Dignissimos eos laboriosam molestiae sunt vitae!
          </Typography>
        </BottomSheetView>
      </BottomSheet>
      <Button
        onPress={() => {
          bottomSheetRef.current?.openBottomSheetModal();
        }}
      >
        Открыть модалку
      </Button>

      <Typography>Модалка с BottomSheetScrollView</Typography>
      <BottomSheet
        {...args}
        ref={bottomSheetRef2}
        onDismiss={() => {
          bottomSheetRef2.current?.closeBottomSheetModal();
        }}
      >
        <BottomSheetScrollView contentContainerStyle={styles.modalContent}>
          <Typography>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit.
            Consequatur, earum enim harum id ipsam ipsum minus necessitatibus
            praesentium quam quasi repellendus sit veritatis voluptatum!
            Dignissimos eos laboriosam molestiae sunt vitae!
          </Typography>
          <Typography>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit.
            Consequatur, earum enim harum id ipsam ipsum minus necessitatibus
            praesentium quam quasi repellendus sit veritatis voluptatum!
            Dignissimos eos laboriosam molestiae sunt vitae!
          </Typography>
          <Typography>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit.
            Consequatur, earum enim harum id ipsam ipsum minus necessitatibus
            praesentium quam quasi repellendus sit veritatis voluptatum!
            Dignissimos eos laboriosam molestiae sunt vitae!
          </Typography>
          <Typography>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit.
            Consequatur, earum enim harum id ipsam ipsum minus necessitatibus
            praesentium quam quasi repellendus sit veritatis voluptatum!
            Dignissimos eos laboriosam molestiae sunt vitae!
          </Typography>
        </BottomSheetScrollView>
      </BottomSheet>
      <Button
        onPress={() => {
          bottomSheetRef2.current?.openBottomSheetModal();
        }}
      >
        Открыть модалку
      </Button>

      <Typography>Модалка с BottomSheetFlatList</Typography>
      <BottomSheet
        {...args}
        ref={bottomSheetRef3}
        onDismiss={() => {
          bottomSheetRef3.current?.closeBottomSheetModal();
        }}
      >
        <BottomSheetFlatList
          data={[
            1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19,
            20,
          ]}
          keyExtractor={(_, index) => String(index)}
          renderItem={({ item }) => {
            return (
              <View style={styles.modalContent}>
                <Typography>{item}</Typography>
              </View>
            );
          }}
        />
      </BottomSheet>
      <Button
        onPress={() => {
          bottomSheetRef3.current?.openBottomSheetModal();
        }}
      >
        Открыть модалку
      </Button>

      <Typography>Модалка с BottomSheetSectionList</Typography>
      <BottomSheet
        {...args}
        ref={bottomSheetRef4}
        onDismiss={() => {
          bottomSheetRef4.current?.closeBottomSheetModal();
        }}
      >
        <BottomSheetSectionList
          keyExtractor={(_, index) => index.toString()}
          renderItem={({ item }) => {
            return (
              <View style={styles.modalContent}>
                <Typography>{item}</Typography>
              </View>
            );
          }}
          renderSectionHeader={({ section }) => {
            return (
              <View style={[styles.modalContent, styles.sectionHeader]}>
                <Typography>{section.title}</Typography>
              </View>
            );
          }}
          sections={[
            { data: ['Item 1', 'Item 2'], title: 'Section 1' },
            { data: ['Item 3', 'Item 4'], title: 'Section 2' },
            { data: ['Item 3', 'Item 4'], title: 'Section 3' },
            { data: ['Item 3', 'Item 4'], title: 'Section 4' },
            { data: ['Item 3', 'Item 4'], title: 'Section 5' },
            { data: ['Item 3', 'Item 4'], title: 'Section 6' },
          ]}
        />
      </BottomSheet>
      <Button
        onPress={() => {
          bottomSheetRef4.current?.openBottomSheetModal();
        }}
      >
        Открыть модалку
      </Button>

      <Typography>Модалка с BottomSheetView и кастомным хедером</Typography>
      <BottomSheet
        {...args}
        handleComponent={handleComponent}
        ref={bottomSheetRef5}
        onDismiss={() => {
          bottomSheetRef5.current?.closeBottomSheetModal();
        }}
      >
        <BottomSheetView style={styles.modalContent}>
          <Typography>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit.
            Consequatur, earum enim harum id ipsam ipsum minus necessitatibus
            praesentium quam quasi repellendus sit veritatis voluptatum!
            Dignissimos eos laboriosam molestiae sunt vitae!
          </Typography>
        </BottomSheetView>
      </BottomSheet>

      <Button
        onPress={() => {
          bottomSheetRef5.current?.openBottomSheetModal();
        }}
      >
        Открыть модалку
      </Button>
    </ScrollView>
  );
};

const styles = StyleSheet.create((theme) => ({
  contentContainer: {
    flexGrow: 1,
    gap: 16,
    padding: 16,
  },
  customHeaderContainer: {
    alignItems: 'center',
    borderTopLeftRadius: theme.components.bottomSheet.borderRadius,
    borderTopRightRadius: theme.components.bottomSheet.borderRadius,
    flexDirection: 'row',
    paddingHorizontal: 8,
  },
  customHeaderTitleContainer: {
    alignItems: 'center',
    bottom: 0,
    justifyContent: 'center',
    left: 0,
    position: 'absolute',
    right: 0,
    top: 0,
  },
  modalContent: {
    gap: 16,
    padding: 16,
  },
  sectionHeader: {
    backgroundColor: theme.palette.surface.layer1,
  },
}));
