import {configureStore} from "@reduxjs/toolkit";
import authSlice from "./slices/authSlice";
import tutorSlice from "./slices/tutorSlice";


const store = configureStore({
    reducer:{
        auth:authSlice,
        tutorAuth:tutorSlice
    }
})

export default store
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
