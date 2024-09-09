import { combineReducers } from '@reduxjs/toolkit';
import productReducer from '../features/Product/store/proudctSlice';
import userReducer from '../features/User/store/userSlice';
import chatRoomReducer from '../features/Chat/ChatRoom/store/chatRoomSlice';
import chatRoomListReducer from '../features/Chat/ChatRoomList/store/chatRoomListSlice';

const rootReducer = combineReducers({
  product: productReducer,
  user: userReducer,
  chat: chatRoomReducer,
  chatRoomList: chatRoomListReducer,
});

export default rootReducer;
