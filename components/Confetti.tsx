import React, { useState } from "react"
import { Animated, View, StyleSheet, Dimensions, Easing, Button } from "react-native"

const CONFETTI_COLORS = ["#623cea", "#ffe66d", "#06d6a0", "#cc3363", "#00bbf9"]

export default function Confetti({
  numConfetti = 60
}: {
  numConfetti?: number
}) {
  const [animatedValue] = useState(new Animated.Value(0))
  const dimensions = Dimensions.get('screen')

  return (
    <View style={[StyleSheet.absoluteFill], justifyContent: 'center', alignItems: 'center' }>
      {[...Array(numConfetti)].map((_, index) => {
        const backgroundColor = CONFETTI_COLORS[index % CONFETTI_COLORS.length]

        const startX = Math.random() * dimensions.width
        const endX = Math.random() * dimensions.width
        const translateX = animatedValue.interpolate({
          inputRange: [0, 1],
          outputRange: [startX, endX]
        })

        let startY = 0
        startY -= styles.confettiBit.width
        startY -= Math.random() * Dimensions.height
        let endY = dimensions.height
        endY += styles.confettiBit.width
        endY += Math.random() * Dimensions.height
        const translateY = animatedValue.interpolate({
          inputRange: [0, 1],
          outputRange: [startY, endY]
        })

        const rotateStart = Math.random() * 360
        const rotateEnd = rotateStart + 720 + Math.random() * 360 * 8
        const rotate = animatedValue.interpolate({
          inputRange: [0, 1],
          outputRange: [rotateStart, rotateEnd]
        })

        const rotateXStart = Math.random() * 360
        const rotateXEnd = rotateStart + 720 + Math.random() * 360 * 19
        const rotateX = animatedValue.interpolate({
          inputRange: [0, 1],
          outputRange: [rotateStart, rotateEnd]
        })

        return (
          <Animated.View
            key={index}
            style={[styles.confettiBit, { backgroundColor,
              transform: [
                { translateX}, { translateY}, { rotate }, { rotateX }
              ]
             }]
            }
          />
        )
      })}
      <Button
        title="confetti"
        onPress={() => {
          animatedValue.setValue(0)
          Animated.timing(animatedValue, {
            toValue: 1,
            duration: 8000,
            useNativeDriver: true,
            easing: Easing.out(Easing.quad)
          }).start()
        }}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  confettiBit: {
    width: 25,
    height: 10,
    borderRadius: 5,
    position: 'absolute',
    top: 0,
    left: 0,
  }
})
