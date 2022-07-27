import { Box, Container, Grid, makeStyles, Paper } from '@material-ui/core';
import { useRouteMatch } from 'react-router-dom';
import AddToCartForm from '../components/AddToCartForm';
import ProductInfo from '../components/ProductInfo';
import ProductThumbnail from '../components/ProductThumbnail';
import useProductDetail from '../hooks/useProductDetail';
import ProductMenu from '../components/ProductMenu';

const useStyles = makeStyles((theme) => ({
  root: {},
  left: {
    width: '400px',
    padding: theme.spacing(1.5),
    borderRight: `1px solid ${theme.palette.grey[300]}`,
  },
  right: {
    flex: '1 1 0',
    padding: theme.spacing(1.5),
    borderRight: `1px solid ${theme.palette.grey[300]}`,
  },
  pagination: {
    display: 'flex',
    flexFlow: 'row nowrap',
    justifyContent: 'center',
    marginTop: '30px',
    paddingBottom: '20px',
  },
}));

function DetailPage() {
  const classes = useStyles();
  //object detructering nested => object 2 tang
  const {
    params: { productId },
  } = useRouteMatch();

  //custom hooks
  const { product, loading } = useProductDetail(productId);

  if (loading) {
    //TODO:Make this beautyful
    return <Box>Loading</Box>;
  }
  const handleAddToCartSubmit = (value) => {
    console.log('Add To Cart Submit: ', value);
  };
  return (
    <Box className={classes.root}>
      <Container>
        <Paper elevation={0}>
          <Grid container>
            <Grid item className={classes.left}>
              <ProductThumbnail product={product} />
            </Grid>
            <Grid item className={classes.right}>
              <ProductInfo product={product} />
              <AddToCartForm onSubmit={handleAddToCartSubmit} />
            </Grid>
          </Grid>
        </Paper>
        <ProductMenu></ProductMenu>
      </Container>
    </Box>
  );
}

export default DetailPage;
