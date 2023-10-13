import PropTypes from "prop-types";
import { createContext } from "react";
import { useFavoritesState } from "../../hooks/useFavoritesState.js";

const FavoritesContext = createContext();

function FavoritesProvider({ children }) {
  const [favoritesList, toggleFavorite] = useFavoritesState();

  return (
    <FavoritesContext.Provider value={{ favoritesList, toggleFavorite }}>
      {children}
    </FavoritesContext.Provider>
  );
}

FavoritesProvider.propTypes = {
  children: PropTypes.node,
};

export { FavoritesContext, FavoritesProvider };
