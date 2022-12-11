import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  filteredProducts: [],
};

const filter_slice = createSlice({
  name: "filter",
  initialState,
  reducers: {
    FILTER_PRODUCTS: (state, action) => {
      const { products, search } = action.payload;
      const tempProduct = products?.filter(
        (prod) =>
          prod.name.toLowerCase().includes(search.toLowerCase()) ||
          prod.category.toLowerCase().includes(search.toLowerCase())
      );
      state.filteredProducts = tempProduct;
    },
  },
});

export const { FILTER_PRODUCTS } = filter_slice.actions;

export const selectFilteredProducts = (state) => state.filter.filteredProducts;

export default filter_slice.reducer;
