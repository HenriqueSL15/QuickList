import Item from "./Item";

type MinimizedItem = Pick<Item, "id" | "checked" | "name" | "minimized">;

export default MinimizedItem;
