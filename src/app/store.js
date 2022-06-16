import { configureStore } from '@reduxjs/toolkit';
import couterReducer from '../features/Counter/counterSlice';

const rootReducer = {
  counter: couterReducer,
};
const store = configureStore({
  reducer: rootReducer,
});
export default store;
