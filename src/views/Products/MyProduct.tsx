import { useCallback, useEffect, useState } from "react";
import Card from "../../components/Card/Card";
import Grid from "../../components/Grid/Grid";
import { MdDelete } from "react-icons/md";
import { MdEdit } from "react-icons/md";
import { setItems } from "../../lib/features/products/cartSlice";
import { useAppDispatch } from "../../lib/store";
import {
  useDeleteProductMutation,
  useGetProductBySellerQuery,
} from "../../lib/features/products/productApiSlice";
import { Spin } from "antd";
import BuyerWrapper from "../../hooks/BuyerWrapper";
import CustomModal from "../../components/Modal/CustomModal";
import AddProduct from "./AddProduct";
import { toast } from "react-toastify";
import useAuthHelper from "../../hooks/auth/authHelper";
import { useLocation } from "react-router-dom";
import SellerWrapper from "../../hooks/SellerWrapper";

export interface ITab {
  isActive: boolean;
  name: string;
}

const MyProduct = () => {
  const [products, setProducts] = useState<any>([]);
  const [editData, setEditData] = useState([])
  const { getUserDetails } = useAuthHelper();
  const dispatch = useAppDispatch();
  const [isOpen, setIsOpen] = useState(false);

  const [
    deleteProduct,
    {
      isLoading: delProductIsLoading,
      isSuccess: delProdSuccess,
      data: delProductData,
      isError: delProdIsErr,
      error: delProdErr,
    },
  ] = useDeleteProductMutation();
  const {
    isFetching: prodBySellerIsLoading,
    isSuccess: prodBySellerIsSuccess,
    data: prodBySellerData,
    error: prodBySellerErr,
    isError: prodBySellerIsErr,
  } = useGetProductBySellerQuery(getUserDetails()?.user_id);

  const handleCancelIsOpen = useCallback(() => {
    setIsOpen(false);
    setEditData(null)
  }, [isOpen]);

  const handleProductSelect = useCallback((item) => {
    dispatch(setItems(item));
    toast.success("Product added to cart!")
  }, []);

  const handleDelete = useCallback((productId: string) => {
    deleteProduct(productId);
  }, []);

  const handleEdit = useCallback((value)=>{
    setEditData(value)
    setIsOpen(true)
  },[])


  useEffect(() => {
    if (delProdIsErr) {
      toast.error(delProdErr?.data?.data);
    }
    if (delProdSuccess && delProductData?.responseCode === "200") {
      toast(delProductData?.responseDescritpion);
    }
    if (prodBySellerIsErr) {
      toast.error(prodBySellerErr?.data.data);
    }
  }, [
    delProdIsErr,
    prodBySellerIsErr,
    delProdSuccess,
  ]);

  return (
    <>
      <Spin
        className="h-full"
        spinning={
          delProductIsLoading || prodBySellerIsLoading
        }
      >
        <Grid>
          {prodBySellerData?.data?.map((res) => (
            <div key={res?.product_id} className="rounded-lg h-full shadow-lg">
              <Card>
                <div className="flex justify-between h-full flex-col">
                  <div className="flex gap-5 flex-col justify-center">
                    <h4 className="flex gap-3 items-center">
                      <span className="text-2xl mt-[-6px] font-bold">
                        Product Name:{" "}
                      </span>
                      {res?.productName}
                    </h4>
                    <p className="flex gap-3 items-center">
                      <span className="text-2xl mt-[-4px] font-semibold">
                        Price:{" "}
                      </span>
                      {res?.cost}
                    </p>
                    <p className="flex gap-3 items-center">
                      <span className="text-2xl mt-[-4px] font-semibold">
                        Product Quantity:{" "}
                      </span>
                      {res?.amountAvailable}
                    </p>
                  </div>
                  <BuyerWrapper>
                    <div className="">
                      <button
                        onClick={() => handleProductSelect(res)}
                        className="bg-slate-600 text-white py-[2px] px-[4px]
                    rounded-[4px] hover:scale-110
                  "
                      >
                        Add to cart
                      </button>
                    </div>
                  </BuyerWrapper>
                  <SellerWrapper>
                    <div className="flex flex-row gap-4 justify-end">
                      <MdDelete
                        onClick={() => handleDelete(res?.product_id)}
                        size={20}
                        className="text-red-500 cursor-pointer hover:scale-110"
                      />
                      <MdEdit
                        onClick={()=>handleEdit(res)}
                        size={20}
                        className="text-slate-600 cursor-pointer hover:scale-110"
                      />
                    </div>
                  </SellerWrapper>
                </div>
              </Card>
            </div>
          ))}
        </Grid>
      </Spin>
      <CustomModal isOpen={isOpen} onCancel={handleCancelIsOpen}>
        <AddProduct
          setIsOpen={setIsOpen}
          editData={editData}
          setEditData={setEditData}
        />
      </CustomModal>
    </>
  );
};

export default MyProduct;
