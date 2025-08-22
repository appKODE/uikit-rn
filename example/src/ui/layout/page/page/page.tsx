import { forwardRef } from 'react';
import { type ScrollView } from 'react-native';

import {
  Page as PageBase,
  type PageProps as PageBaseProps,
} from '@kode-frontend/uikit-rn/layouts';

import { PageHeader, type PageHeaderProps } from '../page-header';

export type PageProps = PageBaseProps & PageHeaderProps;

export const Page = forwardRef<ScrollView, PageProps>(
  ({ children, subtitle, title, ...rest }, ref) => {
    return (
      <PageBase ref={ref} {...rest} gap={16} keyboardBottomOffset={40}>
        {title || subtitle ? (
          <PageHeader subtitle={subtitle} title={title} />
        ) : null}

        {children}
      </PageBase>
    );
  }
);
