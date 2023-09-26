import { configureStore, createSlice } from "@reduxjs/toolkit";
import userSlice from "./slice/userSlice";
import categorySlice from "./slice/categorySlice";
import productSlice from "./slice/productSlice";
import orderSlice from "./slice/orderSlice";

export const store = configureStore({
  reducer: {
    user: userSlice,
    category: categorySlice,
    product: productSlice,
    order: orderSlice,
  },
});
