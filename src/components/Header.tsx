import { View, Text, TouchableOpacity } from "react-native";
import "../../global.css";
import useSidebarStore from "../store/sidebar";

export default function Header() {
  const enableSidebar = useSidebarStore((state) => state.openSidebar);
  return (
    <View className="flex-row items-center justify-start max-h-32 my-10 mx-10 gap-10">
      <TouchableOpacity onPress={enableSidebar}>
        <Text>Abrir</Text>
      </TouchableOpacity>
      <Text>Quick List</Text>
    </View>
  );
}
