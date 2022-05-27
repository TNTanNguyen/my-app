import React from 'react';
import PropTypes from 'prop-types';
import './styles.scss';
Pagination.propTypes = {
  pagination: PropTypes.object.isRequired,
  onPageChange: PropTypes.func,
};
Pagination.defaultProps = {
  onPageChange: null,
};

function Pagination(props) {
  const { pagination, onPageChange } = props;
  const { _page, _limit, _totalRows } = pagination;

  const totalPage = Math.ceil(_totalRows / _limit);

  const pageNumbers = [];
  for (let i = 1; i <= totalPage; i++) {
    pageNumbers.push(i);
  }

  const handlePageChange = (newPage) => {
    if (!onPageChange) {
      return;
    }
    onPageChange(newPage);
  };

  return (
    <div>
      <button disabled={_page <= 1} onClick={() => handlePageChange(_page - 1)}>
        Prev
      </button>
      <ul className="pagesNumber">
        {pageNumbers.map((pages) => (
          <li
            key={pages}
            onClick={() => handlePageChange(pages)}
            className={pages === _page ? 'active' : ''}
          >
            {pages}
          </li>
        ))}
      </ul>
      <button disabled={_page >= totalPage} onClick={() => handlePageChange(_page + 1)}>
        Next
      </button>
    </div>
  );
}

export default Pagination;
