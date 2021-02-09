import React from "react"
import { Animated, View, StyleSheet } from "react-native"

const CONFETTI_COLORS = ["#623cea", "#ffe66d", "#06d6a0", "#cc3363", "#00bbf9"]

export default function Confetti({
  numConfetti = 60
}: {
  numConfetti?: number
}) {
  return (
    <View style={[StyleSheet.absoluteFill]}>
      {[...Array(numConfetti)].map((_, index) => {
        const backgroundColor = CONFETTI_COLORS[index % CONFETTI_COLORS.length]

        return (
          <Animated.View
            key={index}
            style={[styles.confettiBit, { backgroundColor }]}
          />
        )
      })}
    </View>
  )
}

const styles = StyleSheet.create({
  confettiBit: {
    width: 25,
    height: 10,
    borderRadius: 5
  }
})
