import { TiShoppingCart } from "react-icons/ti";
import { useSelector } from "react-redux";
import { RootState, useAppDispatch } from "../../lib/store";
import { setOpenAuthModal } from "../../lib/features/globalSlice";
import useAuthHelper from "../../hooks/auth/authHelper";
import { useCallback, useEffect, useState } from "react";
import { logOut } from "../../lib/features/authSlice";
import { useChangeLoginStatusMutation } from "../../lib/features/authApiSlice";
import { Link } from "react-router-dom";
import CustomModal from "../Modal/CustomModal";
import Deposit from "../Deposit/Deposit";

const Navbar = () => {
  const getProductCart = useSelector((state: RootState)=> state.cartReducer.products)
  const dispatch = useAppDispatch()
  const [isOpen, setIsOpen] = useState(false)
  const {isAuthenticated, getToken, getUserDetails} = useAuthHelper()
  const [
    changeLoginStatus,
  ] = useChangeLoginStatusMutation();


  const handleLogOut = useCallback(()=>{
    changeLoginStatus(getUserDetails()?.username)
    dispatch(logOut(""))
  },[getUserDetails()?.username])

  const handleDepositClick = useCallback(()=>{
    setIsOpen(true)
  },[])

  useEffect(() => {
  }, [isAuthenticated, getToken]);




    return (
        <div className="w-full h-[80px] bg-slate-600 flex items-center">
            <div className="flex w-full flex-row justify-between p-[12px]">
                <div className="w-1/3 flex justify-center items-center">
                    <a href="/" className="text-2xl font-bold antialiased text-white">Home</a>
                </div>
                <div className="w-1/2 flex flex-row gap-[20px] items-center justify-end md:pr-10 text-white">
                    <div className="cursor-pointer flex flex-row relative">
                        <Link to="/cart">
                            <TiShoppingCart size="20px" className="antialiased font-semibold" />
                        </Link>
                        <div className="rounded-full bg-white py-0 px-[2px] text-[11px] text-black min-w-[15px] text-center
                          absolute -top-2 -right-2"
                        >
                            {
                                getProductCart?.length > 0 && (
                                    <span>
                                        {getProductCart?.length > 10 ? '10+' : getProductCart.length}
                                    </span>
                                )
                            }
                        {/* <span className="text-1xl font-bold absolute -top-1">+</span> */}
                        </div>
                    </div>{
                        isAuthenticated() ? (
                            <div className="flex flex-row gap-4 items-center">
                                {
                                    getUserDetails()?.role ==="BUYER" && (
                                        <button onClick={() => handleDepositClick()} className="font-semibold antialiased">Deposit</button>
                                    )
                                }
                            <button onClick={() => handleLogOut()} className="font-semibold antialiased">Log Out</button>

                            </div>
                        ):(
                        <button onClick={() => dispatch(setOpenAuthModal(true))} className="font-semibold antialiased">Sign In</button>
                        )
                    }
                </div>
            </div>
            <CustomModal isOpen={isOpen} onCancel={setIsOpen}  >
                <Deposit setIsOpen={setIsOpen} />
            </CustomModal>
        </div>
    )
}

export default Navbar;
