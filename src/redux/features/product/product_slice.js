import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { useSelector } from "react-redux";
import { showAlert } from "../../../utils/alert/Alert";
import { getUserToken } from "../auth/auth_slice";
import productService from "./product_service";

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

export const createProduct = createAsyncThunk(
  "products/create", // give it a name
  async (formData, thunkAPI) => {
    const token = useSelector(getUserToken);
    try {
      return await productService.createProduct(formData, token);
    } catch (error) {
      console.log(error);
      const message = error.response?.data.message;
      showAlert("error", message);
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// export const getProducts = createAsyncThunk(
//   "products/getAll",
//   async (_, thunkAPI) => {
//     try {
//       return await productService.getAllProducts();
//     } catch (error) {
//       console.log(error);
//       const message = error.response?.data.message;
//       showAlert("error", message);
//       return thunkAPI.rejectWithValue(message);
//     }
//   }
// );

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
  extraReducers: (builder) => {
    builder
      .addCase(createProduct.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createProduct.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.products.push(action.payload);
        showAlert("success", "Product added successfully!");
        location.assign("/dashboard");
      })
      .addCase(createProduct.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        showAlert("error", action.payload);
      });
    // .addCase(getProducts.pending, (state) => {
    //   state.isLoading = true;
    // })
    // .addCase(getProducts.fulfilled, (state, action) => {
    //   state.isLoading = false;
    //   state.isSuccess = true;
    //   state.isError = false;
    //   state.products = action.payload;
    //   location.assign("/dashboard");
    // })
    // .addCase(getProducts.rejected, (state, action) => {
    //   state.isLoading = false;
    //   state.isError = true;
    //   state.message = action.payload;
    //   showAlert("error", action.payload);
    // });
  },
});

export const { CALC_STORE_VALUE, CALC_OUT_OF_STOCK, CALC_CAREGORIES } =
  product_service.actions;

export const selectisLoading = (state) => state.product.isLoading;
// export const selectisSuccess = (state) => state.product.isSuccess;
// export const selectisError = (state) => state.product.isError;
// export const selectProducts = (state) => state.product.products;
export const selectTotalStoreValue = (state) => state.product.totalStoreValue;
export const selectOutOfStock = (state) => state.product.outOfStock;
export const selectCategories = (state) => state.product.category;

export default product_service.reducer;
