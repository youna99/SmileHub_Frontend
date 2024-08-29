import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  productName: '',
  category: '',
  description: '',
  tags: '',
  price: '',
  images: [],
};

const productSlice = createSlice({
  name: 'product',
  initialState,
});
