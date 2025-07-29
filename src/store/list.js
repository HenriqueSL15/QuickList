import { create } from "zustand";

const useListStore = create((set) => ({
  currentList: {
    title: "NÃO DEU CERTO",
    items: [],
  },
  setList: (list) =>
    set((state) => ({
      currentList: list,
    })),
  updateCurrentList: (id, field, value) =>
    set((state) => ({
      currentList: {
        ...state.currentList,
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
