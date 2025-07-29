import { TouchableOpacity, View, Text } from "react-native";
import useListStore from "../store/list";
import { setUserData } from "../app/utils/user.utils";

export default function NewItemButton() {
  const currentList = useListStore((state) => state.currentList);
  const addItem = useListStore((state) => state.addItem);

  const highestId = currentList.items.reduce((highestId, currentItem) => {
    return Math.max(highestId, currentItem.id);
  }, 0);

  const defaultItem = {
    id: highestId + 1,
    name: "",
    checked: false,
    quantity: 0,
    realQuantity: 0,
    price: 0,
    realPrice: 0,
  };

  const handleNewItem = () => {
    addItem(defaultItem);
    const userData = useListStore.getState().currentList;
    setUserData(userData);
  };

  return (
    <TouchableOpacity onPress={handleNewItem}>
      <View className="w-full ring-offset-background bg-primary items-center justify-center h-14 rounded-lg my-5">
        <Text className="text-lg font-bold text-primary-foreground">
          Adicionar item
        </Text>
      </View>
    </TouchableOpacity>
  );
}
