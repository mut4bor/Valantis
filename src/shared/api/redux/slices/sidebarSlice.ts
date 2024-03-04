import { createSlice } from '@reduxjs/toolkit';
import { FilterParams } from '../types';

const sidebarSlice = createSlice({
  name: 'sidebar',

  initialState: {
    filter: {
      brand: undefined,
    } as FilterParams,
    priceRange: {
      min: null,
      max: null,
    },
    radioboxDisabled: true,
  },

  reducers: {
    filtersChanged(state, action) {
      state.filter = action.payload;
    },
    priceRangeChanged(state, action) {
      state.priceRange = action.payload;
    },
    radioboxDisabledChanged(state, action) {
      state.radioboxDisabled = action.payload;
    },
  },
});
export const { filtersChanged, priceRangeChanged, radioboxDisabledChanged } =
  sidebarSlice.actions;
export default sidebarSlice.reducer;
