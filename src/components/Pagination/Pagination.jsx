import PropTypes from "prop-types";
import clsx from "clsx";
import { Link, useSearchParams } from "react-router-dom";

import styles from "./Pagination.module.css";

function PageItem({ currentPage, page }) {
  const [searchParams] = useSearchParams();
  const pageSearchParams = new URLSearchParams(searchParams);
  pageSearchParams.set("page", page);

  return (
    <li
      className={clsx(styles.page, {
        [styles.isActive]: page === currentPage,
        [styles.isThreeDots]: page === "...",
      })}
    >
      <Link
        to={{
          search: pageSearchParams.toString(),
        }}
      >
        {page}
      </Link>
    </li>
  );
}

PageItem.propTypes = {
  currentPage: PropTypes.number,
  page: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
};

function Pagination({ currentPage, recordsPerPage, numberOfRecords }) {
  //* the pagination array with (...) if there are many pages
  const getPagination = (total, current, delta = 2, gap = "...") => {
    if (total <= 1) return [1];

    const center = [current];

    for (let i = 1; i <= delta; ++i) {
      center.unshift(current - i);
      center.push(current + i);
    }

    const filteredCenter = center.filter((page) => page > 1 && page < total);

    const includeLeftGap = current > 3 + delta;
    const includeLeftPages = current === 3 + delta;
    const includeRightGap = current < total - (2 + delta);
    const includeRightPages = current === total - (2 + delta);

    if (includeLeftPages) filteredCenter.unshift(2);
    if (includeRightPages) filteredCenter.push(total - 1);
    if (includeLeftGap) filteredCenter.unshift(gap);
    if (includeRightGap) filteredCenter.push(gap);

    return [1, ...filteredCenter, total];
  };

  const totalPages = Math.ceil(numberOfRecords / recordsPerPage);
  const pagination = getPagination(totalPages, currentPage);

  return (
    <ul className={styles.root}>
      {pagination.map((page, index) => (
        <PageItem currentPage={currentPage} page={page} key={index} />
      ))}
    </ul>
  );
}

Pagination.propTypes = {
  currentPage: PropTypes.number,
  recordsPerPage: PropTypes.number,
  numberOfRecords: PropTypes.number,
};

export default Pagination;
