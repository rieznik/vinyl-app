import clsx from "clsx";
import Icon from "../Icon/Icon.jsx";

import styles from "./Header.module.css";

function Header() {
  return (
    <header className={styles.root}>
      <nav className={clsx(styles.nav, "container")}>
        <button
          className={styles.button}
          onClick={() => {
            history.back();
          }}
        >
          <Icon id="chevron" className={styles.chevron} />
          Back
        </button>
        <ul className={styles.buttonGroup}>
          <li>
            <a className={styles.button} href="#replace">
              <Icon id="heart" className={styles.heart} />
              <span className="visually-hidden"> Favorites </span>
            </a>
          </li>
          <li>
            <a className={styles.button} href="#replace">
              <Icon id="folder" className={styles.folder} />
              <span className="visually-hidden"> Collections </span>
            </a>
          </li>
        </ul>
      </nav>
    </header>
  );
}

export default Header;
