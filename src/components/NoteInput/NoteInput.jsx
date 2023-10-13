import PropTypes from "prop-types";
import { useEffect, useRef } from "react";

import Icon from "../Icon/Icon.jsx";

import styles from "./NoteInput.module.css";

function NoteInput({ value, handleChange, handleFocus, handleBlur }) {
  const textareaRef = useRef(null);

  const resizeTextArea = () => {
    textareaRef.current.style.height = "auto";
    textareaRef.current.style.height = `${Math.min(
      textareaRef.current.scrollHeight,
      150
    )}px`;
  };

  useEffect(resizeTextArea, [value]);

  return (
    <>
      <label className={styles.root}>
        <span className={styles.label}>
          Add a note <Icon id="pencil" className={styles.pencilIcon}></Icon>
        </span>
        <textarea
          ref={textareaRef}
          id="note"
          name="note"
          placeholder="You can write here whatever you want.."
          className={styles.textarea}
          value={value}
          rows={1}
          onChange={(e) => {
            handleChange(e.target.value);
          }}
          onFocus={handleFocus}
          onBlur={handleBlur}
        />
      </label>
    </>
  );
}

NoteInput.propTypes = {
  value: PropTypes.string,
  handleChange: PropTypes.func,
  handleFocus: PropTypes.func,
  handleBlur: PropTypes.func,
};

export default NoteInput;
