import { useSelector } from "react-redux"
import { RootState, useAppDispatch } from "../../lib/store"
import useAuthHelper from "../../hooks/auth/authHelper"
import { useCallback, useEffect } from "react"
import { useBuyItemsMutation } from "../../lib/features/products/productApiSlice"
import { Spin } from "antd"
import { LoadingOutlined } from "@ant-design/icons";
import {toast} from 'react-toastify'
import { useNavigate } from "react-router-dom"
import { clearCart } from "../../lib/features/products/cartSlice"
import { setOpenAuthModal } from "../../lib/features/globalSlice"


const CheckoutBtn = () =>{
    const {getUserDetails, isAuthenticated} = useAuthHelper()
    const getCartData = useSelector((state: RootState)=> state.cartReducer.products)
    const dispatch = useAppDispatch()
    const router = useNavigate()
    const checkOut = getCartData.map((res)=>{
        return {
            productId: res?.product_id,
            buyerId: getUserDetails()?.user_id,
            quantity: res?.quantity,
            totalAmount: res?.cost * res?.quantity
        }
    })

    const [buyItems,{data, isError, isLoading, isSuccess, error}] = useBuyItemsMutation()


    const handleCheckout = useCallback(()=>{
        if(!isAuthenticated()){
            dispatch(setOpenAuthModal(true))
        }else if(isAuthenticated() && getUserDetails()?.role === "SELLER"){
            toast.info("You can not perform this operation. Login with a buyer account")
        }else{
            buyItems(checkOut)
        }
    },[isAuthenticated])


    useEffect(()=>{
        if(isSuccess && data?.responseCode === '200'){
            toast.success(data?.responseDescription)
            setTimeout(()=>{
                dispatch(clearCart(''))
                router('/')
            },2000)
        }
        if(data?.responseCode !=="200"){
            toast.error(data?.data)
        }
        if(isError){
            toast.error(error?.data?.data)
        }
    },[isSuccess, isError])


    return (
        <button className="bg-[#7E30E1] py-[5px] px-[20px] mt-4 text-[20px] 
            font-semibold text-white rounded"
            onClick={handleCheckout}
        >
            {isLoading ? (
                  <>
                    <Spin
                      className="mr-[10px]"
                      indicator={
                        <LoadingOutlined style={{ fontSize: 20 }} spin />
                      }
                    />
                   Checkout ...
                  </>
                ) : (
                  <>
                    Checkout
                  </>
                )}
        </button>
    )
}

export default CheckoutBtn