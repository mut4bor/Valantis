import { createSlice } from '@reduxjs/toolkit';

const paginationSlice = createSlice({
  name: 'pagination',

  initialState: {
    value: 1,
    minValue: 1,
    maxValue: 100,
    isDisabled: true,
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
    isDisabledChanged(state, action) {
      state.isDisabled = action.payload;
    },
  },
});

export const { increment, decrement, maxValueChanged, isDisabledChanged } =
  paginationSlice.actions;
export default paginationSlice.reducer;
