import { configureStore } from '@reduxjs/toolkit';
import rootReducer from './rootReducer';

const rootStore = configureStore({
    reducer: {
        reducer: rootReducer,
    },
});

module.exports = rootStore;
