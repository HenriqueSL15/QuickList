import React, { useEffect } from "react";
import { View, Text, ScrollView, TouchableWithoutFeedback } from "react-native";

import useListStore from "../store/list";

import "../../global.css";

import NewItemButton from "../components/NewItemButton";
import ItemBox from "../components/ItemBox";
import MinimizedItemBox from "../components/MinimizedItemBox";

import { initialize } from "./utils/user.utils";
import { realTotal, total } from "./utils/totals.utils";
import Item from "./types/Item";
import { FontAwesome6 } from "@react-native-vector-icons/fontawesome6";

export default function Index() {
  const currentList = useListStore((state) => state.currentList);
  const toggleShopMinimized = useListStore(
    (state) => state.toggleShopMinimized
  );

  const filteredList = currentList?.items?.slice().sort((a: Item, b: Item) => {
    if (a.checked === b.checked) {
      return a.name.localeCompare(b.name);
    }
    return a.checked ? -1 : 1;
  });

  const isThereShopNumberOne = filteredList?.some(
    (item) => item.shopNumber === 0
  );
  const isThereShopNumberTwo = filteredList?.some(
    (item) => item.shopNumber === 1
  );
  const isThereShopNumberThree = filteredList?.some(
    (item) => item.shopNumber === 2
  );
  const isThereShopNumberFour = filteredList?.some(
    (item) => item.shopNumber === 3
  );

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
          <View className="gap-2">
            {isThereShopNumberOne && (
              <>
                <View className="flex-row justify-between">
                  <Text className="text-lg font-bold">SHOP 1</Text>
                  <TouchableWithoutFeedback
                    onPress={() => toggleShopMinimized(0)}
                  >
                    {!currentList?.minimizedShops?.includes(0) ? (
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
                </View>
                {filteredList.map((item) => {
                  if (item.shopNumber === 0) {
                    if (!currentList.minimizedShops.includes(0)) {
                      if (!item.minimized) {
                        return <ItemBox {...item} key={item.id} />;
                      } else {
                        return <MinimizedItemBox {...item} key={item.id} />;
                      }
                    }
                  }
                })}
              </>
            )}
            {isThereShopNumberTwo && (
              <>
                <View className="flex-row justify-between">
                  <Text className="text-lg font-bold">SHOP 2</Text>
                  <TouchableWithoutFeedback
                    onPress={() => toggleShopMinimized(1)}
                  >
                    {!currentList?.minimizedShops?.includes(1) ? (
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
                </View>
                {filteredList.map((item) => {
                  if (item.shopNumber === 1) {
                    if (!currentList.minimizedShops.includes(1)) {
                      if (!item.minimized) {
                        return <ItemBox {...item} key={item.id} />;
                      } else {
                        return <MinimizedItemBox {...item} key={item.id} />;
                      }
                    }
                  }
                })}
              </>
            )}
            {isThereShopNumberThree && (
              <>
                <View className="flex-row justify-between">
                  <Text className="text-lg font-bold">SHOP 3</Text>
                  <TouchableWithoutFeedback
                    onPress={() => toggleShopMinimized(2)}
                  >
                    {!currentList?.minimizedShops?.includes(2) ? (
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
                </View>
                {filteredList.map((item) => {
                  if (item.shopNumber === 2) {
                    if (!currentList.minimizedShops.includes(2)) {
                      if (!item.minimized) {
                        return <ItemBox {...item} key={item.id} />;
                      } else {
                        return <MinimizedItemBox {...item} key={item.id} />;
                      }
                    }
                  }
                })}
              </>
            )}
            {isThereShopNumberFour && (
              <>
                <View className="flex-row justify-between">
                  <Text className="text-lg font-bold">SHOP 4</Text>
                  <TouchableWithoutFeedback
                    onPress={() => toggleShopMinimized(3)}
                  >
                    {!currentList?.minimizedShops?.includes(3) ? (
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
                </View>
                {filteredList.map((item) => {
                  if (item.shopNumber === 3) {
                    if (!currentList.minimizedShops.includes(3)) {
                      if (!item.minimized) {
                        return <ItemBox {...item} key={item.id} />;
                      } else {
                        return <MinimizedItemBox {...item} key={item.id} />;
                      }
                    }
                  }
                })}
              </>
            )}
          </View>
        </ScrollView>
      )}
      <ScrollView
        className="mx-5 mt-5 mb-10 h-[300px]"
        contentContainerStyle={{
          gap: 20,
        }}
      >
        {/* Informações sobre o SHOP 1 */}
        <View className="gap-5">
          <Text className="text-lg font-bold text-center mb-1">Shop 1</Text>
          <View className="w-full flex-row justify-between">
            <View className="w-[47%] rounded-lg border border-input text-card-foreground shadow-sm p-3 bg-primary/5 items-center">
              <Text className="text-lg mb-1">Itens Planejados</Text>
              <Text className="text-xl font-bold">
                {
                  total(
                    currentList.items.filter((item) => item.shopNumber === 0)
                  ).quantity
                }
              </Text>
            </View>
            <View className="w-[47%] rounded-lg border border-input text-card-foreground shadow-sm p-3 bg-primary/5 items-center">
              <Text className="text-lg mb-1">Itens Reais</Text>
              <Text className="text-xl font-bold text-primary">
                {
                  realTotal(
                    currentList.items.filter((item) => item.shopNumber === 0)
                  ).quantity
                }
              </Text>
            </View>
          </View>
          <View className="w-full flex-row justify-between">
            <View className="w-[47%] rounded-lg border border-input text-card-foreground shadow-sm p-3 bg-primary/5 items-center">
              <Text className="text-lg mb-1">Total Planejado</Text>
              <Text className="text-xl font-bold">
                R${" "}
                {total(
                  currentList.items.filter((item) => item.shopNumber === 0)
                )
                  .total.toFixed(2)
                  .replace(".", ",")}
              </Text>
            </View>
            <View className="w-[47%] rounded-lg border border-input text-card-foreground shadow-sm p-3 bg-primary/5 items-center">
              <Text className="text-lg mb-1">Total Real</Text>
              <Text className="text-xl font-bold text-primary">
                R${" "}
                {realTotal(
                  currentList.items.filter((item) => item.shopNumber === 0)
                )
                  .total.toFixed(2)
                  .replace(".", ",")}
              </Text>
            </View>
          </View>
        </View>

        {/* Informações sobre o SHOP 2 */}
        <View className="gap-5">
          <Text className="text-lg font-bold text-center mb-1">Shop 2</Text>
          <View className="w-full flex-row justify-between">
            <View className="w-[47%] rounded-lg border border-input text-card-foreground shadow-sm p-3 bg-primary/5 items-center">
              <Text className="text-lg mb-1">Itens Planejados</Text>
              <Text className="text-xl font-bold">
                {
                  total(
                    currentList.items.filter((item) => item.shopNumber === 1)
                  ).quantity
                }
              </Text>
            </View>
            <View className="w-[47%] rounded-lg border border-input text-card-foreground shadow-sm p-3 bg-primary/5 items-center">
              <Text className="text-lg mb-1">Itens Reais</Text>
              <Text className="text-xl font-bold text-primary">
                {
                  realTotal(
                    currentList.items.filter((item) => item.shopNumber === 1)
                  ).quantity
                }
              </Text>
            </View>
          </View>
          <View className="w-full flex-row justify-between">
            <View className="w-[47%] rounded-lg border border-input text-card-foreground shadow-sm p-3 bg-primary/5 items-center">
              <Text className="text-lg mb-1">Total Planejado</Text>
              <Text className="text-xl font-bold">
                R${" "}
                {total(
                  currentList.items.filter((item) => item.shopNumber === 1)
                )
                  .total.toFixed(2)
                  .replace(".", ",")}
              </Text>
            </View>
            <View className="w-[47%] rounded-lg border border-input text-card-foreground shadow-sm p-3 bg-primary/5 items-center">
              <Text className="text-lg mb-1">Total Real</Text>
              <Text className="text-xl font-bold text-primary">
                R${" "}
                {realTotal(
                  currentList.items.filter((item) => item.shopNumber === 1)
                )
                  .total.toFixed(2)
                  .replace(".", ",")}
              </Text>
            </View>
          </View>
        </View>

        {/* Informações sobre o SHOP 3 */}
        <View className="gap-5">
          <Text className="text-lg font-bold text-center mb-1">Shop 3</Text>
          <View className="w-full flex-row justify-between">
            <View className="w-[47%] rounded-lg border border-input text-card-foreground shadow-sm p-3 bg-primary/5 items-center">
              <Text className="text-lg mb-1">Itens Planejados</Text>
              <Text className="text-xl font-bold">
                {
                  total(
                    currentList.items.filter((item) => item.shopNumber === 2)
                  ).quantity
                }
              </Text>
            </View>
            <View className="w-[47%] rounded-lg border border-input text-card-foreground shadow-sm p-3 bg-primary/5 items-center">
              <Text className="text-lg mb-1">Itens Reais</Text>
              <Text className="text-xl font-bold text-primary">
                {
                  realTotal(
                    currentList.items.filter((item) => item.shopNumber === 2)
                  ).quantity
                }
              </Text>
            </View>
          </View>
          <View className="w-full flex-row justify-between">
            <View className="w-[47%] rounded-lg border border-input text-card-foreground shadow-sm p-3 bg-primary/5 items-center">
              <Text className="text-lg mb-1">Total Planejado</Text>
              <Text className="text-xl font-bold">
                R${" "}
                {total(
                  currentList.items.filter((item) => item.shopNumber === 2)
                )
                  .total.toFixed(2)
                  .replace(".", ",")}
              </Text>
            </View>
            <View className="w-[47%] rounded-lg border border-input text-card-foreground shadow-sm p-3 bg-primary/5 items-center">
              <Text className="text-lg mb-1">Total Real</Text>
              <Text className="text-xl font-bold text-primary">
                R${" "}
                {realTotal(
                  currentList.items.filter((item) => item.shopNumber === 2)
                )
                  .total.toFixed(2)
                  .replace(".", ",")}
              </Text>
            </View>
          </View>
        </View>

        {/* Informações sobre o SHOP 4 */}
        <View className="gap-5">
          <Text className="text-lg font-bold text-center mb-1">Shop 4</Text>
          <View className="w-full flex-row justify-between">
            <View className="w-[47%] rounded-lg border border-input text-card-foreground shadow-sm p-3 bg-primary/5 items-center">
              <Text className="text-lg mb-1">Itens Planejados</Text>
              <Text className="text-xl font-bold">
                {
                  total(
                    currentList.items.filter((item) => item.shopNumber === 3)
                  ).quantity
                }
              </Text>
            </View>
            <View className="w-[47%] rounded-lg border border-input text-card-foreground shadow-sm p-3 bg-primary/5 items-center">
              <Text className="text-lg mb-1">Itens Reais</Text>
              <Text className="text-xl font-bold text-primary">
                {
                  realTotal(
                    currentList.items.filter((item) => item.shopNumber === 3)
                  ).quantity
                }
              </Text>
            </View>
          </View>
          <View className="w-full flex-row justify-between">
            <View className="w-[47%] rounded-lg border border-input text-card-foreground shadow-sm p-3 bg-primary/5 items-center">
              <Text className="text-lg mb-1">Total Planejado</Text>
              <Text className="text-xl font-bold">
                R${" "}
                {total(
                  currentList.items.filter((item) => item.shopNumber === 3)
                )
                  .total.toFixed(2)
                  .replace(".", ",")}
              </Text>
            </View>
            <View className="w-[47%] rounded-lg border border-input text-card-foreground shadow-sm p-3 bg-primary/5 items-center">
              <Text className="text-lg mb-1">Total Real</Text>
              <Text className="text-xl font-bold text-primary">
                R${" "}
                {realTotal(
                  currentList.items.filter((item) => item.shopNumber === 3)
                )
                  .total.toFixed(2)
                  .replace(".", ",")}
              </Text>
            </View>
          </View>
        </View>

        {/* Informações GERAIS */}
        <View className="gap-5">
          <Text className="text-lg font-bold text-center mb-1">TOTAL</Text>
          <View className="w-full flex-row justify-between">
            <View className="w-[47%] rounded-lg border border-input text-card-foreground shadow-sm p-3 bg-primary/5 items-center">
              <Text className="text-lg mb-1">Itens Planejados</Text>
              <Text className="text-xl font-bold">
                {total(currentList.items).quantity}
              </Text>
            </View>
            <View className="w-[47%] rounded-lg border border-input text-card-foreground shadow-sm p-3 bg-primary/5 items-center">
              <Text className="text-lg mb-1">Itens Reais</Text>
              <Text className="text-xl font-bold text-primary">
                {realTotal(currentList.items).quantity}
              </Text>
            </View>
          </View>
          <View className="w-full flex-row justify-between">
            <View className="w-[47%] rounded-lg border border-input text-card-foreground shadow-sm p-3 bg-primary/5 items-center">
              <Text className="text-lg mb-1">Total Planejado</Text>
              <Text className="text-xl font-bold">
                R$ {total(currentList.items).total.toFixed(2).replace(".", ",")}
              </Text>
            </View>
            <View className="w-[47%] rounded-lg border border-input text-card-foreground shadow-sm p-3 bg-primary/5 items-center">
              <Text className="text-lg mb-1">Total Real</Text>
              <Text className="text-xl font-bold text-primary">
                R${" "}
                {realTotal(currentList.items)
                  .total.toFixed(2)
                  .replace(".", ",")}
              </Text>
            </View>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}
