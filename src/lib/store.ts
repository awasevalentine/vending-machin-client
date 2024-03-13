import { configureStore } from "@reduxjs/toolkit"
import { useDispatch } from "react-redux";
import { apiSlice } from "./api/apiSlice";
import cartReducer from './features/products/cartSlice'
import globalReducer from './features/globalSlice'
import authReducer from './features/authSlice'

const store = configureStore({
    reducer: {
        [apiSlice.reducerPath]: apiSlice.reducer,
        cartReducer: cartReducer,
        globalReducer: globalReducer,
        auth: authReducer
    },
    middleware: getDefaultMiddleware =>
        getDefaultMiddleware().concat(apiSlice.middleware),
    devTools: true
})

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch

export const useAppDispatch = () => useDispatch<AppDispatch>()

export default store;
