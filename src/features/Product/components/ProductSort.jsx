import React from 'react';
import PropTypes from 'prop-types';
import { Tab, Tabs } from '@material-ui/core';

ProductSort.propTypes = {
  sortValue: PropTypes.string.isRequired,
  onSortChanged: PropTypes.func,
};
ProductSort.defaultProps = {
  onSortChanged: null,
};

function ProductSort({ sortValue, onSortChanged }) {
  const handleSortChange = (event, newValue) => {
    if (onSortChanged) onSortChanged(newValue);
  };
  return (
    <div>
      <Tabs
        value={sortValue}
        indicatorColor="primary"
        textColor="primary"
        onChange={handleSortChange}
        aria-label="disabled tabs example"
      >
        <Tab label="Giá thấp tới cao" value="salePrice:ASC" />
        <Tab label="Giá cao xuống thấp" value="salePrice:DESC" />
      </Tabs>
    </div>
  );
}

export default ProductSort;
