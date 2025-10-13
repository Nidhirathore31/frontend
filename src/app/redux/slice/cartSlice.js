import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axiosInstance from '@/utils/axios';

export const addToCartAPI = createAsyncThunk(
  'cart/addToCartAPI',
  async (product, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post('/cart/add', product);
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response?.data || err.message);
    }
  }
);

export const getCartAPI = createAsyncThunk(
  'cart/getCartAPI',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get('/cart');
      return response.data.items; // Assuming the API returns an `items` array
    } catch (err) {
      return rejectWithValue(err.response?.data || err.message);
    }
  }
);

const cartSlice = createSlice({
  name: 'cart',
  initialState: {
    items: [],
    status: 'idle',
    error: null,
  },
  reducers: {
    initializeCart: (state) => {
      // Get cart from localStorage based on user token
      if (typeof window !== 'undefined') {
        const token = localStorage.getItem('token');
        const cartKey = token ? `cart_${token}` : 'cart_guest';
        const savedCart = localStorage.getItem(cartKey);
        
        if (savedCart) {
          state.items = JSON.parse(savedCart);
        } else {
          state.items = [];
        }
      }
    },
    addToCart: (state, action) => {
      const existing = state.items.find(p => p._id === action.payload._id);
      if (existing) {
        existing.quantity += 1;
      } else {
        state.items.push({ ...action.payload, quantity: 1 });
      }

      // Save to localStorage with user-specific key
      if (typeof window !== 'undefined') {
        const token = localStorage.getItem('token');
        const cartKey = token ? `cart_${token}` : 'cart_guest';
        localStorage.setItem(cartKey, JSON.stringify(state.items));
      }
    },
    removeFromCart: (state, action) => {
      state.items = state.items.filter(item => item._id !== action.payload);
      
      // Update localStorage with user-specific key
      if (typeof window !== 'undefined') {
        const token = localStorage.getItem('token');
        const cartKey = token ? `cart_${token}` : 'cart_guest';
        localStorage.setItem(cartKey, JSON.stringify(state.items));
      }
    },
    clearCart: (state) => {
      state.items = [];
      
      // Clear from localStorage with user-specific key
      if (typeof window !== 'undefined') {
        const token = localStorage.getItem('token');
        const cartKey = token ? `cart_${token}` : 'cart_guest';
        localStorage.removeItem(cartKey);
      }
    }
  },
  extraReducers: builder => {
    builder
      .addCase(addToCartAPI.pending, state => {
        state.status = 'loading';
      })
      .addCase(addToCartAPI.fulfilled, (state) => {
        state.status = 'succeeded';
      })
      .addCase(addToCartAPI.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      })
      .addCase(getCartAPI.pending, state => {
        state.status = 'loading';
      })
      .addCase(getCartAPI.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.items = action.payload; // Update the cart items with the fetched data
      })
      .addCase(getCartAPI.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      });
  },
});

export const { addToCart, removeFromCart, clearCart, initializeCart } = cartSlice.actions;
export default cartSlice.reducer;
