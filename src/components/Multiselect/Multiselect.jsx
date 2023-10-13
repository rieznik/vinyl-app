import clsx from "clsx";
import PropTypes from "prop-types";
import { useState } from "react";

import styles from "./Multiselect.module.css";

import Icon from "../Icon/Icon.jsx";
import Checkbox from "../Checkbox/Checkbox.jsx";

function Multiselect({
  placeholder,
  value,
  isError,
  options,
  onChange,
  ...props
}) {
  const [isOpen, setIsOpen] = useState(false);

  const selectedOptions = options.filter((option) =>
    value.includes(option.value)
  );

  function handleInputClick() {
    setIsOpen((isOpen) => !isOpen);
  }

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
            [styles.isPlaceholder]: !value.length,
          })}
          onClick={handleInputClick}
          {...props}
        >
          <span className={styles.valueText}>
            {selectedOptions.length > 0
              ? selectedOptions.map((item) => item.label).join(", ")
              : placeholder}
          </span>
          <Icon
            id="chevron"
            className={clsx(styles.chevron, { [styles.isUp]: isOpen })}
          />
        </button>
        <div className={clsx(styles.list, { [styles.isVisible]: isOpen })}>
          {options.map((option) => {
            return (
              <button
                type="button"
                key={option.value}
                className={clsx(styles.listItem, {
                  [styles.isSelected]: option.value === value,
                })}
                onClick={() => {
                  if (value.includes(option.value)) {
                    onChange(value.filter((item) => item !== option.value));
                  } else {
                    onChange([...value, option.value]);
                  }
                }}
              >
                <Checkbox
                  name={option.value}
                  checked={value.includes(option.value)}
                  onChange={() => {
                    return;
                  }}
                />
                <div className={styles.label}> {option.label}</div>
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

Multiselect.propTypes = {
  placeholder: PropTypes.string,
  value: PropTypes.arrayOf(PropTypes.string),
  isError: PropTypes.bool,
  options: PropTypes.arrayOf(optionsShape),
  onChange: PropTypes.func,
};

export default Multiselect;
