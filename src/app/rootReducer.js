import { combineReducers } from '@reduxjs/toolkit';
import userReducer from '../features/User/store/userSlice';

const rootReducer = combineReducers({
    user: userReducer,
});

export default rootReducer;
