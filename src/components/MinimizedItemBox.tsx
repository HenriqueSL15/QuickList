import React from "react";
import FontAwesome6 from "@react-native-vector-icons/fontawesome6";
import { View, Text, TouchableWithoutFeedback } from "react-native";
import useListStore from "../store/list";
import { setUserData } from "../app/utils/user.utils";
import Item from "../app/types/Item";
import MinimizedItem from "../app/types/MinimizedItem";

/**
 * Componente que representa uma visão minimizada de um item da lista de compras.
 * Exibe o nome do item e permite alternar os estados checked e minimizado.
 *
 * @param {MinimizedItem} props - As propriedades do item minimizado, incluindo id, status checked, nome e estado minimizado.
 */
export default function MinimizedItemBox({
  id,
  checked,
  name,
  minimized,
}: MinimizedItem) {
  // Hooks do Zustand para atualizar a lista e remover itens
  const updateCurrentList = useListStore((state) => state.updateCurrentList);
  const removeItem = useListStore((state) => state.removeItem);

  /**
   * Manipula mudanças nos campos de entrada, sanitizando e atualizando a store conforme necessário.
   * Também persiste os dados do usuário após a atualização.
   *
   * @param {number} id - O id do item que está sendo atualizado.
   * @param {string} field - O nome do campo que está sendo atualizado.
   * @param {string} value - O novo valor do campo.
   */
  const handleInputChage = (
    id: number,
    field: keyof Item,
    value: string | boolean
  ) => {
    if (field === "price" || field === "realPrice") {
      const filteredValue = (value as string).replace(/[^0-9.,]/g, "");
      const numericValue = filteredValue.replace(",", ".");
      updateCurrentList(id, field, numericValue);
    } else if (field === "quantity" || field === "realQuantity") {
      const filteredValue = (value as string).replace(/[^0-9.,]/g, "");
      const numericValue = Number(filteredValue);
      updateCurrentList(id, field, numericValue);
    } else {
      updateCurrentList(id, field, value);
    }

    // Persiste a lista atualizada nos dados do usuário
    const userData = useListStore.getState().currentList;
    setUserData(userData);
  };

  return (
    <View className="bg-card shadow-md rounded-lg p-4 mb-4 border border-input flex-row justify-between">
      <View className="flex-row gap-3">
        {/* Alternar checkbox para status checked do item */}
        <TouchableWithoutFeedback
          onPress={() => handleInputChage(id, "checked", !checked as any)}
        >
          {checked ? (
            <View className="border border-emerald-500 rounded-md min-h-6 min-w-6"></View>
          ) : (
            <FontAwesome6
              name="square-check"
              size={22}
              color="#10b981"
              iconStyle="solid"
            />
          )}
        </TouchableWithoutFeedback>

        {/* Exibe o nome do item */}
        <Text>{name}</Text>
      </View>
      <TouchableWithoutFeedback>
        <View className="bg-red-500"></View>
      </TouchableWithoutFeedback>
      <View className="flex-row gap-3">
        {/* Alternar estado minimizado */}
        <TouchableWithoutFeedback
          onPress={() => updateCurrentList(id, "minimized", !minimized)}
        >
          {minimized ? (
            <FontAwesome6
              name="angle-down"
              color="green"
              size={20}
              iconStyle="solid"
            />
          ) : (
            <FontAwesome6
              name="angle-up"
              color="green"
              size={20}
              iconStyle="solid"
            />
          )}
        </TouchableWithoutFeedback>
        {/* Botão para remover item */}
        <TouchableWithoutFeedback onPress={() => removeItem(id)}>
          <FontAwesome6
            name="trash-can"
            color="red"
            size={20}
            iconStyle="solid"
          />
        </TouchableWithoutFeedback>
      </View>
    </View>
  );
}
