import { createSlice } from '@reduxjs/toolkit';

const paginationSlice = createSlice({
  name: 'pagination',

  initialState: {
    value: 1,
  },

  reducers: {
    increment(state) {
      state.value++;
    },
    decrement(state) {
      if (state.value > 1) {
        state.value--;
      }
    },
  },
});

export const { increment, decrement } = paginationSlice.actions;
export default paginationSlice.reducer;
