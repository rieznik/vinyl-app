import { useNavigate } from "react-router-dom";
import createFilterParams from "../utils/createFilterParams.js";
import SearchForm from "../components/SearchForm/SearchForm.jsx";
import EmptySearchResults from "../components/EmptySearchResults/EmptySearchResults.jsx";

function NewSearchPage() {
  const navigate = useNavigate();

  function handleFormSubmit(searchParams) {
    const params = createFilterParams(searchParams);
    navigate({
      pathname: "/search/results",
      search: params.toString(),
    });
  }

  return (
    <>
      <section className="form-section container">
        <SearchForm onSubmit={handleFormSubmit} />
        <EmptySearchResults />
      </section>
    </>
  );
}

export default NewSearchPage;
