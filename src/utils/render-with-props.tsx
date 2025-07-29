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
    return React.cloneElement(renderable, additionalProps);
  }

  // component type like IconCard
  if (typeof renderable === 'function') {
    const Component = renderable as ComponentType<T>;
    return <Component {...(additionalProps as T)} />;
  }

  // something else (string, number, null, etc.)
  return renderable;
};
