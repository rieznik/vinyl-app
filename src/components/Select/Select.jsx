import PropTypes from "prop-types";
import { useState } from "react";
import clsx from "clsx";

import styles from "./Select.module.css";

import Icon from "../Icon/Icon.jsx";

function Select({ placeholder, options, value, isError, onChange, ...props }) {
  const [isOpen, setIsOpen] = useState(false);

  function handleInputClick() {
    setIsOpen((isOpen) => !isOpen);
  }

  // TODO dropdown does not close on outside click, try to understand why and fix later
  return (
    <>
      <div
        className={clsx(styles.root, {
          [styles.isOnTop]: isOpen,
          [styles.error]: isError,
        })}
      >
        <button
          type="button"
          className={clsx(styles.select, {
            [styles.isPlaceholder]: !value,
          })}
          onClick={handleInputClick}
          {...props}
        >
          {value
            ? options.find((item) => item.value === value).label
            : placeholder}
          <Icon
            id="chevron"
            className={clsx(styles.chevron, { [styles.isUp]: isOpen })}
          />
        </button>
        <div className={clsx(styles.list, { [styles.isVisible]: isOpen })}>
          {options.map((item) => {
            return (
              <button
                type="button"
                key={item.value}
                className={clsx(styles.listItem, {
                  [styles.isSelected]: item.value === value,
                })}
                onClick={() => {
                  onChange(item.value);
                  handleInputClick();
                }}
              >
                {item.label}
              </button>
            );
          })}
        </div>
      </div>
    </>
  );
}

const optionsShape = PropTypes.shape({
  label: PropTypes.string,
  value: PropTypes.string,
});

Select.propTypes = {
  placeholder: PropTypes.string,
  value: PropTypes.string,
  isError: PropTypes.bool,
  options: PropTypes.arrayOf(optionsShape),
  onChange: PropTypes.func,
};

export default Select;
