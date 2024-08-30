import { createSlice } from '@reduxjs/toolkit';

const productSlice = createSlice({
  name: 'product',
  initialState: {
    productName: '',
    category: '',
    description: '',
    tags: '',
    price: '',
    images: [],
  },
  reducers: {
    setProductName: (state, action) => {
      state.productName = action.payload;
    },
  },
});
