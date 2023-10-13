import { useCallback, useEffect, useReducer } from "react";
import {
  getLocalStorageData,
  setLocalStorageData,
} from "../utils/localStorageService";
import { collectionReducer } from "./collectionReducer.js";

export function useCollectionState() {
  const LS_KEY = "collection";
  const [collectionList, dispatch] = useReducer(
    collectionReducer,
    getLocalStorageData(LS_KEY)
  );

  const toggleInCollection = useCallback(
    (recordId) => {
      if (collectionList.some((item) => item.id === recordId)) {
        dispatch({
          type: "removed_from_collection",
          id: recordId,
        });
      } else {
        dispatch({
          type: "added_to_collection",
          id: recordId,
        });
      }
    },
    [collectionList]
  );

  const changeNote = useCallback((recordId, value) => {
    dispatch({
      type: "changed_note",
      id: recordId,
      value: value,
    });
  }, []);

  useEffect(() => {
    setLocalStorageData(LS_KEY, collectionList);
  }, [collectionList]);

  return [collectionList, toggleInCollection, changeNote];
}
