import useSWR from "swr";

function useGenreList() {
  return useSWR(
    "/api/genres",
    () =>
      fetch("/api/genres")
        .then((response) => response.json())
        .then((data) => data.genres),
    {
      suspense: true,
    }
  );
}

export default useGenreList;
