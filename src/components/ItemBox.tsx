import React from "react";
import FontAwesome6 from "@react-native-vector-icons/fontawesome6";
import { View, Text, TouchableWithoutFeedback, TextInput } from "react-native";

import useListStore from "../store/list";

import { setUserData } from "../app/utils/user.utils";
import { realTotal, total } from "../app/utils/totals.utils";

import Item from "../app/types/Item";

/**
 * Componente que representa um único item na lista de compras.
 * Exibe detalhes do item e permite edição e interação.
 *
 * @param {Item} props - As propriedades do item, incluindo id, status checked, nome, quantidades, preços e estado minimizado.
 */
export default function ItemBox({
  id,
  checked,
  name,
  quantity,
  realQuantity,
  price,
  realPrice,
  minimized,
}: Item) {
  // Hooks do Zustand para atualizar a lista e remover itens
  const updateCurrentList = useListStore((state) => state.updateCurrentList);
  const removeItem = useListStore((state) => state.removeItem);
  const currentList = useListStore((state) => state.currentList);

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
    value: string
  ): void => {
    if (field === "price" || field === "realPrice") {
      // Permite apenas números, pontos e vírgulas; converte vírgula para ponto para valor numérico
      const filteredValue = value.replace(/[^0-9.,]/g, "");
      const numericValue = filteredValue.replace(",", ".");
      updateCurrentList(id, field, numericValue);
    } else if (field === "quantity" || field === "realQuantity") {
      // Permite apenas números, pontos e vírgulas; converte para número
      const filteredValue = value.replace(/[^0-9.,]/g, "");
      const numericValue = Number(filteredValue);
      updateCurrentList(id, field, numericValue);
    } else {
      // Para outros campos, atualiza diretamente
      updateCurrentList(id, field, value);
    }

    // Persiste a lista atualizada nos dados do usuário
    const userData = useListStore.getState().currentList;
    setUserData(userData);
  };

  return (
    <View className="bg-card shadow-md rounded-lg p-4 mb-4 border border-input gap-6">
      <View className="flex-row justify-between">
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

          <Text>Já comprado</Text>
        </View>
        <View className="flex-row gap-3">
          {/* Alternar estado minimizado */}
          <TouchableWithoutFeedback
            onPress={() => updateCurrentList(id, "minimized", !minimized)}
          >
            {minimized ? (
              <FontAwesome6
                name="angle-up"
                color="green"
                size={20}
                iconStyle="solid"
              />
            ) : (
              <FontAwesome6
                name="angle-down"
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
      {/* Entrada para nome do item */}
      <TextInput
        className="w-full h-10 rounded-lg border border-input bg-background px-3 py-2"
        placeholder="Nome do Produto"
        value={name}
        onChangeText={(text) => handleInputChage(id, "name", text)}
      />

      <View className="flex-row justify-between">
        {/* Entrada para quantidade */}
        <View className="w-[47%]">
          <Text className="text-xs">Qtd</Text>
          <TextInput
            className="w-full h-10 rounded-lg border border-input bg-background px-3 py-2"
            placeholder="0"
            value={String(quantity)}
            onChangeText={(text) => handleInputChage(id, "quantity", text)}
          />
        </View>
        {/* Entrada para quantidade real */}
        <View className="w-[47%]">
          <Text className="text-xs">Qtd. Real</Text>
          <TextInput
            className="w-full h-10 rounded-lg border border-input bg-accent px-3 py-2"
            placeholder="0"
            value={String(realQuantity)}
            onChangeText={(text) => handleInputChage(id, "realQuantity", text)}
          />
        </View>
      </View>
      <View className="flex-row justify-between">
        {/* Entrada para preço */}
        <View className="w-[47%]">
          <Text className="text-xs">Preço</Text>
          <TextInput
            className="w-full h-10 rounded-lg border border-input bg-background px-3 py-2"
            placeholder="0"
            value={String(price).replace(".", ",")}
            onChangeText={(text) => handleInputChage(id, "price", text)}
          />
        </View>
        {/* Entrada para preço real */}
        <View className="w-[47%]">
          <Text className="text-xs">Preço Real</Text>
          <TextInput
            className="w-full h-10 rounded-lg border border-input bg-accent px-3 py-2"
            placeholder="0"
            value={String(realPrice).replace(".", ",")}
            onChangeText={(text) => handleInputChage(id, "realPrice", text)}
          />
        </View>
      </View>
      <View className="flex-row justify-between">
        {/* Exibe total planejado */}
        <View className="w-[47%]">
          <Text className="text-xs text-muted-foreground">Total Planejado</Text>
          <Text className="font-medium">
            R$ {total(currentList).total.toFixed(2).replace(".", ",")}
          </Text>
        </View>

        {/* Exibe total real */}
        <View className="w-[47%] items-end">
          <Text className="text-xs text-muted-foreground">Total Real</Text>
          <Text className="font-medium text-primary">
            R$ {realTotal(currentList).total.toFixed(2).replace(".", ",")}
          </Text>
        </View>
      </View>
    </View>
  );
}
