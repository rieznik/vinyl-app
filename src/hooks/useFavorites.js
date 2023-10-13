import { useContext } from "react";
import { FavoritesContext } from "../components/FavoritesProvider/FavoritesProvider.jsx";

export function useFavorites() {
  const { favoritesList, toggleFavorite } = useContext(FavoritesContext);

  return { favoritesList, toggleFavorite };
}
