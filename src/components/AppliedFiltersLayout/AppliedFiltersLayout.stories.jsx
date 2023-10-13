import AppliedFiltersLayout from "./AppliedFiltersLayout.jsx";

export default {
  title: "AppliedFiltersLayout",
  component: AppliedFiltersLayout,
};

export const Primary = {
  args: {
    filter: {
      artist: "Pink Floyd",
      genres: ["7", "11", "6"],
      decade: "2010",
      country: "netherlands",
    },
  },
};
