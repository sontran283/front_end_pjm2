import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

// export const getOrder = createAsyncThunk("getOrder", async () => {
//   const response = await axios.get(`http://localhost:1997/orders`);
//   return response.data;
// });
export const getOrder = createAsyncThunk("getOrder", async (search) => {
  if (search) {
      const response = await axios.get(`http://localhost:1997/orders?_sort=id&_order=desc&fullName_like=${search}`);
      console.log('response', response.data);
      return response.data;
  } else {
      const response = await axios.get(`http://localhost:1997/orders?_sort=id&_order=desc`);
      return response.data;
  }
});

const orderSlice = createSlice({
  name: "orders",
  initialState: {
    data: [],
    mess: "no mess",
    isLoadingGet: false,
    isLoadingChange: false,
  },
  extraReducers: (builder) => {
    builder
      .addCase(getOrder.pending, (state) => {
        return {
          ...state,
          mess: "pending",
          isLoadingGet: true,
        };
      })
      .addCase(getOrder.fulfilled, (state, action) => {
        return {
          ...state,
          mess: "ok",
          data: action.payload,
          isLoadingGet: false,
        };
      })
      .addCase(getOrder.rejected, (state) => {
        return {
          ...state,
          mess: "no",
          isLoadingGet: false,
        };
      });
  },
});

export default orderSlice.reducer;
