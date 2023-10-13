import { useContext } from "react";
import { CollectionContext } from "../components/CollectionProvider/CollectionProvider.jsx";

export function useCollection() {
  const { collectionList, toggleInCollection, changeNote } =
    useContext(CollectionContext);

  return { collectionList, toggleInCollection, changeNote };
}
