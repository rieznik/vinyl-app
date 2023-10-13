import PropTypes from "prop-types";
import Icon from "../Icon/Icon.jsx";

import styles from "./Chip.module.css";
import { memo } from "react";

const Chip = memo(function Chip({ label, onRemove }) {
  return (
    <div className={styles.root}>
      <p>{label}</p>
      <button className={styles.remove} onClick={onRemove}>
        <Icon id="plus" className={styles.icon} />
      </button>
    </div>
  );
});

Chip.propTypes = {
  label: PropTypes.string.isRequired,
  onRemove: PropTypes.func,
};

export default Chip;
