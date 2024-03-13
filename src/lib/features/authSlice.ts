import { createSlice } from "@reduxjs/toolkit";

const initialValue = {
    access_token: localStorage.getItem("Token"),

}

const authSlice = createSlice({
    name: 'auth',
    initialState: initialValue,
    reducers: {
        setToken: (state, action) => {
            state.access_token = action.payload
            localStorage.setItem('Token', action.payload)
        },
        logOut: (state, action) => {
            localStorage.removeItem('Token')
            state.access_token = null
          }        
    }
})


export const {setToken, logOut} = authSlice.actions
export default authSlice.reducer