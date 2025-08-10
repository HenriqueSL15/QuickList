import CurrentList from "../types/CurrentList";
import Item from "../types/Item";

/**
 * Calcula a quantidade total planejada e o preço total dos itens na lista atual.
 * @param currentList - A lista de compras atual.
 * @returns Um objeto contendo a quantidade total e o preço total.
 */
const total = (currentList: Item[]) => {
  let sum = 0;
  let quantity = 0;

  // Retorna totais zero se a lista estiver vazia ou indefinida
  if (currentList?.length <= 0) return { quantity: 0, total: 0 };

  // Soma a quantidade e o preço * quantidade para cada item
  currentList.forEach((item: Item) => {
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
const realTotal = (currentList: Item[]) => {
  let realSum = 0;
  let realQuantity = 0;

  // Retorna totais zero se a lista estiver vazia ou indefinida
  if (currentList?.length <= 0) return { quantity: 0, total: 0 };

  // Soma as quantidades e preços reais, usando os valores planejados se os reais forem zero
  currentList.forEach((item: Item) => {
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

/**
 * Calcula a quantidade total e o preço total do item atual,
 * @param currentItem - O item atual.
 * @returns Um objeto contendo a quantidade total e o preço total.
 */
const itemTotal = (currentItem: Item) => {
  // Retorna totais zero se o item estiver indefinido
  if (!currentItem) return { quantity: 0, total: 0 };

  // Multiplica o preço * quantidade para o item
  const sum = currentItem.quantity * currentItem.price;

  return {
    quantity: currentItem.quantity,
    total: sum,
  };
};

/**
 * Calcula a quantidade real total e o preço real total do item atual,
 * @param currentItem - O item atual.
 * @returns Um objeto contendo a quantidade real total e o preço real total.
 */
const realItemTotal = (currentItem: Item) => {
  // Retorna totais zero se o item estiver indefinido
  if (!currentItem) return { quantity: 0, total: 0 };

  // Soma a quantidade e o preço * quantidade para o item
  const realPrice =
    currentItem.realPrice > 0 ? currentItem.realPrice : currentItem.price;
  const realQuantity =
    currentItem.realQuantity > 0
      ? currentItem.realQuantity
      : currentItem.quantity;

  const sum = realPrice * realQuantity;

  return {
    quantity: realQuantity,
    total: sum,
  };
};

export { realTotal, total, itemTotal, realItemTotal };
