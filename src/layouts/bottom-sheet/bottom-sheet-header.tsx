import { type ReactNode, memo, useCallback, useMemo, useState } from 'react';
import {
  type FlexAlignType,
  type LayoutChangeEvent,
  type StyleProp,
  View,
  type ViewStyle,
} from 'react-native';

import { StyleSheet } from 'react-native-unistyles';

import type { TypographyVariants } from '../../types';

import { Typography } from '../../primitives';

/**
 * Тип для выравнивания заголовка
 * @default 'center'
 */
type TitleAlignment = 'center' | 'left' | 'right';

// Свойства для бокового контента (кнопки слева/справа от заголовка)
type SideContentProps = {
  content: () => ReactNode;
  sideLayoutStyle: StyleProp<ViewStyle>;
  titleAlign: TitleAlignment;
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
  titleAlign?: TitleAlignment;
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
  titleStyle,
  titleVariant = 'subhead1',
}: BottomSheetHeaderProps) => {
  // Состояние для хранения ширины боковых элементов,
  // используется для выравнивания заголовка по центру
  const [contentWidths, setContentWidths] = useState({ left: 0, right: 0 });

  // Обработчик изменения размеров боковых элементов,
  // обновляет состояние с шириной левой/правой части
  const handleContentLayout = useCallback(
    (isRight: boolean): ((event: LayoutChangeEvent) => void) | undefined => {
      if (titleAlign !== 'center') {
        return;
      }

      return (event: LayoutChangeEvent) => {
        const { width } = event.nativeEvent.layout;
        setContentWidths((prev) => ({
          ...prev,
          [isRight ? 'right' : 'left']: Math.ceil(width),
        }));
      };
    },
    [titleAlign]
  );

  // Стили для бокового контейнера
  // Ширина вычисляется на основе самой широкой из боковых частей
  const sideLayoutStyle = useMemo<ViewStyle>(
    () => ({
      width:
        titleAlign === 'center'
          ? (Math.max(contentWidths.left, contentWidths.right) as number) ||
            'auto'
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
  const renderEmptyContent = useCallback(
    (isRight: boolean) => {
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
    },
    [renderLeft, renderRight, titleAlign, sideLayoutStyle]
  );

  const renderSideContent = useCallback(
    (content: () => ReactNode, isRight: boolean) => (
      <SideContent
        content={content}
        sideLayoutStyle={sideLayoutStyle}
        titleAlign={titleAlign}
        isRight={isRight}
        onLayout={handleContentLayout(isRight)}
      />
    ),
    [handleContentLayout, sideLayoutStyle, titleAlign]
  );

  const renderContent = useCallback(
    ({
      content,
      isRight,
    }: {
      content: (() => ReactNode) | undefined;
      isRight: boolean;
    }) =>
      content
        ? renderSideContent(content, isRight)
        : renderEmptyContent(isRight),
    [renderSideContent, renderEmptyContent]
  );

  return (
    <View style={[styles.container, style]}>
      {renderContent({ content: renderLeft, isRight: false })}

      <View style={titleContainerStyle}>
        {title ? (
          <View style={titleWrapperStyle}>
            <Typography numberOfLines={1} variant={titleVariant}>
              {title}
            </Typography>
          </View>
        ) : null}
      </View>

      {renderContent({ content: renderRight, isRight: true })}
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
