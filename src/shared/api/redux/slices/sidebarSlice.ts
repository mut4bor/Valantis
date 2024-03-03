import { createSlice } from '@reduxjs/toolkit';

const sidebarSlice = createSlice({
  name: 'sidebar',

  initialState: {
    productsToShow: 50,
  },

  reducers: {
    p(state, action) {
      state.productsToShow = action.payload;
    },
  },
});
export const { p } = sidebarSlice.actions;
export default sidebarSlice.reducer;
