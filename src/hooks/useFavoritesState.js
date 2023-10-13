import { useState, useEffect, useCallback } from "react";
import {
  getLocalStorageData,
  setLocalStorageData,
} from "../utils/localStorageService";

export function useFavoritesState() {
  const LS_KEY = "favorites";
  const [favoritesList, setFavoritesList] = useState(() =>
    getLocalStorageData(LS_KEY)
  );

  const toggleFavorite = useCallback(
    (recordId) => {
      setFavoritesList(() => {
        if (favoritesList.includes(recordId)) {
          return favoritesList.filter((id) => id !== recordId);
        }
        return [...favoritesList, recordId];
      });
    },
    [favoritesList]
  );

  useEffect(() => {
    setLocalStorageData(LS_KEY, favoritesList);
  }, [favoritesList]);

  return [favoritesList, toggleFavorite];
}

export default useFavoritesState;
