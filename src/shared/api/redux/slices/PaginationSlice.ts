import { createSlice } from '@reduxjs/toolkit';

const paginationSlice = createSlice({
  name: 'pagination',

  initialState: {
    paginationValue: 1,
    paginationMinValue: 1,
    paginationMaxValue: 100,
    paginationDisabled: false,
  },

  reducers: {
    paginationValueChanged(state, action) {
      state.paginationValue = action.payload;
    },
    paginationMaxValueChanged(state, action) {
      state.paginationMaxValue = action.payload;
    },
    paginationDisabledChanged(state, action) {
      state.paginationDisabled = action.payload;
    },
  },
});

export const {
  paginationValueChanged,
  paginationMaxValueChanged,
  paginationDisabledChanged,
} = paginationSlice.actions;
export default paginationSlice.reducer;
