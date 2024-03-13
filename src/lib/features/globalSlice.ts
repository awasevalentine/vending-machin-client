import { createSlice } from "@reduxjs/toolkit";


const initialValue = {
    openAuthModal: false
}

const globalSlice = createSlice({
    name: 'global',
    initialState: initialValue,

    reducers: {
        setOpenAuthModal: (state, action)=>{
            state.openAuthModal = action.payload
        },

        setCloseAuthModal: (state, action)=>{
            state.openAuthModal = action.payload
        }
    }
})

export const {setOpenAuthModal, setCloseAuthModal} = globalSlice.actions

export default globalSlice.reducer