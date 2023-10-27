import React from "react";
import { getTotalNoOfPages } from "../ScriptFiles/PagingUtility.js";
import PropTypes from "prop-types";
import styles from "../StyleFiles/PaginationComponent.module.css";

const PaginationComponent = (props) => {
  const { usersLength, setPage, page, handlingOfDeleteSelected } = props;

  const totalNoOfPages = getTotalNoOfPages(usersLength);
  const changeThePage = (index) => {
    setPage(index);
  };

  const pageNavigation = (index) => {
    if (index < 1) {
      index = 1;
    } else if (index > totalNoOfPages) {
      index = totalNoOfPages;
    }
    setPage(index);
  };

  const generatePageElement = (key, className, onClick, content) => (
    <div key={key} className={`${styles.page} ${className}`} onClick={onClick}>
      {content}
    </div>
  );
  const pages = [
    generatePageElement(
      -3,
      page === 1 ? styles.disabled : "",
      () => changeThePage(1),
      <i className="fas fa-angle-double-left"></i>
    ),
    generatePageElement(
      -2,
      page === 1 ? styles.disabled : "",
      () => pageNavigation(page - 1),
      <i className="fas fa-angle-left"></i>
    )
  ];
  for (let i = 1; i <= totalNoOfPages; i++) {
    pages.push(
      generatePageElement(
        i,
        page === i ? styles.selected : "",
        () => changeThePage(i),
        i
      )
    );
  }
  pages.push(
    generatePageElement(
      -1,
      page === totalNoOfPages ? styles.disabled : "",
      () => pageNavigation(page + 1),
      <i className="fas fa-angle-right"></i>
    ),
    generatePageElement(
      0,
      page === totalNoOfPages ? styles.disabled : "",
      () => changeThePage(totalNoOfPages),
      <i className="fas fa-angle-double-right"></i>
    )
  );

  return (
    <div className={styles.paginationContainer}>
      <button
        className={styles.delete}
        onClick={() => handlingOfDeleteSelected()}
      >
        Delete The Selected...!
      </button>
      <div className={styles.pagination}>{pages}</div>
    </div>
  );
};

PaginationComponent.propTypes = {
  usersLength: PropTypes.number.isRequired,
  setPage: PropTypes.func.isRequired,
  page: PropTypes.number.isRequired,
  handlingOfDeleteSelected: PropTypes.func.isRequired
};

export default PaginationComponent;
