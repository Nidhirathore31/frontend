import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axiosInstance from '@/utils/axios';

// Async thunk to fetch products
export const fetchProducts = createAsyncThunk(
  'products/fetchProducts',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get('products/');
      return response.data;
    } catch (err) {
      // Optional: handle errors more gracefully
      return rejectWithValue(err.response?.data?.message || err.message);
    }
  }
);
export const uploadProduct = createAsyncThunk(
  'product/uploadProduct',
  async (formData, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post('products/add', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response?.data || err.message);
    }
  }
);

const productSlice = createSlice({
  name: 'products',
  initialState: {
    products: [],
    status: 'idle', // 'idle' | 'loading' | 'succeeded' | 'failed'
    error: null,
  },
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(fetchProducts.pending, state => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.products = action.payload;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload || 'Failed to fetch products';
      })
      .addCase(uploadProduct.pending, state => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(uploadProduct.fulfilled, state => {
        state.status = 'succeeded';
      })
      .addCase(uploadProduct.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload 
      });
  },
});

export default productSlice.reducer;





    
      
  

