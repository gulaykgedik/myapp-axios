import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "../../utils/api";

export const getProducts = createAsyncThunk(
  'product/getProducts',
  async (_, {rejectWithValue}) => {
   
    try {
      const response = await api.get('/products');
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const deleteProductThunk = createAsyncThunk(
  'product/deleteProductThunk',
  async ({id}, {dispatch, rejectWithValue}) => {
    try {
      const response = await api.delete(`/products/${id}`);
      if (response.status === 200) await dispatch(deleteProduct(id));
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const createProductThunk = createAsyncThunk(
  'product/createProductThunk',
  async (product, {rejectWithValue}) => {
    try {
      const response = await api.post('/products', product);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data);
    }
  }
);

export const updateProductThunk = createAsyncThunk(
  'product/updateProductThunk',
  async (product, {rejectWithValue,dispatch}) => {
    try {
      const response = await api.put(`/products/${product.id}`, product);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data);
    }
  }
);

const productSlice = createSlice({
  name: 'product',
  initialState: {
    products: [],
    loading: false,
    error: null,
    createError: null
  },
  reducers: {
    deleteProduct: (state, action) => {
      state.products = state.products.filter(product => product.id !== action.payload);
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(getProducts.pending, (state,action) => {
        state.loading = true;
        state.error = null;
      })
       .addCase(getProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(getProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.products = action.payload;
      });
     

      // cteare thunk
      builder
        .addCase(createProductThunk.pending, (state) => {
          state.loading = true;
          state.createError = null;
        })
        .addCase(createProductThunk.rejected, (state, action) => {
          state.loading = false;
          state.createError = action.payload;
        })
        .addCase(createProductThunk.fulfilled, (state, action) => {
          state.loading = false;
          state.createError = null;
          state.products.push(action.payload);
        });

      // update thunk
      builder
        .addCase(updateProductThunk.pending, (state) => {
          state.loading = true;
          state.error = null;
        })
        .addCase(updateProductThunk.rejected, (state, action) => {
          state.loading = false;
          state.error = action.payload;
        })
        .addCase(updateProductThunk.fulfilled, (state, action) => {
          state.loading = false;
          state.error = null;
          const index = state.products.findIndex(product => product.id === action.payload.id);
          if (index !== -1) {
            state.products[index] = action.payload;
          }
        });
  }
 
});



export const { deleteProduct } = productSlice.actions;

export default productSlice.reducer;
