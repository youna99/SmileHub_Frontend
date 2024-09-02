import { combineReducers } from '@reduxjs/toolkit';
import userReducer from '../features/User/store/userSlice';
import productReducer from '../features/Product/store/proudctSlice';

const rootReducer = combineReducers({
  product: productReducer,
  user: userReduce
});

export default rootReducer;
