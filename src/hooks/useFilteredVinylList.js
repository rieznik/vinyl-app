import useSWR from "swr";
import useGenreList from "./useGenreList.js";
import useCountryList from "./useCountryList.js";
import createFilterParams from "../utils/createFilterParams.js";
import { useCallback, useMemo } from "react";

function useFilteredVinylList(filter, { offset, limit }) {
  const genreList = useGenreList();
  const countryList = useCountryList();

  const params = useMemo(() => {
    const params = createFilterParams(filter);
    params.set("offset", offset);
    params.set("limit", limit);
    return params;
  }, [filter, limit, offset]);

  const filteredList = useSWR(
    ["/api/search", filter, offset, limit],
    () =>
      fetch("/api/search?" + params.toString()).then((response) =>
        response.json()
      ),
    { suspense: true }
  );

  const isLoading =
    filteredList.isLoading || countryList.isLoading || genreList.isLoading;

  const mapVinylSearchResult = useCallback(
    (item) => {
      return {
        id: item.id,
        title: item.title,
        artist: item.artist,
        year: item.year,
        country: countryList.data.find(
          (country) => country.id === item.country
        ),
        genre: genreList.data.find((genre) => genre.id === item.genre),
        styles: item.styles,
        image: item.thumb_image,
      };
    },
    [countryList.data, genreList.data]
  );

  const results = useMemo(() => {
    return isLoading
      ? null
      : filteredList.data.results.map((item) => mapVinylSearchResult(item));
  }, [filteredList.data.results, isLoading, mapVinylSearchResult]);

  const total = filteredList.data?.total ?? 0;

  return {
    results,
    total,
    isLoading,
  };
}

export default useFilteredVinylList;
