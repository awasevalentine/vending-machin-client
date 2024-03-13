import { Spin } from "antd"
import { LoadingOutlined } from "@ant-design/icons";
import SubHeader from "../Title/SubHeader";
import { useDepositMutation } from "../../lib/features/deposit/depositSlice";
import { useCallback, useEffect, useState } from "react";
import useAuthHelper from "../../hooks/auth/authHelper";
import {toast} from 'react-toastify'


const Deposit = ({setIsOpen}) =>{
    const [deposit,{ data, isError, isLoading, isSuccess, error}] = useDepositMutation()
    const [amount, setAmount] = useState('')
    const {getUserDetails} = useAuthHelper()
    const [inputError, setInputError] = useState(false)

    const handleSubmit = useCallback(()=>{
        if(!amount){
            setInputError(true)
        }else{
            deposit({amount: Number(amount), buyerId: getUserDetails()?.user_id})
            setInputError(false)
        }
    },[amount, inputError, deposit])

    useEffect(()=>{
        if(isSuccess && data?.responseCode === '200'){
            toast.success(data?.responseDescription)
            setInputError(false)
            setAmount(null)
            setIsOpen(false)
        }
        if(data?.responseCode !=="200"){
            toast.error(data?.data)
        }
        if(isError){
            toast.error(error?.data?.data)
        }
    },[isError, isSuccess, inputError])

    
    return (
        <div className="flex flex-col w-[95%] py-[24px] px-[20px]">
            <SubHeader>Make Deposit</SubHeader>
            <label htmlFor="amount">Amount<span className="text-red-900">*</span></label>
            <input type="number" onChange={(e)=> setAmount(e.target.value)} placeholder="Enter amount to deposit" required className="border-[1.5px] h-9 p-2 rounded-lg focus:outline-none" />
            {
                inputError && (
                    <span className="text-red-700">Deposit amount is required</span>
                )
            }
            <div className="mt-5 flex justify-center gap-4">
            <button
                className="bg-slate-500 py-[5px] px-[20px] text-white rounded"
                type="submit"
                onClick={()=> setIsOpen(false)}
              >
                Cancel
            </button>
            <button
                className="bg-[#7E30E1] py-[5px] px-[20px] text-white rounded"
                onClick={handleSubmit}
              >
                {isLoading ? (
                  <>
                    <Spin
                      className="mr-[10px]"
                      indicator={
                        <LoadingOutlined style={{ fontSize: 20 }} spin />
                      }
                    />
                    Deposit ...
                  </>
                ) : (
                  <>
                  Deposit
                  </>
                )}
              </button>
            </div>
        </div>
    )
}

export default Deposit