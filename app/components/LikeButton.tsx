import React from "react";
import Animated, {
  useSharedValue,
  withSpring,
  useAnimatedStyle,
  Extrapolate,
  interpolate,
} from "react-native-reanimated";
import { Pressable, View, StyleSheet } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";

const LikeButton = ({ onPress }) => {
  const liked = useSharedValue(0);

  const outlineStyle = useAnimatedStyle(() => ({
    transform: [
      {
        scale: interpolate(liked.value, [0, 1], [1, 0], Extrapolate.CLAMP),
      },
    ],
  }));

  const fillStyle = useAnimatedStyle(() => ({
    transform: [
      {
        scale: liked.value,
      },
    ],
    opacity: liked.value,
  }));

  return (
    <Pressable
      onPress={() => {
        liked.value = withSpring(liked.value ? 0 : 1);
        if (onPress) onPress();
      }}
    >
      <Animated.View style={[StyleSheet.absoluteFillObject, outlineStyle]}>
        <MaterialCommunityIcons name={"heart-outline"} size={32} color={"black"} />
      </Animated.View>
      <Animated.View style={fillStyle}>
        <MaterialCommunityIcons name={"heart"} size={32} color={"red"} />
      </Animated.View>
    </Pressable>
  );
};

export default LikeButton;
