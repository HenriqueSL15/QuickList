import React from "react";
import { View, TouchableWithoutFeedback } from "react-native";

import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import useSidebarStore from "../store/sidebar";

import "../../global.css";

export default function Index() {
  const isOpen = useSidebarStore((state) => state.isSidebarOpen);
  const closeSidebar = useSidebarStore((state) => state.closeSidebar);

  return (
    <View className="flex-1 relative">
      <Header />
      {isOpen && (
        <>
          <TouchableWithoutFeedback onPress={closeSidebar} accessible={true}>
            <View className="absolute top-0 left-0 w-full h-full" />
          </TouchableWithoutFeedback>
          <Sidebar />
        </>
      )}
    </View>
  );
}
