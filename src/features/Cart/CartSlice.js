import { createSlice } from '@reduxjs/toolkit';
const initState =
  JSON.parse(localStorage.getItem('cartItems')) != null
    ? JSON.parse(localStorage.getItem('cartItems'))
    : [];
const CartSlice = createSlice({
  name: 'cart',
  initialState: {
    showMiniCart: false,
    cartItems: initState,
  },
  reducers: {
    showMiniCart(state) {
      state.showMiniCart = true;
    },
    hideMIniCart(state) {
      state.showMiniCart = false;
    },
    addToCart(state, action) {
      //newItem ={id,product,quantity}
      const newItem = action.payload;

      const index = state.cartItems.findIndex((x) => x.id === newItem.id);
      if (index >= 0) {
        //increase quantity
        state.cartItems[index].quantity += newItem.quantity;
      } else {
        //add to cart
        state.cartItems.push(newItem);
      }
      localStorage.setItem('cartItems', JSON.stringify(state.cartItems));
    },
    setQuantity(state, action) {
      const { id, quantity } = action.payload;

      //check if product is available in cart
      const index = state.cartItems.findIndex((x) => x.id === id);
      if (index >= 0) {
        state.cartItems[index].quantity = quantity;
      }
    },
    RemoveItemCart(state, action) {
      const indexToNeedRemove = action.payload;
      state.cartItems = state.cartItems.filter((item) => item.id !== indexToNeedRemove);
      localStorage.setItem('cartItems', JSON.stringify(state.cartItems));
    },
  },
});
const { actions, reducer } = CartSlice;
export const { showMiniCart, hideMiniCart, addToCart, setQuantity, RemoveItemCart } = actions; //name export
export default reducer; //default export
