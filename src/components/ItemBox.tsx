import React, { useState } from "react";
import FontAwesome6 from "@react-native-vector-icons/fontawesome6";
import { View, Text, TouchableWithoutFeedback, TextInput } from "react-native";
import useListStore from "../store/list";

export default function ItemBox({
  id,
  checked,
  name,
  quantity,
  realQuantity,
  price,
  realPrice,
  minimized,
}) {
  const updateCurrentList = useListStore((state) => state.updateCurrentList);
  const removeItem = useListStore((state) => state.removeItem);

  const handleInputChage = (id, field, value) => {
    if (field === "price" || field === "realPrice") {
      const filteredValue = value.replace(/[^0-9.,]/g, "");
      const numericValue = filteredValue.replace(",", ".");
      updateCurrentList(id, field, numericValue);
    } else if (field === "quantity" || field === "realQuantity") {
      const filteredValue = value.replace(/[^0-9.,]/g, "");
      const numericValue = Number(filteredValue);
      updateCurrentList(id, field, numericValue);
    } else {
      updateCurrentList(id, field, value);
    }
  };

  return (
    <View className="bg-card shadow-md rounded-lg p-4 mb-4 border border-input gap-6">
      <View className="flex-row justify-between">
        <View className="flex-row gap-3">
          <TouchableWithoutFeedback
            onPress={() => handleInputChage(id, "checked", !checked)}
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
      <TextInput
        className="w-full h-10 rounded-lg border border-input bg-background px-3 py-2"
        placeholder="Nome do Produto"
        value={name}
        onChangeText={(text) => handleInputChage(id, "name", text)}
      />

      <View className="flex-row justify-between">
        <View className="w-[47%]">
          <Text className="text-xs">Qtd</Text>
          <TextInput
            className="w-full h-10 rounded-lg border border-input bg-background px-3 py-2"
            placeholder="0"
            value={String(quantity)}
            onChangeText={(text) => handleInputChage(id, "quantity", text)}
          />
        </View>
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
        <View className="w-[47%]">
          <Text className="text-xs">Preço</Text>
          <TextInput
            className="w-full h-10 rounded-lg border border-input bg-background px-3 py-2"
            placeholder="0"
            value={String(price).replace(".", ",")}
            onChangeText={(text) => handleInputChage(id, "price", text)}
          />
        </View>
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
        <View className="w-[47%]">
          <Text className="text-xs text-muted-foreground">Total Planejado</Text>
          <Text className="font-medium">
            R$ {(price * quantity).toFixed(2).replace(".", ",")}
          </Text>
        </View>

        <View className="w-[47%] items-end">
          <Text className="text-xs text-muted-foreground">Total Real</Text>
          <Text className="font-medium text-primary">
            R$ {(realPrice * realQuantity).toFixed(2).replace(".", ",")}
          </Text>
        </View>
      </View>
    </View>
  );
}
