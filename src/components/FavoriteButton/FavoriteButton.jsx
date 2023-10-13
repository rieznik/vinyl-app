import PropTypes from "prop-types";
import clsx from "clsx";
import { useRef, useState } from "react";
import { Portal } from "react-portal";

import Icon from "../Icon/Icon.jsx";

import useMeasure from "../../hooks/useMeasure.js";

import styles from "./FavoriteButton.module.css";

function FavoriteButton({ isActive, onClick }) {
  const timerRef = useRef(null);
  const [position, setPosition] = useState(null);
  const { ref, top, left, height } = useMeasure();

  function handlePointerEnter() {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
      timerRef.current = null;
    }
    setPosition({
      top: top + height,
      left: left,
    });
  }

  function handlePointerLeave() {
    timerRef.current = setTimeout(() => {
      setPosition(null);
    }, 1000);
  }

  return (
    <>
      <button
        ref={ref}
        className={styles.root}
        onPointerEnter={handlePointerEnter}
        onPointerLeave={handlePointerLeave}
        onClick={onClick}
      >
        <Icon
          id="heart"
          className={clsx(styles.icon, {
            [styles.active]: isActive,
          })}
        />
        <span className="visually-hidden">
          {isActive ? "Remove from" : "Add to"} favorites
        </span>
      </button>
      {position && (
        <Portal>
          <div className={styles.tooltip} style={position}>
            {isActive ? "Remove from" : "Add to"} favorites
          </div>
        </Portal>
      )}
    </>
  );
}

FavoriteButton.propTypes = {
  isActive: PropTypes.bool,
  onClick: PropTypes.func,
};

export default FavoriteButton;
