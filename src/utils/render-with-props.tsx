import React, {
  type ComponentType,
  type ReactNode,
  isValidElement,
} from 'react';

export const renderWithProps = <T extends object>(
  renderable: ComponentType<T> | ReactNode,
  additionalProps: Partial<T> = {}
): ReactNode => {
  // valid JSX element like <IconCard />
  if (isValidElement<T>(renderable)) {
    const mergedProps = {
      ...additionalProps,
      ...renderable.props,
    };

    return React.cloneElement(renderable, mergedProps);
  }

  // component type like IconCard
  if (typeof renderable === 'function') {
    const Component = renderable as ComponentType<T>;
    return <Component {...(additionalProps as T)} />;
  }

  // something else (string, number, null, etc.)
  return renderable;
};
