import React, { useEffect } from "react";
import { View, Text, ScrollView } from "react-native";

import useListStore from "../store/list";

import "../../global.css";

import NewItemButton from "../components/NewItemButton";
import ItemBox from "../components/ItemBox";
import MinimizedItemBox from "../components/MinimizedItemBox";

import { initialize } from "./utils/user.utils";
import { realTotal, total } from "./utils/totals.utils";
import Item from "./types/Item";

export default function Index() {
  const currentList = useListStore((state) => state.currentList);

  const filteredList = currentList?.items?.slice().sort((a: Item, b: Item) => {
    if (a.checked === b.checked) {
      return a.name.localeCompare(b.name);
    }
    return a.checked ? -1 : 1;
  });

  useEffect(() => {
    const fetchUserData = async () => {
      const userData = await initialize();
      const setList = useListStore.getState().setList;
      setList(userData);
      console.log("User data set in store:", userData);
    };

    fetchUserData();
  }, []);

  return (
    <View className="flex-1 bg-background">
      {currentList && (
        <ScrollView className="mt-10 mx-5 border border-input bg-card rounded-lg p-5">
          <Text className="text-2xl font-semibold">{currentList.title}</Text>
          <NewItemButton />
          <View className="gap-0">
            {filteredList.map((item: Item) => {
              if (!item.minimized) {
                return <ItemBox {...item} key={item.id} />;
              } else {
                return <MinimizedItemBox {...item} key={item.id} />;
              }
            })}
          </View>
        </ScrollView>
      )}
      <View className="mx-5 mt-5 mb-10 gap-3">
        <View className="w-full flex-row justify-between">
          <View className="w-[47%] rounded-lg border border-input text-card-foreground shadow-sm p-3 bg-primary/5 items-center">
            <Text className="text-lg mb-1">Itens Planejados</Text>
            <Text className="text-xl font-bold">
              {total(currentList).quantity}
            </Text>
          </View>
          <View className="w-[47%] rounded-lg border border-input text-card-foreground shadow-sm p-3 bg-primary/5 items-center">
            <Text className="text-lg mb-1">Itens Reais</Text>
            <Text className="text-xl font-bold text-primary">
              {realTotal(currentList).quantity}
            </Text>
          </View>
        </View>
        <View className="w-full flex-row justify-between">
          <View className="w-[47%] rounded-lg border border-input text-card-foreground shadow-sm p-3 bg-primary/5 items-center">
            <Text className="text-lg mb-1">Total Planejado</Text>
            <Text className="text-xl font-bold">
              R$ {total(currentList).total.toFixed(2).replace(".", ",")}
            </Text>
          </View>
          <View className="w-[47%] rounded-lg border border-input text-card-foreground shadow-sm p-3 bg-primary/5 items-center">
            <Text className="text-lg mb-1">Total Real</Text>
            <Text className="text-xl font-bold text-primary">
              R$ {realTotal(currentList).total.toFixed(2).replace(".", ",")}
            </Text>
          </View>
        </View>
      </View>
    </View>
  );
}
