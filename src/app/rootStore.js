import { configureStore } from '@reduxjs/toolkit';
import storage from 'redux-persist/lib/storage';
import persistReducer from 'redux-persist/es/persistReducer';
import userReducer from '../features/User/store/userSlice';
import persistStore from 'redux-persist/es/persistStore';

// const rootStore = configureStore({
//   reducer: rootReducer,
// });

// export default rootStore;

// persistReducer 설정
const persistConfig = {
  key: 'root',
  storage,
  blacklist: ['error'], // 'error' 상태를 persist하지 않도록 설정
};

const persistedReducer = persistReducer(persistConfig, userReducer);

const store = configureStore({
  reducer: {
    user: persistedReducer,
  },
  // serializableCheck을 false로 설정하여 비직렬화 값에 대한 경고를 무시합니다.
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

const persistor = persistStore(store);

export { store, persistor };
