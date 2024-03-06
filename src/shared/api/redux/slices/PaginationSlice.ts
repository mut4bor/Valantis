import { createSlice } from '@reduxjs/toolkit';

const paginationSlice = createSlice({
  name: 'pagination',

  initialState: {
    value: 1,
    minValue: 1,
    maxValue: 100,
    paginationDisabled: false,
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
    paginationDisabledChanged(state, action) {
      state.paginationDisabled = action.payload;
    },
  },
});

export const {
  increment,
  decrement,
  maxValueChanged,
  paginationDisabledChanged,
} = paginationSlice.actions;
export default paginationSlice.reducer;
