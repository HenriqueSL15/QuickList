import { create } from "zustand";

const useListStore = create((set) => ({
  currentList: {
    id: 1,
    title: "Lista 1",
    areThereChanges: false,
    items: [
      {
        id: 1,
        name: "Arroz",
        checked: false,
        quantity: 5,
        realQuantity: 0,
        price: 10.0,
        realPrice: 15.0,
        minimized: true,
      },
      {
        id: 2,
        name: "Arroz",
        checked: false,
        quantity: 5,
        realQuantity: 0,
        price: 10.0,
        realPrice: 15.0,
        minimized: true,
      },
    ],
  },
  updateCurrentList: (id, field, value) =>
    set((state) => ({
      currentList: {
        ...state.currentList,
        areThereChanges: true,
        items: state.currentList.items.map((item) =>
          item.id === id ? { ...item, [field]: value } : item
        ),
      },
    })),
  addItem: (item) => {
    set((state) => ({
      currentList: {
        ...state.currentList,
        items: [...state.currentList.items, item],
      },
    }));
  },
  removeItem: (id) => {
    set((state) => ({
      currentList: {
        ...state.currentList,
        items: state.currentList.items.filter((item) => item.id !== id),
      },
    }));
  },
  toggleItemChecked: (id) => {
    set((state) => ({
      currentList: {
        ...state.currentList,
        items: state.currentList.items.map((item) =>
          item.id === id ? { ...item, checked: !item.checked } : item
        ),
      },
    }));
  },
}));

export default useListStore;
