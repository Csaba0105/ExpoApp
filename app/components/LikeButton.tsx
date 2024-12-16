import React, { useEffect } from "react";
import Animated, {
  useSharedValue,
  withSpring,
  useAnimatedStyle,
  Extrapolate,
  interpolate,
} from "react-native-reanimated";
import { Pressable, StyleSheet } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";

type LikeButtonProps = {
  liked: boolean; // Azt jelzi, hogy a szív már "lájkolt-e"
  onPress?: () => void; // Opcionális callback, ami a gomb megnyomásakor hívódik meg
};

const LikeButton: React.FC<LikeButtonProps> = ({ liked, onPress }) => {
  const likedValue = useSharedValue(liked ? 1 : 0);

  // Frissítjük az animált értéket, ha a `liked` prop változik
  useEffect(() => {
    likedValue.value = withSpring(liked ? 1 : 0);
  }, [liked]);

  const outlineStyle = useAnimatedStyle(() => ({
    transform: [
      {
        scale: interpolate(likedValue.value, [0, 1], [1, 0], Extrapolate.CLAMP),
      },
    ],
  }));

  const fillStyle = useAnimatedStyle(() => ({
    transform: [
      {
        scale: likedValue.value,
      },
    ],
    opacity: likedValue.value,
  }));

  const handlePress = () => {
    likedValue.value = withSpring(likedValue.value ? 0 : 1);
    if (onPress) {
      onPress();
    }
  };

  return (
    <Pressable onPress={handlePress}>
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