import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const getProduct = createAsyncThunk("getProduct", async () => {
  const response = await axios.get("http://localhost:1997/products");
  return response.data;
});

//goi API lay tat ca du lieu
export const getProductSearch = createAsyncThunk("getProductSearch", async (searchText) => {
  if (searchText !== undefined) {
    const response = await axios.get(
      `http://localhost:1997/products?fullname_like=${searchText}`
    );
    return response.data;
  } else {
    const response = await axios.get(`http://localhost:1997/products`);
    return response.data;
  }
});

const productSlice = createSlice({
  name: "user",
  initialState: {
    data: [],
    mess: "no mess",
    isLoadingGet: false,
  },
  extraReducers: (builder) => {
    builder
      .addCase(getProduct.pending, (state) => {
        return {
          ...state,
          mess: "pending get",
          isLoadingGet: true,
        };
      })
      .addCase(getProduct.fulfilled, (state, action) => {
        return {
          ...state,
          mess: "ok get",
          data: action.payload,
          isLoadingGet: false,
        };
      })
      .addCase(getProduct.rejected, (state) => {
        return {
          ...state,
          mess: "no get",
          isLoadingGet: false,
        };
      });
  },
});
export default productSlice.reducer;
