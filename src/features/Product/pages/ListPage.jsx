import { Box, Container, Grid, makeStyles, Paper } from '@material-ui/core';
import { Pagination } from '@material-ui/lab';
import productApi from 'api/productApi';
import { useEffect, useState } from 'react';
import ProductFillters from '../components/ProductFillters';
import ProductList from '../components/ProductList';
import ProductSkeletonList from '../components/ProductSkeletonList';
import ProductSort from '../components/ProductSort';
ListPage.propTypes = {};
const useStyles = makeStyles((theme) => ({
  root: {},
  left: {
    width: '250px',
  },
  right: {
    flex: '1 1 0',
  },
  pagination: {
    display: 'flex',
    flexFlow: 'row nowrap',
    justifyContent: 'center',
    marginTop: '30px',
    paddingBottom: '20px',
  },
}));
function ListPage(props) {
  const classes = useStyles();

  const [productList, setProductList] = useState([]);
  const [paginationMui, setPaginationMui] = useState({
    limit: 9,
    total: 10,
    page: 1,
  });

  const [loading, setLoading] = useState(true);
  const [fillter, setFillter] = useState({
    _page: 1,
    _limit: 9,
    _sort: 'salePrice:ASC',
  });

  useEffect(() => {
    (async () => {
      try {
        const { data, pagination } = await productApi.getAll(fillter);
        setProductList(data);
        setPaginationMui(pagination);
      } catch (error) {
        console.log('Failed to fetch product list', error);
      }
      setLoading(false);
    })();
  }, [fillter]);

  const handleChangedPage = (e, page) => {
    setFillter((prevFillters) => ({
      ...prevFillters,
      _page: page,
    }));
  };
  const handleSortChanged = (sortValue) => {
    setFillter((prevFillters) => ({
      ...prevFillters,
      _sort: sortValue,
    }));
  };
  const handleFilltersChange = (newFillters) => {
    setFillter((prevFillters) => ({
      ...prevFillters,
      ...newFillters,
    }));
  };
  return (
    // fullSection
    <Box>
      {/* Container */}
      <Container className="container">
        {/* row */}
        <Grid container className="row" spacing={1}>
          <Grid item className={classes.left}>
            <Paper elevation={0}>
              <ProductFillters fillter={fillter} onChange={handleFilltersChange} />
            </Paper>
          </Grid>
          <Grid item className={classes.right}>
            <Paper elevation={0}>
              <ProductSort onSortChanged={handleSortChanged} sortValue={fillter._sort} />
              {loading ? <ProductSkeletonList length={9} /> : <ProductList data={productList} />}
              <Box className={classes.pagination}>
                <Pagination
                  color="primary"
                  count={Math.ceil(paginationMui.total / paginationMui.limit)}
                  page={paginationMui.page}
                  onChange={handleChangedPage}
                />
              </Box>
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}

export default ListPage;
