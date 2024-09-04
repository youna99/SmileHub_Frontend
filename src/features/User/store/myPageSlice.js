import { createSlice } from '@reduxjs/toolkit';

// 초기 상태
const initialState = {
  sells: [
    {
      userid: '1',
      productId: '1',
      img: '',
      productName: '상품 1',
      address: '주소1',
      price: '10000',
      status: '판매중',
      isPayment: true,
    },
    {
      userid: '1',
      productId: '2',
      img: '',
      productName: '상품 2',
      address: '주소2',
      price: '20000',
      status: '배송 대기중',
      isPayment: false,
    },
    {
      userid: '1',
      productId: '3',
      img: '',
      productName: '상품 3',
      address: '주소3',
      price: '30000',
      status: '배송중',
      isPayment: false,
    },
  ],
  buys: [
    {
      userid: '1',
      productId: '1',
      img: '',
      productName: '상품 1',
      address: '주소1',
      price: '10000',
      status: '배송 대기중',
      isPayment: false,
    },
    {
      userid: '1',
      productId: '2',
      img: '',
      productName: '상품 3',
      address: '주소1',
      price: '30000',
      status: '배송중',
      isPayment: false,
    },
    {
      userid: '1',
      productId: '3',
      img: '',
      productName: '상품 3',
      address: '주소1',
      price: '10000',
      status: '배송 완료',
      isPayment: false,
    },
  ],
};

const myPageSlice = createSlice({
  name: 'mypage',
  initialState,
  reducers: {
    // 판매내역 status 업데이트
    updateSellsStatus: (state, action) => {
      const { productId, newStatus } = action.payload;
      const sell = state.sells.find((sell) => sell.productId === productId);
      if (sell) {
        sell.status = newStatus;
      }
    },
    // 구매내역 status 업데이트
    updateBuysStatus: (state, action) => {
      const { productId, newStatus } = action.payload;
      const buy = state.buys.find((buy) => buy.productId === productId);
      if (buy) {
        buy.status = newStatus;
      }
    },

    // 결제 상태 업데이트
    updatePaymentStatus: (state, action) => {
      state.isPayment = action.payload;
    },
  },
});

export const { updateSellsStatus, updateBuysStatus, updatePaymentStatus } =
  myPageSlice.actions;
export default myPageSlice.reducer;
