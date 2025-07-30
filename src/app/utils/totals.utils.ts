import CurrentList from "../types/CurrentList";
import Item from "../types/Item";

const total = (currentList: CurrentList) => {
  let sum = 0;
  let quantity = 0;

  if (currentList?.items?.length < 0) return { quantity: 0, total: 0 };

  currentList.items.forEach((item: Item) => {
    sum += item.quantity * item.price;
    quantity += item.quantity;
  });

  return {
    quantity,
    total: sum,
  };
};

const realTotal = (currentList: CurrentList) => {
  let realSum = 0;
  let realQuantity = 0;

  if (currentList?.items?.length < 0) return { quantity: 0, total: 0 };

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
