/* eslint-disable import/no-unresolved */
import PropTypes from "prop-types";
import { memo } from "react";
import svgUrl from "/src/assets/sprite.svg";

const Icon = memo(function Icon({ id, className }) {
  return (
    <svg
      className={className}
      role="img"
      aria-hidden="true"
      focusable="false"
      data-testid={id}
    >
      <use href={svgUrl + "#" + id} />
    </svg>
  );
});

Icon.propTypes = {
  id: PropTypes.string.isRequired,
  className: PropTypes.string,
};

export default Icon;
