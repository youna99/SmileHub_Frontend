import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  products: [
    // 목데이터
    // {
    //   id: 1,
    //   name: '상품1',
    //   price: 10000,
    //   seller: 'user1',
    //   createdAt: '2023-01-01',
    //   reports: 2,
    //   status: '판매중',
    // },
    // {
    //   id: 2,
    //   name: '상품2',
    //   price: 20000,
    //   seller: 'user2',
    //   createdAt: '2023-02-01',
    //   reports: 5,
    //   status: '판매완료',
    // },
  ],
  loading: false,
  error: null,
};

const productSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    setProducts: (state, action) => {
      state.products = action.payload;
    },
    removeProduct: (state, action) => {
      state.products = state.products.filter(
        (product) => product.productId !== action.payload,
      );
    },
  },
});

export const { setProducts, removeProduct } = productSlice.actions;
export default productSlice.reducer;
