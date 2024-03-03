import { createSlice } from '@reduxjs/toolkit';

const sidebarSlice = createSlice({
  name: 'sidebar',

  initialState: {
    filter: {
      brand: '',
      price: 0,
      product: '',
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
  },
});
export const { filtersChanged, filtersBooleanChanged } = sidebarSlice.actions;
export default sidebarSlice.reducer;
