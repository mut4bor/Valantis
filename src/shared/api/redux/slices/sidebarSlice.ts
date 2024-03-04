import { createSlice } from '@reduxjs/toolkit';

const sidebarSlice = createSlice({
  name: 'sidebar',

  initialState: {
    filter: {
      brand: '',
      price: 0,
      product: '',
    },
    priceRange: {
      min: 0,
      max: 0,
    },
    filterBoolean: false,
  },

  reducers: {
    filtersChanged(state, action) {
      state.filter = action.payload;
    },
    filtersBooleanChanged(state, action) {
      state.filterBoolean = action.payload;
    },
    priceRangeChanged(state, action) {
      state.priceRange = action.payload;
    },
  },
});
export const { filtersChanged, filtersBooleanChanged, priceRangeChanged } =
  sidebarSlice.actions;
export default sidebarSlice.reducer;
