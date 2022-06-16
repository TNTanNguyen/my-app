import { createSlice } from '@reduxjs/toolkit';

const counterSlice = createSlice({
  name: 'counter',
  initialState: 0,
  reducers: {
    increase(state) {
      return state + 1;
    },
    decrease: (state) => state - 1,
  },
});
//Khai báo nhanh gọn khi đã hiểu
// export const { increase, decrease } = counterSlice.actions;
// export default counterSlice.reducer;

//Khai báo tường minh
const { actions, reducer } = counterSlice;
export const { increase, decrease } = actions;
export default reducer;
