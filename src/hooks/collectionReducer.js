export function collectionReducer(collection, action) {
  switch (action.type) {
    case "added_to_collection": {
      return [...collection, { id: action.id, note: "" }];
    }
    case "removed_from_collection": {
      return collection.filter((item) => item.id !== action.id);
    }
    case "changed_note": {
      return collection.map((item) =>
        item.id === action.id ? { ...item, note: action.value } : item
      );
    }
  }
  throw Error("Unknown action: " + action.type);
}
