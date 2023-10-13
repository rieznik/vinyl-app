import { Outlet } from "react-router-dom";
import { Helmet } from "react-helmet-async";

import Header from "../components/Header/Header.jsx";

function SearchPage() {
  return (
    <>
      <Helmet>
        <title>Search Vinyls</title>
        <meta
          name="description"
          content="Discover music on Vinyl App, the largest online vinyl database. Create your collection or add to wishlist"
        ></meta>
      </Helmet>
      <Header />
      <Outlet />
    </>
  );
}

export default SearchPage;
