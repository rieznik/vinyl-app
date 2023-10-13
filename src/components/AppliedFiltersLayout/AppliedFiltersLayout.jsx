import PropTypes from "prop-types";
import clsx from "clsx";
import { memo, useCallback } from "react";

import useDecadeList from "../../hooks/useDecadeList";
import useGenreList from "../../hooks/useGenreList.js";
import useCountryList from "../../hooks/useCountryList";

import Chip from "../Chip/Chip.jsx";

import styles from "./AppliedFiltersLayout.module.css";

const AppliedFiltersLayout = memo(function AppliedFiltersLayout({
  filter,
  onChipRemove,
  onReset,
}) {
  const genreList = useGenreList();
  const decadeList = useDecadeList();
  const countryList = useCountryList();

  const genres = genreList.data.filter((item) =>
    filter.genres.includes(item.id.toString())
  );
  const decade = decadeList.find(
    (item) => item.id.toString() === filter.decade
  );
  const country = countryList.data.find(
    (item) => item.id.toString() === filter.country
  );

  const handleRemove = useCallback(
    (name, value) => {
      onChipRemove({ ...filter, [name]: value });
    },
    [filter, onChipRemove]
  );

  return (
    <section className={clsx(styles.root, "container")}>
      <div className={styles.top}>
        <p>Filters applied:</p>
        <button className={styles.reset} onClick={onReset}>
          Reset changes
        </button>
      </div>
      <div className={styles.chips}>
        {filter.artist && (
          <Chip
            label={filter.artist}
            onRemove={() => {
              handleRemove("artist", "");
            }}
          />
        )}
        {!!filter.genres.length &&
          genres.map((genre) => (
            <Chip
              key={genre.id}
              label={genre.title}
              onRemove={() => {
                const value = filter.genres.filter(
                  (item) => item !== genre.id.toString()
                );
                handleRemove("genres", value);
              }}
            />
          ))}
        {filter.decade && (
          <Chip
            label={decade.name}
            onRemove={() => {
              handleRemove("decade", "");
            }}
          />
        )}
        {filter.country && (
          <Chip
            label={country.title}
            onRemove={() => {
              handleRemove("country", "");
            }}
          />
        )}
      </div>
    </section>
  );
});

const filterShape = PropTypes.shape({
  artist: PropTypes.string,
  genres: PropTypes.arrayOf(PropTypes.string),
  decade: PropTypes.string,
  country: PropTypes.string,
});

AppliedFiltersLayout.propTypes = {
  filter: filterShape,
  onChipRemove: PropTypes.func,
  onReset: PropTypes.func,
};

export default AppliedFiltersLayout;
