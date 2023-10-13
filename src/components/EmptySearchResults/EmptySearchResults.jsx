import Icon from "../Icon/Icon.jsx";

import styles from "./EmptySearchResults.module.css";

function EmptySearchResults() {
  return (
    <div className={styles.root}>
      <p>Nothing’s here</p>
      <p>Search something first!</p>
      <Icon id="globe-search" className={styles.icon} />
    </div>
  );
}

export default EmptySearchResults;
