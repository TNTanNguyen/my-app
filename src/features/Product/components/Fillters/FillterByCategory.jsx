import { Box, makeStyles, Typography } from '@material-ui/core';
import categoryApi from 'api/categoryApi';
import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';

FillterByCategory.propTypes = {
  onChange: PropTypes.func,
};
const useStyle = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(2),
  },
  menu: {
    listStyleType: 'none',
    padding: '0',
    '& > li': {
      marginTop: theme.spacing(1),
      transition: 'all 0.25s',
      '&:hover': {
        color: theme.palette.primary.main,
        cursor: 'pointer',
      },
    },
  },
}));
function FillterByCategory({ onChange }) {
  const [categoryList, setCategoryList] = useState([]);

  useEffect(() => {
    (async () => {
      try {
        const response = await categoryApi.getAll();
        const customResponse = response.map((x) => ({
          id: x.id,
          name: x.name,
        }));
        setCategoryList(customResponse);
      } catch (error) {
        console.log('Failed to fetch category', error);
      }
    })();
  }, []);

  const handleCategoryClick = (category) => {
    if (!onChange) return;
    onChange(category.id);
  };

  const classes = useStyle();
  return (
    <Box className={classes.root}>
      <Typography variant="subtitle2">DANH MỤC SẢN PHẨM</Typography>
      <ul className={classes.menu}>
        {categoryList.map((category) => (
          <li
            key={category.id}
            onClick={() => {
              handleCategoryClick(category);
            }}
          >
            <Typography variant="body2">{category.name}</Typography>
          </li>
        ))}
      </ul>
    </Box>
  );
}

export default FillterByCategory;
