import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import { Box, Chip, makeStyles } from '@material-ui/core';

const useStyle = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexFlow: 'row nowrap',
    alignItems: 'center',

    padding: 0,
    margin: theme.spacing(2, 0),
    listStyleType: 'none',

    '& > li': {
      margin: 0,
      padding: theme.spacing(1),
    },
  },
}));

const FILLTER_LIST = [
  {
    id: 1,
    getLable: () => 'Giao hàng miễn phí',
    isActive: (filters) => filters.isFreeShip,
    isVisible: () => true,
    isRemovable: false,
    onRemove: () => {},
    onToggle: (filters) => {
      const newFilters = { ...filters };
      if (newFilters.isFreeShip) {
        delete newFilters.isFreeShip;
      } else {
        newFilters.isFreeShip = true;
      }
      return newFilters;
    },
  },
  {
    id: 2,
    getLable: (filters) => 'Có khuyến mãi',
    isActive: () => true,
    isVisible: (filters) => filters.isPromotion,
    isRemovable: true,
    onRemove: (filters) => {
      const newFilters = { ...filters };
      if (newFilters.isPromotion) {
        delete newFilters.isPromotion;
      }
      return newFilters;
    },
    onToggle: () => {},
  },

  {
    id: 3,
    getLable: (filters) => `Từ ${filters.salePrice_gte} đến ${filters.salePrice_lte}`,
    isActive: () => true,
    isVisible: (filters) =>
      Object.keys(filters).includes('salePrice_gte') &&
      Object.keys(filters).includes('salePrice_lte'),

    isRemovable: true,
    onRemove: (filters) => {
      const newFilters = { ...filters };
      delete newFilters.salePrice_gte;
      delete newFilters.salePrice_lte;
      return newFilters;
    },
    onToggle: () => {},
  },

  {
    id: 4,
    getLable: (filters, category) => {
      return category.name;
    },
    isActive: () => true,
    isVisible: (filters) => filters['category.id'],
    isRemovable: true,
    onRemove: (filters) => {
      const newFilters = { ...filters };
      delete newFilters['category.id'];
      delete newFilters['category.name'];

      return newFilters;
    },
    onToggle: () => {},
  },
];

FillterViewer.propTypes = {
  category: PropTypes.object,
  filters: PropTypes.object,
  onChange: PropTypes.func,
};
function FillterViewer({ category = {}, filters = {}, onChange = null }) {
  const classes = useStyle();

  const visibleFilters = useMemo(() => {
    return FILLTER_LIST.filter((x) => x.isVisible(filters));
  }, [filters]);

  return (
    <Box component="ul" className={classes.root}>
      {visibleFilters.map((x) => (
        <li key={x.id}>
          <Chip
            size="small"
            label={x.getLable(filters, category)}
            color={x.isActive(filters) ? 'primary' : 'default'}
            clickable={!x.isRemovable}
            onClick={
              x.isRemovable
                ? null
                : () => {
                    if (!onChange) return;

                    const newFilters = x.onToggle(filters);
                    onChange(newFilters);
                  }
            }
            onDelete={
              x.isRemovable
                ? () => {
                    if (!onChange) return;
                    const newFilters = x.onRemove(filters);
                    onChange(newFilters);
                  }
                : null
            }
          />
        </li>
      ))}
    </Box>
  );
}

export default FillterViewer;
