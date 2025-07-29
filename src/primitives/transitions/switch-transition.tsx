import React, { useEffect, useState } from 'react'
import { type StyleProp, type ViewStyle } from 'react-native'

import Animated, {
  interpolate,
  runOnJS,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated'

const getIndex = (array: React.ReactNode[], active: number) => {
  if (active > array.length - 1) {
    return array.length - 1
  }
  if (active < 0) {
    return 0
  }
  return active
}

export type SwitchTransitionProps = {
  active: number
  children?: React.ReactNode
  duration?: number
  interpolateOpacity?: number
  interpolateScale?: number
  style?: StyleProp<ViewStyle>
}

export const SwitchTransition = ({
  active,
  children,
  duration = 100,
  interpolateOpacity = 1,
  interpolateScale = 0.9,
  style,
}: SwitchTransitionProps) => {
  const [activeElement, setActiveElement] = useState(active)
  const transition = useSharedValue<number>(0)

  const animatedStyles = useAnimatedStyle(() => {
    const scale = interpolate(transition.value, [0, 1], [1, interpolateScale])

    const opacity = interpolate(
      transition.value,
      [0, 1],
      [1, interpolateOpacity],
    )

    return {
      opacity,
      transform: [{ scale }],
    }
  })

  const items = React.Children.toArray(children)

  useEffect(() => {
    const setActiveJS = () => {
      setActiveElement(getIndex(items, active))
    }
    if (activeElement !== active) {
      transition.value = withTiming(1, { duration }, finished => {
        if (finished) {
          runOnJS(setActiveJS)()
        }
      })
    } else {
      transition.value = withTiming(0, { duration })
    }
  }, [active, transition, activeElement, setActiveElement, items, duration])

  return (
    <Animated.View style={[style, animatedStyles]}>
      {items[activeElement]}
    </Animated.View>
  )
}
