import { createSlice } from '@reduxjs/toolkit';

const settingsSlice = createSlice({
  name: 'settings',

  initialState: {
    productsToShow: 50,
  },

  reducers: {
    productsToShowChanged(state, action) {
      state.productsToShow = action.payload;
    },
  },
});
export const { productsToShowChanged } = settingsSlice.actions;
export default settingsSlice.reducer;
