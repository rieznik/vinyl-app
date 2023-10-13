import { memo, useMemo } from "react";
import PropTypes from "prop-types";
import clsx from "clsx";
import { useSearchParams, Link } from "react-router-dom";
import { motion } from "framer-motion";

import { useFavorites } from "../../hooks/useFavorites.js";
import { useCollection } from "../../hooks/useCollection.js";

import FavoriteButton from "../FavoriteButton/FavoriteButton.jsx";
import Icon from "../Icon/Icon.jsx";

import styles from "./VinylCard.module.css";

const VinylCard = memo(function VinylCard({ vinyl }) {
  const [searchParams] = useSearchParams();
  const { favoritesList, toggleFavorite } = useFavorites();
  const { collectionList, toggleInCollection } = useCollection();

  const record = useMemo(() => {
    return {
      ...vinyl,
      inCollection: collectionList.some((item) => item.id === vinyl.id),
      inFavorites: favoritesList.includes(vinyl.id),
    };
  }, [collectionList, favoritesList, vinyl]);

  return (
    <motion.article
      key={record.id}
      className={styles.root}
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      <FavoriteButton
        isActive={record.inFavorites}
        onClick={() => {
          toggleFavorite(record.id);
        }}
      />
      <Link
        to={{
          pathname: `vinyl/:${record.id}`,
          search: searchParams.toString(),
        }}
      >
        <img className={styles.cover} src={record.image} alt="record cover" />
      </Link>
      <h1 className={clsx(styles.title, "text-overflow")}>
        <Link
          to={{
            pathname: `vinyl/:${record.id}`,
            search: searchParams.toString(),
          }}
        >
          {record.title}
        </Link>
      </h1>
      <h2 className={clsx(styles.artist, "text-overflow")}>
        <a href="#replace">{record.artist}</a>
      </h2>
      <ul>
        <li className={clsx(styles.info, "text-overflow")}>
          <span className={styles.infoName}>Year: </span>
          <a href="#replace">{record.year}</a>
        </li>
        <li className={clsx(styles.info, "text-overflow")}>
          <span className={styles.infoName}>Genre: </span>
          <a href="#replace">{record.genre.title}</a>
        </li>
        <li className={clsx(styles.info, "text-overflow")}>
          <span className={styles.infoName}>Style: </span>
          {record.styles.map((style, index) => {
            return (
              <a key={index} href="#replace">
                {/* comma separated styles, first comma before index 1 */}
                {(index > 0 ? ", " : "") + style}
              </a>
            );
          })}
        </li>
        <li className={clsx(styles.info, "text-overflow")}>
          <span className={styles.infoName}>Country: </span>
          <a href="#replace">{record.country.title}</a>
        </li>
      </ul>
      <button
        className={clsx("button", "button__secondary", styles.button, {
          [styles.isInCollection]: record.inCollection,
        })}
        onClick={() => {
          toggleInCollection(record.id);
        }}
      >
        {record.inCollection ? "In collection" : "Add to collection"}
        <Icon
          id={record.inCollection ? "check" : "plus"}
          className={clsx(styles.icon)}
        />
      </button>
    </motion.article>
  );
});

const countryShape = PropTypes.shape({
  id: PropTypes.string,
  title: PropTypes.string,
});

const genreShape = PropTypes.shape({
  id: PropTypes.number,
  title: PropTypes.string,
});

const vinylShape = PropTypes.shape({
  id: PropTypes.number,
  title: PropTypes.string,
  artist: PropTypes.string,
  year: PropTypes.number,
  country: countryShape,
  genre: genreShape,
  styles: PropTypes.arrayOf(PropTypes.string),
  image: PropTypes.string,
});

VinylCard.propTypes = {
  vinyl: vinylShape,
  favoritesList: PropTypes.array,
  collectionList: PropTypes.array,
  onFavoritesClick: PropTypes.func,
  onAddToCollectionClick: PropTypes.func,
};

export default VinylCard;
