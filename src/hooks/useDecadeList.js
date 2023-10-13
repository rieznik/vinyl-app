import { useState } from "react";

function useDecadeList() {
  const [decadeList] = useState([
    {
      id: 2020,
      name: "2020-2030",
    },
    {
      id: 2010,
      name: "2010-2020",
    },
    {
      id: 2000,
      name: "2000-2010",
    },
    {
      id: 1990,
      name: "1990-2000",
    },
    {
      id: 1980,
      name: "1980-1990",
    },
    {
      id: 1970,
      name: "1970-1980",
    },
    {
      id: 1960,
      name: "1960-1970",
    },
    {
      id: 1950,
      name: "1950-1960",
    },
  ]);

  return decadeList;
}

export default useDecadeList;
