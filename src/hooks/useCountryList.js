import useSWR from "swr";

function useCountryList() {
  return useSWR(
    "/api/countries",
    () =>
      fetch("/api/countries")
        .then((response) => response.json())
        .then((data) => data.countries),
    {
      suspense: true,
    }
  );
}

export default useCountryList;
