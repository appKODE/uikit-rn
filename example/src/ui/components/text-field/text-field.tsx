import { forwardRef, useImperativeHandle, useRef } from 'react';
import { View } from 'react-native';

import {
  IconButton,
  TextField as TextFieldBase,
  type TextFieldProps as TextFieldBaseProps,
} from '@kode-frontend/uikit-rn/components';
import {
  CollapseTransition,
  FadeTransition,
  type TextInputRef,
} from '@kode-frontend/uikit-rn/primitives';
import { StyleSheet } from 'react-native-unistyles';

import { AlertHexagon, Delete } from '../../icons';

export type TextFieldProps = TextFieldBaseProps & {
  withClean?: boolean;
};

export const TextField = forwardRef<TextInputRef, TextFieldProps>(
  ({ trailingAddon, withClean = false, ...rest }, ref) => {
    const inputRef = useRef<TextInputRef>(null);

    const showCleanButton = withClean && !rest.disabled && Boolean(rest.value);

    const handleClean = () => {
      rest.onChangeText?.('');
      inputRef.current?.focus();
    };

    useImperativeHandle(ref, () => inputRef.current!);

    return (
      <TextFieldBase
        ref={inputRef}
        {...rest}
        trailingAddon={
          <View style={styles.trailingAddon}>
            <FadeTransition show={showCleanButton} unmountWhenFade="full">
              <IconButton
                size="medium"
                style={styles.cleanButton}
                variant="ghostNeutral"
                onPress={handleClean}
              >
                <Delete size={24} />
              </IconButton>
            </FadeTransition>

            {trailingAddon}

            <CollapseTransition
              horizontal
              collapsed={!rest.error}
              unmountWhenFade="full"
            >
              <AlertHexagon color="iconNegative" size={24} />
            </CollapseTransition>
          </View>
        }
      />
    );
  }
);

const styles = StyleSheet.create({
  cleanButton: {
    borderRadius: 999,
    marginHorizontal: -10,
    marginVertical: -10,
  },
  trailingAddon: {
    flexDirection: 'row',
    gap: 8,
  },
});
