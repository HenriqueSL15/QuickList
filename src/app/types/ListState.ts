import CurrentList from "./CurrentList";
import Item from "./Item";

interface ListState {
  currentList: CurrentList;
  setList: (list: CurrentList) => void;
  updateCurrentList: (
    id: number,
    field: keyof Item,
    value: string | number
  ) => void;
  addItem: (item: Item) => void;
  removeItem: (id: number) => void;
  toggleItemChecked: (id: number) => void;
}

export default ListState;
