import Item from "./Item";

/**
 * Interface que define a estrutura da lista de compras atual,
 * contendo um título e um array de itens.
 */
interface CurrentList {
  title: string;
  items: Item[];
}

export default CurrentList;
