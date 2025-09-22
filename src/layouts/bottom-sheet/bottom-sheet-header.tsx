import { type ReactNode, memo, useMemo } from 'react';
import {
  type FlexAlignType,
  type LayoutChangeEvent,
  type StyleProp,
  View,
  type ViewStyle,
} from 'react-native';

import { StyleSheet } from 'react-native-unistyles';

import type { TypographyColorKeys, TypographyVariants } from '../../types';

import { Typography } from '../../primitives';
import { useHeaderLayout } from './hooks/use-header-layout';
import { type BottomSheetHeaderTitleAlignment } from './types';

// Свойства для бокового контента (кнопки слева/справа от заголовка)
type SideContentProps = {
  content: () => ReactNode;
  sideLayoutStyle: StyleProp<ViewStyle>;
  titleAlign: BottomSheetHeaderTitleAlignment;
  isRight: boolean;
  onLayout?: (event: LayoutChangeEvent) => void;
};

// Свойства компонента BottomSheetHeader
type BottomSheetHeaderProps = {
  /** Компонент для отображения слева от заголовка */
  renderLeft?: () => ReactNode;
  /** Компонент для отображения справа от заголовка */
  renderRight?: () => ReactNode;
  /** Кастомные стили для контейнера хедера */
  style?: StyleProp<ViewStyle>;
  /** Текст заголовка */
  title?: string;
  /** Выравнивание заголовка (по умолчанию: 'center') */
  titleAlign?: BottomSheetHeaderTitleAlignment;
  /** Вариант цвета для заголовка */
  titleColor?: TypographyColorKeys;
  /** Кастомные стили для контейнера заголовка */
  titleStyle?: StyleProp<ViewStyle>;
  /** Вариант типографики для заголовка (по умолчанию: 'subhead1') */
  titleVariant?: TypographyVariants;
};

// Компонент для отрисовки бокового контента (кнопок слева/справа)
const SideContent = memo<SideContentProps>(
  ({ content, sideLayoutStyle, titleAlign, isRight, onLayout }) => (
    <View
      style={[
        styles.sideContainer,
        isRight && styles.rightContainer,
        titleAlign === 'center' && sideLayoutStyle,
      ]}
      onLayout={onLayout}
    >
      {content()}
    </View>
  )
);

/**
 * Настраиваемый компонент хедера для BottomSheet.
 * Поддерживает выравнивание заголовка по левому краю, центру или правому краю,
 * а также кастомные компоненты по бокам.
 */
export const BottomSheetHeader = ({
  renderLeft,
  renderRight,
  style,
  title,
  titleAlign = 'center',
  titleColor,
  titleStyle,
  titleVariant = 'subhead1',
}: BottomSheetHeaderProps) => {
  const { contentWidths, handleLayout } = useHeaderLayout(titleAlign);

  // Стили для бокового контейнера
  // Ширина вычисляется на основе самой широкой из боковых частей
  const sideLayoutStyle = useMemo<ViewStyle>(
    () => ({
      width:
        titleAlign === 'center'
          ? Math.max(contentWidths.left, contentWidths.right) || 'auto'
          : undefined,
    }),
    [titleAlign, contentWidths.left, contentWidths.right]
  );

  // Выравнивание заголовка
  const titleAlignment = useMemo<FlexAlignType>(() => {
    if (titleAlign === 'left') {
      return 'flex-start';
    } else if (titleAlign === 'right') {
      return 'flex-end';
    } else {
      return 'center';
    }
  }, [titleAlign]);

  const titleWrapperStyle = useMemo<StyleProp<ViewStyle>>(
    () => [styles.titleWrapper, { alignItems: titleAlignment }],
    [titleAlignment]
  );

  const titleContainerStyle = useMemo<StyleProp<ViewStyle>>(
    () => [styles.titleContainer, titleStyle],
    [titleStyle]
  );

  // Рендер псевдо-контента для выравнивания
  const renderEmptyContent = (isRight: boolean) => {
    if (
      (isRight && titleAlign === 'right') ||
      (!isRight && titleAlign === 'left')
    ) {
      return null;
    }

    const oppositeContent = isRight ? renderLeft : renderRight;

    if (!oppositeContent) {
      return null;
    }

    return (
      <View
        pointerEvents="none"
        style={[
          styles.sideContainer,
          isRight && styles.rightContainer,
          titleAlign === 'center' && sideLayoutStyle,
          styles.hidden,
        ]}
      >
        {oppositeContent()}
      </View>
    );
  };

  const renderSideContent = (content: () => ReactNode, isRight: boolean) => (
    <SideContent
      content={content}
      sideLayoutStyle={sideLayoutStyle}
      titleAlign={titleAlign}
      isRight={isRight}
      onLayout={handleLayout(isRight)}
    />
  );

  const renderContent = (
    content: (() => ReactNode) | undefined,
    isRight: boolean
  ) => {
    return content
      ? renderSideContent(content, isRight)
      : renderEmptyContent(isRight);
  };

  return (
    <View style={[styles.container, style]}>
      {renderContent(renderLeft, false)}

      <View style={titleContainerStyle}>
        {title ? (
          <View style={titleWrapperStyle}>
            <Typography
              color={titleColor}
              numberOfLines={1}
              variant={titleVariant}
            >
              {title}
            </Typography>
          </View>
        ) : null}
      </View>

      {renderContent(renderRight, true)}
    </View>
  );
};

const styles = StyleSheet.create((theme) => {
  const { borderRadius, contentBackgroundColor } = theme.components.bottomSheet;

  return {
    container: {
      alignItems: 'center',
      backgroundColor: theme.palette.surface[contentBackgroundColor],
      borderTopLeftRadius: borderRadius,
      borderTopRightRadius: borderRadius,
      flexDirection: 'row',
      minHeight: 56,
      overflow: 'hidden',
      paddingHorizontal: 16,
      paddingVertical: 6,
    },
    hidden: {
      opacity: 0,
    },
    rightContainer: {
      alignItems: 'flex-end',
      marginLeft: 16,
      marginRight: 0,
    },
    sideContainer: {
      alignItems: 'flex-start',
      justifyContent: 'center',
      marginRight: 16,
      minHeight: 44,
      minWidth: 44,
    },
    titleContainer: {
      flex: 1,
      justifyContent: 'center',
    },
    titleWrapper: {
      justifyContent: 'center',
      width: '100%',
    },
  };
});
