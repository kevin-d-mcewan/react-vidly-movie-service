import React from "react";
import PropTypes from "prop-types";
import _ from "lodash";

const Pagination = (props) => {
  /* Do this so we dont have to call 'props.onPageChange' where these props are in the return statement. */
  const { itemsCount, pageSize, currentPage, onPageChange } = props;
  console.log(currentPage);

  /* Doing "Math.ceil" bc if the divison = a floating point number 'pagesCount' != 1. So this turns it into a whole number. */
  const pagesCount = Math.ceil(itemsCount / pageSize);
  if (pagesCount === 1) return null;
  const pages = _.range(1, pagesCount + 1);

  return (
    <nav>
      <ul className="pagination">
        {pages.map((page) => (
          <li
            key={page}
            className={page === currentPage ? "page-item active" : "page-item"}
          >
            {/* <a className="page-link" onClick={() => onPageChange(page)}>
              {page}
            </a> */}
            <button className="page-link" onClick={() => onPageChange(page)}>
              {page}
            </button>
          </li>
        ))}
      </ul>
    </nav>
  );
};

Pagination.propTypes = {
  itemsCount: PropTypes.number.isRequired,
  pageSize: PropTypes.number.isRequired,
  currentPage: PropTypes.number.isRequired,
  onPageChange: PropTypes.func.isRequired,
};

export default Pagination;
