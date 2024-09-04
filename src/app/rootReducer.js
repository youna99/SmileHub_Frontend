import { combineReducers } from '@reduxjs/toolkit';
import userReducer from '../features/User/store/userSlice';
import productReducer from '../features/Product/store/proudctSlice';
import mypageReducer from '../features/User/store/myPageSlice';

const rootReducer = combineReducers({
  product: productReducer,
  user: userReducer,
  mypage: mypageReducer,
});

export default rootReducer;
