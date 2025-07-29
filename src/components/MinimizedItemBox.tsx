import React from "react";
import FontAwesome6 from "@react-native-vector-icons/fontawesome6";
import { View, Text, TouchableWithoutFeedback } from "react-native";
import useListStore from "../store/list";
import { setUserData } from "../app/utils/user.utils";

export default function MinimizedItemBox({ id, checked, name, minimized }) {
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

    const userData = useListStore.getState().currentList;
    setUserData(userData);
  };

  return (
    <View className="bg-card shadow-md rounded-lg p-4 mb-4 border border-input flex-row justify-between">
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

        <Text>{name}</Text>
      </View>
      <TouchableWithoutFeedback>
        <View className="bg-red-500"></View>
      </TouchableWithoutFeedback>
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
  );
}
