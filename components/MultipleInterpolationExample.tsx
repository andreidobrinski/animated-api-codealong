import React, { useState } from "react"
import { View, Animated, StyleSheet, Button, Easing } from "react-native"

export default function MultipleInterpolationExample() {
  const [animatedValue] = useState(new Animated.Value(0))
  const [didSlideUp, setDidSlideUp] = useState(false)

  function handlePress() {
    Animated.timing(animatedValue, {
      toValue: didSlideUp ? 0 : 1,
      useNativeDriver: true,
      duration: 300
    }).start()
    setDidSlideUp(!didSlideUp)
  }

  const backgroundColor = animatedValue.interpolate({
    inputRange: [0, 1],
    outputRange: ["red", "blue"]
  })

  const translateY = animatedValue.interpolate({
    inputRange: [0, 1],
    outputRange: [0, -150]
  })

  return (
    <View style={styles.container}>
      <Animated.View
        style={[
          styles.circle,
          { backgroundColor, transform: [{ translateY }] }
        ]}></Animated.View>
      <Button
        title={didSlideUp ? "slide down" : "slide up"}
        onPress={handlePress}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f6f6f6"
  },
  circle: {
    width: 200,
    height: 200,
    borderRadius: 100,
    marginBottom: 100,
    justifyContent: "center",
    alignItems: "center"
  }
})
