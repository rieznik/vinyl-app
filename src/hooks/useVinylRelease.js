import useSWR from "swr";
import useGenreList from "./useGenreList.js";
import useCountryList from "./useCountryList.js";
import { useCollection } from "./useCollection.js";
import { useFavorites } from "./useFavorites.js";

import { CollectionContext } from "../components/CollectionProvider/CollectionProvider.jsx";
import { FavoritesContext } from "../components/FavoritesProvider/FavoritesProvider.jsx";
import { useCallback, useMemo } from "react";

function useVinylRelease(id) {
  const genreList = useGenreList();
  const countryList = useCountryList();
  const { collectionList } = useCollection(CollectionContext);
  const { favoritesList } = useFavorites(FavoritesContext);

  const vinylRelease = useSWR(
    ["/api/releases/", id],
    () =>
      fetch("/api/releases/" + id)
        .then((response) => response.json())
        .then((data) => data.release),
    { suspense: true }
  );

  const isLoading =
    vinylRelease.isLoading || countryList.isLoading || genreList.isLoading;

  const mapVinylData = useCallback(
    (vinyl) => {
      return {
        id: vinyl.id,
        title: vinyl.title,
        artist: vinyl.artist,
        year: vinyl.year,
        country: countryList.data.find(
          (country) => country.id === vinyl.country
        ),
        genre: genreList.data.find((genre) => genre.id === vinyl.genre),
        styles: vinyl.styles,
        image: vinyl.cover_image,
        tracklist: vinyl.tracklist,
        inCollection: collectionList.some((item) => item.id === vinyl.id),
        inFavorites: favoritesList.includes(vinyl.id),
      };
    },
    [collectionList, countryList, favoritesList, genreList]
  );

  const results = useMemo(
    () => (isLoading ? {} : mapVinylData(vinylRelease.data)),
    [isLoading, mapVinylData, vinylRelease.data]
  );

  return {
    results,
    isLoading,
  };
}

export default useVinylRelease;
