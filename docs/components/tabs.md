## Tabs

Используется для навигации вложенного уровня (поздразделы текущего раздела)

<hr />

### Свойства (для группы табов)

#### dividerColor?: BorderColorKeys
Цвет нижней обводки (по дефолту прозрачная)

#### indicatorStyles?: StyleProp<ViewStyle>
Стили для подчеркивания активного таба (по дефолту цвет iconAccent и высота 4px)

<hr />

### Свойства (для отдельного таба)

#### isSelected?: boolean
Переключает выбранное состояние компонента

#### isDisabled?: boolean
Переключает недоступное состояние компонента

#### labelText: string
Текст лейбла

#### leadingAddon?: ReactElement
Слот для компонента расположенного в начале (например иконка)

#### trailingAddon?: ReactElement
Слот для компонента расположенного в конце (например иконка)

#### tabStyles?: StyleProp<ViewStyle>
Стили для контейнера таба (по дефолту высота таба 44px)

#### textColor?: TypographyColorKeys
Цвет лейбла (по дефолту textPrimary)

#### textDisabledColor?: TypographyColorKeys
Цвет лейбла при состоянии isDisabled (по дефолту textDisabled)

#### iconColor?: IconColorKeys
Цвет иконки (по дефолту iconPrimary)
