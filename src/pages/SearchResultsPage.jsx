import {
  useParams,
  useSearchParams,
  useNavigate,
  Navigate,
} from "react-router-dom";
import { useCallback, useMemo } from "react";

import AppliedFiltersLayout from "../components/AppliedFiltersLayout/AppliedFiltersLayout.jsx";
import VinylCard from "../components/VinylCard/VinylCard.jsx";
import Pagination from "../components/Pagination/Pagination.jsx";
import ModalLayout from "../components/ModalLayout/ModalLayout.jsx";
import VinylFullDetails from "../components/VinylFullDetails/VinylFullDetails.jsx";

import useFilteredVinylList from "../hooks/useFilteredVinylList.js";
import createFilterParams from "../utils/createFilterParams.js";

const PAGE_SIZE = 12;

function SearchResultsPage() {
  const navigate = useNavigate();

  const [searchParams, setSearchParams] = useSearchParams();
  const { vinylId } = useParams();

  const page = searchParams.has("page")
    ? parseInt(searchParams.get("page"), 10)
    : 1;

  const filter = useMemo(() => {
    return {
      artist: searchParams.get("artist"),
      genres: [...searchParams.getAll("genre")] || [],
      decade: searchParams.get("year_from") || "",
      country: searchParams.get("country") || "",
    };
  }, [searchParams]);

  const isFilterEmpty =
    !filter.artist &&
    !filter.decade &&
    !filter.genres.length &&
    !filter.country;

  const vinylList = useFilteredVinylList(filter, {
    offset: (page - 1) * PAGE_SIZE,
    limit: PAGE_SIZE,
  });

  const handleChipRemove = useCallback(
    (filter) => setSearchParams(createFilterParams(filter)),
    [setSearchParams]
  );

  const handleChipReset = useCallback(
    () => setSearchParams(createFilterParams({})),
    [setSearchParams]
  );

  const handleModalClose = () => {
    navigate({
      pathname: "/search/results",
      search: searchParams.toString(),
    });
  };

  return (
    <>
      {isFilterEmpty && <Navigate to="/search" />}
      <AppliedFiltersLayout
        filter={filter}
        onChipRemove={handleChipRemove}
        onReset={handleChipReset}
      ></AppliedFiltersLayout>
      <main className="records-grid container">
        {vinylList.results.map((vinyl) => (
          <VinylCard key={vinyl.id} vinyl={vinyl} />
        ))}
      </main>
      <nav className="container">
        <Pagination
          currentPage={page}
          recordsPerPage={PAGE_SIZE}
          numberOfRecords={vinylList.total}
        />
      </nav>
      {vinylId && (
        <ModalLayout isOpen={!!vinylId} onClose={handleModalClose}>
          <VinylFullDetails vinylId={vinylId} />
        </ModalLayout>
      )}
    </>
  );
}

export default SearchResultsPage;
