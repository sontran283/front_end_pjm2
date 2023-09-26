import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

// user
export const getcategory = createAsyncThunk("getcategory", async () => {
  const response = await axios.get(`http://localhost:1997/categories`);
  return response.data;
});

// delete category
export const deletecategory = createAsyncThunk("deletecategory", async (id) => {
  await axios.delete(`http://localhost:1997/categories/${id}`);
  return id;
});

// add category
export const addCategory = createAsyncThunk("addCategory", async (data) => {
  await axios.post(`http://localhost:1997/categories`, data);
  return data;
});

// edit category
export const updateCatagory = createAsyncThunk("updateCategory", async (cate) => {
    const { id, ...data } = cate
    console.log("id: ", id, "data: ", data);
    await axios.put(`http://localhost:1997/categories/${cate.id}`, data)
    return cate
})

const categoryslice = createSlice({
  name: "category",
  initialState: {
    data: [],
    mess: "no mess",
    isLoadingGet: false,
    isLoadingChange: false,
  },
  extraReducers: (builder) => {
    builder
      // user
      .addCase(getcategory.pending, (state) => {
        return {
          ...state,
          mess: "pending get",
          isLoadingGet: true,
        };
      })
      .addCase(getcategory.fulfilled, (state, action) => {
        return {
          ...state,
          mess: "ok get",
          data: action.payload,
          isLoadingGet: false,
        };
      })
      .addCase(getcategory.rejected, (state) => {
        return {
          ...state,
          mess: "no get",
          isLoadingGet: false,
        };
      })
      // delete
      .addCase(deletecategory.pending, (state) => {
        return {
          ...state,
          mess: "pending delete",
          isLoadingChange: true,
        };
      })
      .addCase(deletecategory.fulfilled, (state, aon) => {
        return {
          ...state,
          mess: "ok delete",
          isLoadingChange: false,
        };
      })
      .addCase(deletecategory.rejected, (state) => {
        return {
          ...state,
          mess: "no delete",
          isLoadingChange: false,
        };
      })

      // add category
      .addCase(addCategory.pending, (state) => {
        return {
          ...state,
          mess: "pending add",
          isLoadingChange: true,
        };
      })
      .addCase(addCategory.fulfilled, (state) => {
        return {
          ...state,
          mess: "oke add",
          isLoadingChange: false,
        };
      })
      .addCase(addCategory.rejected, (state) => {
        return {
          ...state,
          mess: "no add",
          isLoadingChange: false,
        };
      })

      // edit category
      .addCase(updateCatagory.pending, (state) => {
        return {
            ...state,
            mess: "pending update",
            isLoadingChange: true
        }
    })
    .addCase(updateCatagory.fulfilled, (state) => {
        return {
            ...state,
            mess: "oke update",
            isLoadingChange: false
        }
    })
    .addCase(updateCatagory.rejected, (state) => {
        return {
            ...state,
            mess: "no update",
            isLoadingChange: false
        }
    })
  },
});

export default categoryslice.reducer;
