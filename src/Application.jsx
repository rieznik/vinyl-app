import { Outlet } from "react-router";
import { Helmet } from "react-helmet-async";

import { FavoritesProvider } from "./components/FavoritesProvider/FavoritesProvider.jsx";
import { CollectionProvider } from "./components/CollectionProvider/CollectionProvider.jsx";

function Application() {
  return (
    <>
      <Helmet>
        <title>Vinyl App</title>
        <meta
          name="description"
          content="Best collection of vinyl on Vinyl App, the largest online vinyl database. Create your collection or add to wishlist"
        ></meta>
        <meta
          name="keywords"
          content="vinyl records, albums, rare records, music albums, hard to find music, rare vinyl records"
        ></meta>
      </Helmet>
      <FavoritesProvider>
        <CollectionProvider>
          <Outlet />
        </CollectionProvider>
      </FavoritesProvider>
    </>
  );
}

export default Application;
