import { createSlice } from "@reduxjs/toolkit";
import { IProductDetails } from "../../../interfaces/redux.interface";


const initialValue: IProductDetails[] = JSON.parse(localStorage.getItem('cart')) || []

const cartSlice = createSlice({
    name: 'cart',
    initialState: { products: initialValue},
    
    reducers: {
        setItems: (state, action) => {
            const { product_id } = action.payload;
            const existingProduct = state.products.find(product => product.product_id === product_id);
            if (existingProduct) {
                existingProduct.quantity += 1;
            } else {
                state.products.push({ ...action.payload, quantity: 1 });
            }
            localStorage.setItem('cart', JSON.stringify(state.products));
        },
        clearCart: (state, action)=>{
            state.products = []
            localStorage.removeItem('cart')
        }
    }
});


export const {setItems, clearCart} = cartSlice.actions

export default cartSlice.reducer
