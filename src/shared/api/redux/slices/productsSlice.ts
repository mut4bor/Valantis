import { createSlice } from '@reduxjs/toolkit';

const productsSlice = createSlice({
  name: 'products',

  initialState: {
    productsToShow: 50,
    productsSort: {
      selectedSort: 'priceLowToHigh',
      sortNameMap: {
        priceLowToHigh: 'сначала недорогие',
        priceHighToLow: 'сначала дорогие',
      } as Record<string, string>,
    },
    productsInput: {
      value: '',
      productsisEmpty: true,
    },
  },

  reducers: {
    productsToShowChanged(state, action) {
      state.productsToShow = action.payload;
    },
    setSelectedOption(state, action) {
      state.productsSort.selectedSort = action.payload;
    },
    productsInputValueChanged(state, action) {
      state.productsInput.value = action.payload;
    },
  },
});
export const {
  productsToShowChanged,
  setSelectedOption,
  productsInputValueChanged,
} = productsSlice.actions;
export default productsSlice.reducer;
