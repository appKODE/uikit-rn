import { type Ref, useCallback, useImperativeHandle, useRef } from 'react'
import { Keyboard } from 'react-native'

import { type BottomSheetModal } from '@gorhom/bottom-sheet'

import type { BottomSheetRef } from '../types'

type Props = {
  ref: Ref<BottomSheetRef>
}

export const useAddRefHandlers = ({ ref }: Props) => {
  const bottomSheetModalRef = useRef<BottomSheetModal>(null)

  const openBottomSheetModal = useCallback(() => {
    Keyboard.dismiss()
    bottomSheetModalRef.current?.present()
  }, [])

  const closeBottomSheetModal = useCallback(() => {
    bottomSheetModalRef.current?.dismiss()
  }, [])

  useImperativeHandle(
    ref,
    () => ({
      closeBottomSheetModal,
      openBottomSheetModal,
    }),
    [closeBottomSheetModal, openBottomSheetModal],
  )

  return {
    bottomSheetModalRef,
  }
}
