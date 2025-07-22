import { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, Animated } from "react-native";
import useSidebarStore from "../store/sidebar";

const WIDTH = 250;

export default function Sidebar() {
  const isOpen = useSidebarStore((state: any) => state.isSidebarOpen);
  const closeSidebar = useSidebarStore((state: any) => state.closeSidebar);

  const [animation] = useState(new Animated.Value(0));

  useEffect(() => {
    if (isOpen) {
      Animated.timing(animation, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      }).start();
    } else {
      Animated.timing(animation, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }).start();
    }
  }, [isOpen, animation, closeSidebar]);

  const translateX = animation.interpolate({
    inputRange: [0, 1],
    outputRange: [-WIDTH, 0],
  });

  if (!isOpen) return null;

  return (
    <Animated.View
      style={{ transform: [{ translateX }], width: WIDTH, height: "100%" }}
      className="absolute w-2/3 bg-white shadow-md mt-10"
    >
      <View className="p-4 border-b border-gray-200">
        <Text className="text-xl font-bold">Listas de Compras</Text>
      </View>
      <TouchableOpacity
        className="p-4 flex-row items-center border-b border-gray-200"
        onPress={closeSidebar}
      >
        <Text className="text-lg">Fechar a Sidebar</Text>
      </TouchableOpacity>
    </Animated.View>
  );
}
