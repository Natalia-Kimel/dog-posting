import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { Product, initialState } from '../types';

export const fetchProducts = createAsyncThunk('products/fetchProducts', async () => {
  const response = await axios.get('https://api.thedogapi.com/v1/images/search?size=med&mime_types=jpg&format=json&has_breeds=true&order=RANDOM&page=0&limit=20&api_key=live_MQywzyxv374aHbDeNUZn2l8r3CRbuIWF50tt57khEykJlMGHw7vtr0t56uZlm9Qh');
  return response.data;
});

const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    toggleLike: (state, action) => {
      const product = state.products.find(p => p.id === action.payload);
      if (product) {
        product.liked = !product.liked;
      }
    },
    removeProduct: (state, action) => {
      state.products = state.products.filter(p => p.id !== action.payload);
    },
    addProduct: (state, action) => {
      state.products.unshift(action.payload);
    },
    setFilter: (state, action) => {
      state.filter = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.products = action.payload.map((product: Product) => ({
          ...product,
          liked: false,
        }));
      })
      .addCase(fetchProducts.rejected, (state) => {
        state.loading = false;
        state.error = 'Failed to fetch products';
      });
  },
});

export const { toggleLike, removeProduct, addProduct, setFilter } = productsSlice.actions;
export default productsSlice.reducer;