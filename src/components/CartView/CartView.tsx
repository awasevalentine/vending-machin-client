import { useSelector } from "react-redux";
import { RootState, useAppDispatch } from "../../lib/store";
import CartItem from "./CartItems";
import CheckoutBtn from "./CheckoutBtn";
import { clearCart } from "../../lib/features/products/cartSlice";
import { useCallback } from "react";
import { useNavigate } from "react-router-dom";

const CartView = () => {
  const getCartData = useSelector(
    (state: RootState) => state.cartReducer.products
  );
  const dispatch = useAppDispatch()
  const router = useNavigate()

  const handleClearCart = useCallback(()=>{
        dispatch(clearCart(''))
        router('/')
  },[])

  const totalAmount = getCartData.map((res) => res.cost * res.quantity).reduce((acc, curr) => acc + curr, 0);



  return (
    <div className="w-full h-full flex flex-col items-center justify-center">
      <div className="flex shadow-lg my-[3rem] border border-white-700 rounded-lg flex-col w-[95%] 
      md:w-[80%] lg:w-[50%] justify-center"
      >
        <div className="flex justify-end pr-[16px] md:pr-[24px] mt-2">
            <button className="rounded-full bg-slate-500 text-[12px] 
                px-1 text-white antialiased font-semibold"
                onClick={()=> handleClearCart()}
            >Clear cart</button>
        </div>
        <div className="p-[16px] md:p-[24px]">
          {getCartData?.map((res) => (
            <>
              <CartItem items={res} />
              <hr className="h-[2px] mb-5 mt-3" />
            </>
          ))}
        <div className="flex flex-row justify-between">
            <span className="text-[18px] font-bold">Total Amount:</span>
            <span className="text-[18px] font-bold">{totalAmount}</span>
        </div>
        </div>
        <CheckoutBtn />
      </div>
    </div>
  );
};

export default CartView;
