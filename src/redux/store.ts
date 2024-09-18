import {configureStore} from "@reduxjs/toolkit";
import authSlice from "./slices/authSlice";
import tutorSlice from "./slices/tutorSlice";
import adminSlice from "./slices/adminSlice";
import socketSlice from "./slices/socketSlice";


const store = configureStore({
    reducer:{
        auth:authSlice,
        tutorAuth:tutorSlice,
        adminAuth:adminSlice,
        socket:socketSlice,
    }
})

export default store
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
