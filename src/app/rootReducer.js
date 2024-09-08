import { combineReducers } from '@reduxjs/toolkit';
import productReducer from '../features/Product/store/proudctSlice';
import mypageReducer from '../features/User/store/myPageSlice';
import userReducer from '../features/User/store/userSlice';

const rootReducer = combineReducers({
  product: productReducer,
  user: userReducer,
});

export default rootReducer;
