import CurrentList from "../types/CurrentList";
import Item from "../types/Item";

/**
 * Calcula a quantidade total planejada e o preço total dos itens na lista atual.
 * @param currentList - A lista de compras atual.
 * @returns Um objeto contendo a quantidade total e o preço total.
 */
const total = (currentList: CurrentList) => {
  let sum = 0;
  let quantity = 0;

  // Retorna totais zero se a lista estiver vazia ou indefinida
  if (currentList?.items?.length <= 0) return { quantity: 0, total: 0 };

  // Soma a quantidade e o preço * quantidade para cada item
  currentList.items.forEach((item: Item) => {
    sum += item.quantity * item.price;
    quantity += item.quantity;
  });

  return {
    quantity,
    total: sum,
  };
};

/**
 * Calcula a quantidade real total e o preço real total dos itens na lista atual,
 * considerando realPrice e realQuantity se disponíveis.
 * @param currentList - A lista de compras atual.
 * @returns Um objeto contendo a quantidade real total e o preço real total.
 */
const realTotal = (currentList: CurrentList) => {
  let realSum = 0;
  let realQuantity = 0;

  // Retorna totais zero se a lista estiver vazia ou indefinida
  if (currentList?.items?.length <= 0) return { quantity: 0, total: 0 };

  // Soma as quantidades e preços reais, usando os valores planejados se os reais forem zero
  currentList.items.forEach((item: Item) => {
    const price = item.realPrice != 0 ? item.realPrice : item.price;
    const quantity = item.realQuantity != 0 ? item.realQuantity : item.quantity;

    realSum += price * quantity;
    realQuantity += quantity;
  });

  return {
    quantity: realQuantity,
    total: realSum,
  };
};

export { realTotal, total };
