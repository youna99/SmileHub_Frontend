import { combineReducers } from '@reduxjs/toolkit';
import userReducer from '../features/User/store/userSlice';
import productReducer from '../features/Product/store/proudctSlice';
import chatRoomReducer from '../features/Chat/ChatRoom/store/chatRoomSlice';
import chatRoomListReducer from '../features/Chat/ChatRoomList/store/chatRoomListSlice';
import userTabReducer from '../features/Admin/UserTab/store/userTabSlice';
import productTabReducer from '../features/Admin/ProductTab/store/productTabSlice';

const rootReducer = combineReducers({
  product: productReducer,
  user: userReducer,
  chat: chatRoomReducer,
  chatRoomList: chatRoomListReducer,
  userTab: userTabReducer,
  productTab: productTabReducer,
});

export default rootReducer;
