import React from 'react';
import PropTypes from 'prop-types';
import { Box } from '@material-ui/core';
import FillterByCategory from './Fillters/FillterByCategory';
import FillterByPrice from './Fillters/FillterByPrice';
import FillterByService from './Fillters/FillterByService';

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
  // const handlePriceChange = (values) => {
  //   if (!onChange) return;
  //   onChange(values);
  // };

  // const handleServiceChange = (value) => {
  //   if (!onChange) return;
  //   onChange(value);
  // };
  const handleChange = (values) => {
    if (!onChange) return;
    onChange(values);
  };
  return (
    <Box>
      <FillterByCategory onChange={handleCategoryChange} />
      <FillterByPrice onChange={handleChange} />
      <FillterByService fillter={fillter} onChange={handleChange} />
    </Box>
  );
}

export default ProductFillters;
