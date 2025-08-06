### Snackbar

TODO: описание компонента и свойств, использование

#### Customization

Чтобы добавить новые свойства для снеков, необходимо расширить интерфейс ISnack

```
// snack.d.ts

import type { ISnack as Base } from '@kode-frontend/uikit-rn/components'

declare module '@kode-frontend/uikit-rn/components' {
  export interface ISnack extends Base {
    type: 'regular' | 'negative' | 'positive'
  }
}
```
