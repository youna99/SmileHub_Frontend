import { configureStore } from '@reduxjs/toolkit';
import rootReducer from './rootReducer';

const rootStore = configureStore({
  reducer: rootReducer,
});

export default rootStore;
