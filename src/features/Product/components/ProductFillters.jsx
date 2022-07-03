import React from 'react';
import PropTypes from 'prop-types';
import { Box } from '@material-ui/core';
import FillterByCategory from './Fillters/FillterByCategory';
import FillterByPrice from './Fillters/FillterByPrice';

ProductFillters.propTypes = {
  fillter: PropTypes.object.isRequired,
  onChange: PropTypes.func,
};

function ProductFillters({ fillter, onChange }) {
  const handleCategoryChange = (newCategoryId) => {
    if (!onChange) return;
    const newFillter = {
      ...fillter,
      'category.id': newCategoryId,
    };

    onChange(newFillter);
  };
  const handlePriceChange = (values) => {
    if (!onChange) return;
    onChange(values);
  };
  return (
    <Box>
      <FillterByCategory onChange={handleCategoryChange} />
      <FillterByPrice onChange={handlePriceChange} />
    </Box>
  );
}

export default ProductFillters;
