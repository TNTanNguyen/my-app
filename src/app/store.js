import { configureStore } from '@reduxjs/toolkit';
import couterReducer from '../features/Counter/counterSlice';
import userReducer from '../features/Auth/userSlice';
import cartReducer from '../features/Cart/CartSlice';

const rootReducer = {
  counter: couterReducer,
  user: userReducer,
  cart: cartReducer,
};
const store = configureStore({
  reducer: rootReducer,
});
export default store;
