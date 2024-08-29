import { configureStore } from '@reduxjs/toolkit';
import rootReducer from './rootReducer';

const rootStore = configureStore({
    reducer: {
        reducer: rootReducer,
    },
});

export default rootStore;
