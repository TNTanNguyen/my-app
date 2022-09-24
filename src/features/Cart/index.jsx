import { Box, Button, Container, Grid, IconButton, Paper, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { Delete } from '@material-ui/icons';
import QuantityFiled from 'components/form-controls/QuantityFiled';
import { STATIC_HOST, THUMBNAIL_PLACEHOLDER } from 'constants';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { formatPrice } from 'utils';
import { RemoveItemCart } from './CartSlice';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    marginTop: theme.spacing(3),
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
  image: {
    height: '80px',
    flexShrink: '0',
  },
  img: {
    margin: 'auto',
    display: 'block',
    maxWidth: '100%',
    maxHeight: '100%',
  },
  cartItems: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  name: {
    display: 'inline-block',
    marginLeft: '15px',
  },
  price: {
    marginLeft: '15px',
  },
}));

function CartFeatures(props) {
  const dispatch = useDispatch();

  const cartItemList = useSelector((state) => state.cart.cartItems);

  const history = useHistory();

  const classes = useStyles();

  const handleClickToDetail = (id) => {
    history.push(`./products/${id}`);
  };

  const handleRemoveItem = (id) => {
    const action = RemoveItemCart(id);
    // console.log(action);
    dispatch(action);
  };

  return (
    <Box className={classes.root}>
      <Container>
        <Grid container spacing={2}>
          <Grid item xs={8}>
            <Paper className={classes.paper} elevation={0}>
              {cartItemList.map((item) => (
                <Box className={classes.cartItems} key={item.id}>
                  <Box className={classes.image} onClick={() => handleClickToDetail(27072783)}>
                    <img
                      className={classes.img}
                      alt={item.product.alternativeText}
                      src={
                        item.product.thumbnail
                          ? `${STATIC_HOST}${item.product.thumbnail?.url}`
                          : THUMBNAIL_PLACEHOLDER
                      }
                    />
                  </Box>
                  <Typography className={classes.name}>{item.product?.name}</Typography>
                  <Typography variant="body2" className={classes.price}>
                    <Box
                      component="span"
                      fontSize="16px"
                      fontWeight="bold"
                      sx={{ marginRight: '10px' }}
                    >
                      {formatPrice(item.product.salePrice)}
                    </Box>
                    {item.product.promotionPercent > 0
                      ? ` - ${item.product.promotionPercent}%`
                      : ''}
                  </Typography>

                  <Box>
                    <Button>-</Button>
                    {item.quantity}
                    <Button>+</Button>
                  </Box>
                  <Box>
                    <IconButton aria-label="delete" onClick={() => handleRemoveItem(item.id)}>
                      <Delete fontSize="small" />
                    </IconButton>
                  </Box>
                </Box>
              ))}
            </Paper>
          </Grid>
          <Grid item xs={4}>
            <Paper className={classes.paper} elevation={0}></Paper>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}

export default CartFeatures;
