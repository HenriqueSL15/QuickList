/**
 * Interface que define a estrutura do estado da lista de compras e suas ações.
 */
import CurrentList from "./CurrentList";
import Item from "./Item";

interface ListState {
  /**
   * O objeto da lista de compras atual.
   */
  currentList: CurrentList;

  /**
   * Substitui a lista atual por uma nova lista.
   * @param list - O novo objeto CurrentList.
   */
  setList: (list: CurrentList) => void;

  /**
   * Atualiza um campo específico de um item na lista atual pelo id do item.
   * @param id - O id do item a ser atualizado.
   * @param field - A chave do Item a ser atualizada.
   * @param value - O novo valor para o campo.
   */
  updateCurrentList: (
    id: number,
    field: keyof Item,
    value: string | number | boolean
  ) => void;

  /**
   * Adiciona um novo item à lista atual.
   * @param item - O objeto Item a ser adicionado.
   */
  addItem: (item: Item) => void;

  /**
   * Remove um item da lista atual pelo id.
   * @param id - O id do item a ser removido.
   */
  removeItem: (id: number) => void;

  /**
   * Alterna o status 'checked' de um item pelo id.
   * @param id - O id do item a ser alternado.
   */
  toggleItemChecked: (id: number) => void;
}

export default ListState;
