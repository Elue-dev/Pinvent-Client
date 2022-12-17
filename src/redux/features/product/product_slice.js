import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  product: null,
  products: [],
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
  totalStoreValue: 0,
  outOfStock: 0,
  category: [],
};

const product_service = createSlice({
  name: "product",
  initialState,
  reducers: {
    CALC_STORE_VALUE: (state, action) => {
      const { products } = action.payload;
      const array = [];
      products?.map((prod) => {
        const { price, quantity } = prod;
        const productValue = price * quantity;
        return array.push(productValue);
      });

      const totalValue = array.reduce((acc, curr) => {
        return acc + curr;
      }, 0);
      state.totalStoreValue = totalValue;
    },
    CALC_OUT_OF_STOCK: (state, action) => {
      const { products } = action.payload;
      const array = [];
      products?.map((prod) => {
        const { quantity } = prod;
        return array.push(quantity);
      });
      let count = 0;
      array.forEach((val) => {
        if (val === 0 || val === "0") {
          count += 1;
        }
      });
      state.outOfStock = count;
    },
    CALC_CAREGORIES: (state, action) => {
      const { products } = action.payload;
      let array = [];
      products?.map((prod) => {
        const { category } = prod;
        return array.push(category);
      });
      const uniqueCategory = [...new Set(array)];
      state.category = uniqueCategory.length;
    },
  },
});

export const { CALC_STORE_VALUE, CALC_OUT_OF_STOCK, CALC_CAREGORIES } =
  product_service.actions;

export const selectisLoading = (state) => state.product.isLoading;
export const selectProducts = (state) => state.product.products;
export const selectTotalStoreValue = (state) => state.product.totalStoreValue;
export const selectOutOfStock = (state) => state.product.outOfStock;
export const selectCategories = (state) => state.product.category;

export default product_service.reducer;
