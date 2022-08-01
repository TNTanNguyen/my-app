import { createSlice } from '@reduxjs/toolkit';
const CartSlice = createSlice({
  name: 'cart',
  initialState: {
    showMiniCart: false,
    cartItems: [
      // {
      //   id:1,//product Id
      //   product:{},
      //   quantity:1,
      // }
    ],
  },
  reduces: {
    showMiniCart(state) {
      state.showMiniCart = true;
    },
    hideMIniCart(state) {
      state.showMiniCart = false;
    },
    addCart(state, action) {},
    RemoveItemCart(state, action) {
      const indexToNeedRemove = action.payload;
      state.cartItems = state.cartItems.fill((item) => item.id !== indexToNeedRemove);
    },
  },
});
const { actions, reducer } = CartSlice;
export const { showMiniCart, hideMiniCart } = actions; //name export
export default CartSlice.reducer; //default export
