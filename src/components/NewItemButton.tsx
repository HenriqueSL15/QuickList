import { TouchableOpacity, View, Text } from "react-native";
import useListStore from "../store/list";
import { setUserData } from "../app/utils/user.utils";
import Item from "../app/types/Item";

/**
 * Componente botão para adicionar um novo item à lista de compras.
 * Atribui automaticamente um novo id único ao item.
 */
export default function NewItemButton() {
  // Acessa a lista atual e a ação addItem da store Zustand
  const currentList = useListStore((state) => state.currentList);
  const addItem = useListStore((state) => state.addItem);

  // Determina o maior id atual para atribuir um novo id único
  const highestId = currentList.items.reduce(
    (highestId: number, currentItem: Item) => {
      return Math.max(highestId, currentItem.id);
    },
    0
  );

  // Novo item padrão com campos vazios ou zerados
  const defaultItem: Item = {
    id: highestId + 1,
    name: "",
    checked: false,
    quantity: 0,
    realQuantity: 0,
    price: 0,
    realPrice: 0,
    minimized: false,
  };

  /**
   * Manipulador para adicionar o novo item à lista e persistir os dados do usuário.
   */
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
