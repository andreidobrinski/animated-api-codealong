import React, { useState } from "react"
import { View, Animated, StyleSheet, Easing, Button } from "react-native"

export default function CombiningExample() {
  const [[translateXValue, rotateValue, scaleValue]] = useState([
    new Animated.Value(0),
    new Animated.Value(0),
    new Animated.Value(0)
  ])

  function animate() {
    Animated.sequence([
      Animated.timing(rotateValue, {
        toValue: 1,
        duration: 1000,
        easing: Easing.sin,
        useNativeDriver: true
      }),
      Animated.timing(translateXValue, {
        toValue: 1,
        duration: 1000,
        easing: Easing.bounce,
        useNativeDriver: true
      }),
      Animated.timing(scaleValue, {
        toValue: 1,
        duration: 1000,
        easing: Easing.elastic(6),
        useNativeDriver: true
      })
    ]).start()
  }

  const rotate = rotateValue.interpolate({
    inputRange: [0, 1],
    outputRange: ["0deg", "90deg"]
  })
  const translateX = translateXValue.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 150]
  })
  const scale = scaleValue.interpolate({
    inputRange: [0, 1],
    outputRange: [1, 0.6]
  })

  return (
    <View style={styles.container}>
      <Animated.View style={[styles.square, { transform: [{ rotate }] }]} />
      <Animated.View style={[styles.square, { transform: [{ translateX }] }]} />
      <Animated.View style={[styles.square, { transform: [{ scale }] }]} />
      <View>
        <Button title="animate" onPress={animate} />
        <Button
          title="reset"
          onPress={() =>
            [translateXValue, rotateValue, scaleValue].forEach(v =>
              v.setValue(0)
            )
          }
        />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f6f6f6",
    justifyContent: "space-around",
    alignItems: "center",
    paddingVertical: 150
  },
  square: { width: 50, height: 50, backgroundColor: "red" }
})
