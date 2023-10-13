import PropTypes from "prop-types";
import { createContext } from "react";
import { useCollectionState } from "../../hooks/useCollectionState.js";

const CollectionContext = createContext();

function CollectionProvider({ children }) {
  const [collectionList, toggleInCollection, changeNote] = useCollectionState();

  return (
    <CollectionContext.Provider
      value={{ collectionList, toggleInCollection, changeNote }}
    >
      {children}
    </CollectionContext.Provider>
  );
}

CollectionProvider.propTypes = {
  children: PropTypes.node,
};

export { CollectionContext, CollectionProvider };
