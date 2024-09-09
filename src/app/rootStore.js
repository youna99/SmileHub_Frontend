import { configureStore } from '@reduxjs/toolkit';
import storage from 'redux-persist/lib/storage';
import persistReducer from 'redux-persist/es/persistReducer';
import persistStore from 'redux-persist/es/persistStore';
import { combineReducers } from '@reduxjs/toolkit';
import userReducer from '../features/User/store/userSlice';
import productReducer from '../features/Product/store/proudctSlice';
import chatRoomReducer from '../features/Chat/ChatRoom/store/chatRoomSlice';
import chatRoomListReducer from '../features/Chat/ChatRoomList/store/chatRoomListSlice';
import productTabReducer from '../features/Admin/ProductTab/store/productTabSlice';
import userTabReducer from '../features/Admin/UserTab/store/userTabSlice';

// persistReducer 설정
const persistConfig = {
  key: 'user', // 'user' 키로 저장
  storage,
  blacklist: ['error'], // 'error' 상태를 persist하지 않도록 설정
};

// userReducer에 persistReducer 적용
const persistedUserReducer = persistReducer(persistConfig, userReducer);

// rootReducer 정의
const rootReducer = combineReducers({
  product: productReducer,
  user: persistedUserReducer, // persistedUserReducer 사용
  chat: chatRoomReducer,
  chatRoomList: chatRoomListReducer,
  productTab: productTabReducer,
  userTab: userTabReducer,
});

const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

const persistor = persistStore(store);

export { store, persistor };
