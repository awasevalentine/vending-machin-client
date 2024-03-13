import { Outlet } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import SellerWrapper from "../../hooks/SellerWrapper";
import Navbar from "../Navbar/Navbar";
import CustomTab from "../Tab/Tab";

const ProductLayout = () => {
  return (
    <>
      <Navbar />
      <SellerWrapper>
        <CustomTab />
      </SellerWrapper>
      <Outlet />
      <ToastContainer />
    </>
  );
};

export default ProductLayout;
