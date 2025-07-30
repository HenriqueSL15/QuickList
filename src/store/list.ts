import { create } from "zustand";
import ListState from "../app/types/ListState";

/**
 * Store Zustand para gerenciar o estado da lista de compras.
 * Fornece estado e ações para manipular a lista atual e seus itens.
 */
const useListStore = create<ListState>((set) => ({
  // Estado inicial com título padrão e array vazio de itens
  currentList: {
    title: "Lista de Compras",
    items: [],
  },

  /**
   * Substitui a lista atual por uma nova lista.
   * @param list - O novo objeto de lista para definir como currentList.
   */
  setList: (list) =>
    set((state) => ({
      currentList: list,
    })),

  /**
   * Atualiza um campo específico de um item na lista atual pelo id do item.
   * @param id - O id do item a ser atualizado.
   * @param field - O nome do campo a ser atualizado.
   * @param value - O novo valor a ser definido para o campo.
   */
  updateCurrentList: (id, field, value) =>
    set((state) => ({
      currentList: {
        ...state.currentList,
        items: state.currentList.items.map((item) =>
          item.id === id ? { ...item, [field]: value } : item
        ),
      },
    })),

  /**
   * Adiciona um novo item à lista atual.
   * @param item - O objeto do item a ser adicionado.
   */
  addItem: (item) => {
    set((state) => ({
      currentList: {
        ...state.currentList,
        items: [...state.currentList.items, item],
      },
    }));
  },

  /**
   * Remove um item da lista atual pelo id.
   * @param id - O id do item a ser removido.
   */
  removeItem: (id) => {
    set((state) => ({
      currentList: {
        ...state.currentList,
        items: state.currentList.items.filter((item) => item.id !== id),
      },
    }));
  },

  /**
   * Alterna o status 'checked' de um item pelo id.
   * @param id - O id do item a ser alternado.
   */
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
