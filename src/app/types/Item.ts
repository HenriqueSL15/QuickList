/**
 * Interface que define a estrutura de um item na lista de compras.
 */
interface Item {
  id: number;
  checked: boolean;
  name: string;
  quantity: number;
  realQuantity: number;
  price: number;
  realPrice: number;
  minimized: boolean;
}

export default Item;
