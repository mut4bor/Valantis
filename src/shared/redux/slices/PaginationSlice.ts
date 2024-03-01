import { createSlice } from '@reduxjs/toolkit';

const paginationSlice = createSlice({
  name: 'pagination',

  initialState: {
    value: 1,
    minValue: 1,
    maxValue: 100,
    productsToShow: 50,
  },

  reducers: {
    increment(state) {
      state.value++;
    },
    decrement(state) {
      state.value--;
    },
    maxValueChanged(state, action) {
      state.maxValue = action.payload;
    },
  },
});

export const { increment, decrement, maxValueChanged } =
  paginationSlice.actions;
export default paginationSlice.reducer;
