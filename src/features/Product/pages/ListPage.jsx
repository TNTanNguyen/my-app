import { Box, Container, Grid, makeStyles, Paper } from '@material-ui/core';
import { Pagination } from '@material-ui/lab';
import categoryApi from 'api/categoryApi';
import productApi from 'api/productApi';
import queryString from 'query-string';
import { useMemo } from 'react';
import { useEffect, useState } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import FillterViewer from '../components/Fillters/FillterViewer';
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

  //Đồng bộ filter lên URL
  const history = useHistory();
  const location = useLocation();
  const queryParams = useMemo(() => {
    const params = queryString.parse(location.search);
    //true =>'true',
    //{isPromotion:'true'}
    return {
      ...params,
      _page: Number.parseInt(params._page) || 1,
      _limit: Number.parseInt(params._limit) || 9,
      _sort: params._sort || 'salePrice:ASC',
      isPromotion: params.isPromotion === 'true',
      isFreeShip: params.isFreeShip === 'true',
    };
  }, [location.search]);

  const [productList, setProductList] = useState([]);

  const [paginationMui, setPaginationMui] = useState({
    limit: 9,
    total: 10,
    page: 1,
  });

  const [loading, setLoading] = useState(true);

  const [category, setCategory] = useState({});

  // const [fillter, setFillter] = useState(() => ({
  //   ...queryParams,
  //   _page: Number.parseInt(queryParams._page) || 1,
  //   _limit: Number.parseInt(queryParams._limit) || 9,
  //   _sort: queryParams._sort || 'salePrice:ASC',
  // }));

  // useEffect(() => {
  //   // TODO: Sync filters to URL
  //   history.push({
  //     pathname: history.location.pathname,
  //     search: queryString.stringify(fillter),
  //   });
  // }, [history, fillter]);

  useEffect(() => {
    (async () => {
      try {
        const { data, pagination } = await productApi.getAll(queryParams);

        if (queryParams['category.id']) {
          const { id, name } = await categoryApi.get(queryParams['category.id']);
          setCategory({ id, name });
        }
        setProductList(data);
        setPaginationMui(pagination);
      } catch (error) {
        console.log('Failed to fetch product list', error);
      }
      setLoading(false);
    })();
  }, [queryParams]);

  const handleChangedPage = (e, page) => {
    // setFillter((prevFillters) => ({
    //   ...prevFillters,
    //   _page: page,
    // }));

    const filters = {
      ...queryParams,
      _page: page,
    };

    history.push({
      pathname: history.location.pathname,
      search: queryString.stringify(filters),
    });
  };

  const handleSortChanged = (sortValue) => {
    // setFillter((prevFillters) => ({
    //   ...prevFillters,
    //   _sort: sortValue,
    // }));
    const filters = {
      ...queryParams,
      _sort: sortValue,
    };

    history.push({
      pathname: history.location.pathname,
      search: queryString.stringify(filters),
    });
  };

  const handleFilltersChange = (newFillters) => {
    // setFillter((prevFillters) => ({
    //   ...prevFillters,
    //   ...newFillters,
    // }));

    const filters = {
      ...queryParams,
      ...newFillters,
    };

    history.push({
      pathname: history.location.pathname,
      search: queryString.stringify(filters),
    });
  };

  const setNewFillters = (newFillters) => {
    // setFillter(newFillters);

    history.push({
      pathname: history.location.pathname,
      search: queryString.stringify(newFillters),
    });
  };

  return (
    <Box>
      <Container className="container">
        <Grid container className="row" spacing={1}>
          <Grid item className={classes.left}>
            <Paper elevation={0}>
              <ProductFillters fillter={queryParams} onChange={handleFilltersChange} />
            </Paper>
          </Grid>
          <Grid item className={classes.right}>
            <Paper elevation={0}>
              <ProductSort sortValue={queryParams._sort} onSortChanged={handleSortChanged} />
              <FillterViewer category={category} filters={queryParams} onChange={setNewFillters} />
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
