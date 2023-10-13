import PropTypes from "prop-types";
import clsx from "clsx";

import styles from "./TextInput.module.css";

function TextInput({ placeholder, name, isError, register }) {
  return (
    <input
      type="text"
      placeholder={placeholder}
      className={clsx(styles.root, { [styles.error]: isError })}
      {...register(name)}
    />
  );
}

TextInput.propTypes = {
  placeholder: PropTypes.string,
  name: PropTypes.string,
  isError: PropTypes.bool,
  register: PropTypes.func,
};

export default TextInput;
