import React, { useEffect, useState } from "react";
import {
  View,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Text,
  TextInput,
  Alert,
  ScrollView,
} from "react-native";

import Sidebar from "../components/Sidebar";

import useSidebarStore from "../store/sidebar";
import useListStore from "../store/list";

import "../../global.css";
import NewItemButton from "../components/NewItemButton";
import ItemBox from "../components/ItemBox";

export default function Index() {
  const isSidebarOpen = useSidebarStore((state) => state.isSidebarOpen);
  const closeSidebar = useSidebarStore((state) => state.closeSidebar);

  const currentList = useListStore((state) => state.currentList);

  const total = () => {
    let sum = 0;
    let quantity = 0;

    currentList.items.forEach((item) => {
      sum += item.quantity * item.price;
      quantity += item.quantity;
    });

    return {
      quantity,
      total: sum,
    };
  };

  const realTotal = () => {
    let realSum = 0;
    let realQuantity = 0;

    currentList.items.forEach((item) => {
      const price = item.realPrice != 0 ? item.realPrice : item.price;
      const quantity =
        item.realQuantity != 0 ? item.realQuantity : item.quantity;

      realSum += price * quantity;

      realQuantity += quantity;
    });

    return {
      quantity: realQuantity,
      total: realSum,
    };
  };

  const filteredList = currentList.items.slice().sort((a, b) => {
    if (a.checked === b.checked) {
      return a.name.localeCompare(b.name);
    }
    return a.checked ? -1 : 1;
  });

  return (
    <View className="flex-1 bg-background">
      {currentList && (
        <ScrollView className="mt-10 mx-5 border border-input bg-card rounded-lg p-5">
          <Text className="text-2xl font-semibold">{currentList.title}</Text>
          <NewItemButton />
          <View className="gap-0">
            {filteredList.map((item) => {
              return <ItemBox {...item} key={item.id} />;
            })}
          </View>
        </ScrollView>
      )}
      <View className="mx-5 mt-5 gap-3">
        <View className="w-full flex-row justify-between">
          <View className="w-[47%] rounded-lg border border-input text-card-foreground shadow-sm p-3 bg-primary/5 items-center">
            <Text className="text-lg mb-1">Itens Planejados</Text>
            <Text className="text-xl font-bold">{total().quantity}</Text>
          </View>
          <View className="w-[47%] rounded-lg border border-input text-card-foreground shadow-sm p-3 bg-primary/5 items-center">
            <Text className="text-lg mb-1">Itens Reais</Text>
            <Text className="text-xl font-bold text-primary">
              {realTotal().quantity}
            </Text>
          </View>
        </View>
        <View className="w-full flex-row justify-between">
          <View className="w-[47%] rounded-lg border border-input text-card-foreground shadow-sm p-3 bg-primary/5 items-center">
            <Text className="text-lg mb-1">Total Planejado</Text>
            <Text className="text-xl font-bold">
              R$ {total().total.toFixed(2).replace(".", ",")}
            </Text>
          </View>
          <View className="w-[47%] rounded-lg border border-input text-card-foreground shadow-sm p-3 bg-primary/5 items-center">
            <Text className="text-lg mb-1">Total Real</Text>
            <Text className="text-xl font-bold text-primary">
              R$ {realTotal().total.toFixed(2).replace(".", ",")}
            </Text>
          </View>
        </View>
      </View>
    </View>
  );
}
