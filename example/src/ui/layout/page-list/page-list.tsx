import {
  PageList as PageListBase,
  type PageListProps as PageListBaseProps,
} from '@kode-frontend/uikit-rn/layouts';

import { PageHeader, type PageHeaderProps } from './page-header';
import { StyleSheet } from 'react-native-unistyles';
import { type ForwardedRef, forwardRef, type ReactElement } from 'react';
import type { FlatList } from 'react-native';

export type PageProps<T> = PageListBaseProps<T> & PageHeaderProps;

const PageListInner = <T extends any>(
  { subtitle, title, ...rest }: PageProps<T>,
  ref: ForwardedRef<FlatList<T>>
) => {
  return (
    <PageListBase
      ref={ref}
      ListHeaderComponent={<PageHeader subtitle={subtitle} title={title} />}
      ListHeaderComponentStyle={styles.header}
      {...rest}
    />
  );
};

export const PageList = forwardRef(PageListInner) as <T>(
  props: PageProps<T> & { ref?: ForwardedRef<FlatList<T>> }
) => ReactElement;

const styles = StyleSheet.create({
  header: {
    marginBottom: 12,
  },
});
