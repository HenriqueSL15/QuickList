import Item from "./Item";

/**
 * Tipo que representa uma versão minimizada do Item,
 * contendo apenas as propriedades essenciais para visualização reduzida.
 */
type MinimizedItem = Pick<Item, "id" | "checked" | "name" | "minimized">;

export default MinimizedItem;
