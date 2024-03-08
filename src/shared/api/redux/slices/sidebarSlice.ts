import { createSlice } from '@reduxjs/toolkit';
import { FilterBrandParams } from '../types';

const sidebarSlice = createSlice({
  name: 'sidebar',

  initialState: {
    filter: {
      brand: undefined,
    } as FilterBrandParams,
    filterIsEmpty: true,
    priceInput: {
      priceInputMin: 0,
      priceInputMax: Infinity,
    },
    priceMinMax: {
      priceMin: 0,
      priceMax: Infinity,
    },
    isOpenedOnMobile: false,
    radioboxDisabled: true,
  },

  reducers: {
    filtersChanged(state, action) {
      state.filter = action.payload;
      state.filterIsEmpty =
        state.filter.brand === '' || state.filter.brand === undefined;
    },
    priceInputValueChanged(state, action) {
      state.priceInput = action.payload;
    },
    priceMinMaxChanged(state, action) {
      state.priceMinMax = action.payload;
    },
    radioboxDisabledChanged(state, action) {
      state.radioboxDisabled = action.payload;
    },
    isOpenedOnMobileChanged(state) {
      state.isOpenedOnMobile = !state.isOpenedOnMobile;
    },
  },
});
export const {
  filtersChanged,
  priceInputValueChanged,
  priceMinMaxChanged,
  radioboxDisabledChanged,
  isOpenedOnMobileChanged,
} = sidebarSlice.actions;
export default sidebarSlice.reducer;
