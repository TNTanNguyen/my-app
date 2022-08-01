import React from 'react';
import PropTypes from 'prop-types';
import DOMPurify from 'dompurify';
import { Paper } from '@material-ui/core';

ProductDescription.propTypes = {};

function ProductDescription({ product }) {
  const sefeDescription = DOMPurify.sanitize(product.description);
  return (
    <Paper elevation={0} style={{ padding: '15px' }}>
      <div dangerouslySetInnerHTML={{ __html: sefeDescription }} />
    </Paper>
  );
}

export default ProductDescription;
