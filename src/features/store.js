import { configureStore } from '@reduxjs/toolkit'
import blogReducer from './blogSlice';
import userReducer from './userSlice';

export const store = configureStore({
    reducer:{
        blogs: blogReducer,
        users: userReducer,
    }
})