import PropTypes from "prop-types";

import styles from "./Checkbox.module.css";

import Icon from "../Icon/Icon.jsx";

function Checkbox({ checked, ...props }) {
  return (
    <label className={styles.root}>
      <input
        className={styles.input}
        type="checkbox"
        checked={checked}
        {...props}
      />

      <span className={styles.icon}>
        {checked ? (
          <Icon id="checkbox" className={styles.checked} />
        ) : (
          <span className={styles.unchecked}></span>
        )}
      </span>
    </label>
  );
}

Checkbox.propTypes = {
  checked: PropTypes.bool,
};

export default Checkbox;
