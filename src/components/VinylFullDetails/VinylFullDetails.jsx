import PropTypes from "prop-types";
import clsx from "clsx";
import { motion } from "framer-motion";
import { useState, useRef, useEffect, useMemo, memo } from "react";

import useVinylRelease from "../../hooks/useVinylRelease.js";
import { useFavorites } from "../../hooks/useFavorites.js";
import { useCollection } from "../../hooks/useCollection.js";

import FavoriteButton from "../FavoriteButton/FavoriteButton.jsx";
import NoteInput from "../NoteInput/NoteInput.jsx";
import Icon from "../Icon/Icon.jsx";

import styles from "./VinylFullDetails.module.css";

function AudioPlayer({ src, isPlaying }) {
  const ref = useRef(null);

  useEffect(() => {
    if (isPlaying) {
      ref.current.play();
    } else {
      ref.current.pause();
    }
  });

  return <audio ref={ref} src={src} loop />;
}

AudioPlayer.propTypes = {
  src: PropTypes.string,
  isPlaying: PropTypes.bool,
};

const VinylFullDetails = memo(function VinylFullDetails({ vinylId }) {
  const [isPlaying, setIsPlaying] = useState(false);
  const { changeNote } = useCollection();
  const { toggleFavorite } = useFavorites();
  const { collectionList, toggleInCollection } = useCollection();

  const vinyl = useVinylRelease(vinylId.substring(1));
  const record = {
    ...vinyl.results,
  };

  const { note } = useMemo(
    () =>
      record.inCollection
        ? collectionList.find((item) => item.id === record.id)
        : { note: null },
    [collectionList, record.id, record.inCollection]
  );

  return (
    <div className={styles.root}>
      <h1 className={styles.title}>{record.title}</h1>
      <h2 className={styles.artist}>{record.artist}</h2>
      <div className={styles.imageContainer}>
        <FavoriteButton
          isActive={record.inFavorites}
          onClick={() => {
            toggleFavorite(record.id);
          }}
        />
        <button
          className={styles.play}
          onClick={() => {
            setIsPlaying(!isPlaying);
          }}
        >
          <Icon
            id={isPlaying ? "pause" : "play"}
            className={clsx(styles.playIcon, {
              [styles.isPlaying]: isPlaying,
            })}
          />
          <span className="visually-hidden"> Play the record </span>
        </button>
        <AudioPlayer
          src="/public/guitar-mellow-beat.mp3"
          isPlaying={isPlaying}
        />
        {isPlaying && (
          <motion.img
            className={styles.record}
            animate={{ rotate: 360 }}
            transition={{ ease: "linear", duration: 8, repeat: Infinity }}
            src="/src/assets/record.png"
            alt="record playing"
          />
        )}

        <img className={styles.cover} src={record.image} alt="record cover" />
      </div>
      <ul className={styles.infoSection}>
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
      <h3 className={styles.subsectionTitle}>Track list</h3>
      <ul>
        {record.tracklist.map((track) => {
          return (
            <li
              key={track.position}
              className={clsx(styles.info, "text-overflow")}
            >
              <span className={styles.infoName}>{track.position}</span>
              {track.title}
            </li>
          );
        })}
      </ul>
      {record.inCollection && (
        <NoteInput
          value={note}
          handleChange={(value) => {
            changeNote(record.id, value);
          }}
        ></NoteInput>
      )}
      <button
        className={clsx("button", "button__secondary", styles.button, {
          [styles.isInCollection]: record.inCollection,
        })}
        onClick={() => {
          toggleInCollection(record.id);
        }}
      >
        {record.inCollection ? "In collection" : "Add"}
        <Icon
          id={record.inCollection ? "check" : "plus"}
          className={clsx(styles.icon)}
        />
      </button>
    </div>
  );
});

VinylFullDetails.propTypes = {
  vinylId: PropTypes.string,
  favoritesList: PropTypes.array,
  collectionList: PropTypes.array,
  onFavoritesClick: PropTypes.func,
  onAddToCollectionClick: PropTypes.func,
};

export default VinylFullDetails;
