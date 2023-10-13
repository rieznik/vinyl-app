function createFilterParams(filter) {
  const filterParams = new URLSearchParams();

  if (filter.artist) {
    filterParams.set("artist", filter.artist);
  }
  if (filter.decade) {
    filterParams.set("year_from", parseInt(filter.decade));
    filterParams.set("year_to", parseInt(filter.decade) + 9);
  }
  if (filter.genres?.length) {
    filter.genres.map((genre) => filterParams.append("genre", genre));
  }
  if (filter.country) {
    filterParams.set("country", filter.country);
  }
  return filterParams;
}

export default createFilterParams;
