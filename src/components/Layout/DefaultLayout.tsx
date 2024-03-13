import { Outlet } from "react-router-dom"
import { ToastContainer } from 'react-toastify';
import Navbar from "../Navbar/Navbar"



const DefaultLayout = ()=>{


    return (
        <>
        <Navbar />
        <Outlet />
        <ToastContainer />
        </>
    )
}

export default DefaultLayout