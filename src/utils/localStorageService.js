const getLocalStorageData = (name) => {
  const data = window.localStorage.getItem(name);

  if (data) {
    return JSON.parse(data);
  }

  return [];
};

const setLocalStorageData = (name, data) => {
  window.localStorage.setItem(name, JSON.stringify(data));
};

export { getLocalStorageData, setLocalStorageData };
