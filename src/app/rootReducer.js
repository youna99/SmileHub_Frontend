import { combineReducers } from '@reduxjs/toolkit';
import productReducer from '../features/Product/store/proudctSlice';

const rootReducer = combineReducers({
  product: productReducer,
});

export default rootReducer;
