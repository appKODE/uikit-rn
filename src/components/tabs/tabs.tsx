import { useRef, useState, useEffect } from 'react';
import { ScrollView, View, type LayoutChangeEvent } from 'react-native';
import { StyleSheet } from 'react-native-unistyles';
import { type TabProps, type TabGroupProps } from './types';
import { Tab } from './tab';
import { type BorderColorKeys } from '../../types';

export type TabsProps = TabGroupProps & {
  tabs: TabProps[];
  activeTab: string;
  onChange: (id: string) => void;
};

export const Tabs = ({
  tabs,
  activeTab,
  onChange,
  dividerColor,
  ...tabProps
}: TabsProps) => {
  const scrollRef = useRef<ScrollView | null>(null);

  const [tabsLayouts, setTabsLayouts] = useState<
    Record<string, { x: number; width: number }>
  >({});

  const [scrollViewWidth, setScrollViewWidth] = useState(0);
  const [contentWidth, setContentWidth] = useState(0);

  const handleTabLayout = (id: string) => (e: LayoutChangeEvent) => {
    const { x, width } = e.nativeEvent.layout;
    setTabsLayouts((prev) => ({ ...prev, [id]: { x, width } }));
  };

  const handleScrollViewLayout = (e: LayoutChangeEvent) => {
    setScrollViewWidth(e.nativeEvent.layout.width);
  };

  const handleContentSizeChange = (w: number) => {
    setContentWidth(w);
  };

  useEffect(() => {
    if (!scrollRef.current) {
      return;
    }
    const layout = tabsLayouts[activeTab];

    if (!layout) {
      return;
    }

    const target = layout.x - scrollViewWidth / 2 + layout.width / 2;

    const clamped = Math.max(
      0,
      Math.min(target, contentWidth - scrollViewWidth)
    );

    scrollRef.current.scrollTo({
      x: clamped,
      animated: true,
    });
  }, [activeTab, tabsLayouts, scrollViewWidth, contentWidth]);

  return (
    <View>
      <ScrollView
        ref={scrollRef}
        horizontal
        showsHorizontalScrollIndicator={false}
        onLayout={handleScrollViewLayout}
        onContentSizeChange={handleContentSizeChange}
        contentContainerStyle={styles.scrollContent(dividerColor)}
      >
        {tabs.map((tab) => (
          <Tab
            {...tab}
            {...tabProps}
            key={tab.id}
            onPress={onChange}
            onLayout={handleTabLayout}
            isSelected={tab.id === activeTab}
          />
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create((theme) => ({
  scrollContent: (dividerColor?: BorderColorKeys) => ({
    paddingHorizontal: 8,
    borderBottomWidth: 1,
    borderBottomColor: dividerColor
      ? theme.palette.all[dividerColor]
      : 'transparent',
  }),
}));
