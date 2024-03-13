import { useCallback, useEffect, useState } from "react";
import Card from "../../components/Card/Card";
import Grid from "../../components/Grid/Grid";
import Tab from "../../components/Tab/Tab";
import { Products1 } from "../../constants/mock.data";
import SellerWrapper from "../../hooks/SellerWrapper";
import { MdDelete } from "react-icons/md";
import { MdEdit } from "react-icons/md";
import { setItems } from "../../lib/features/products/cartSlice";
import { useAppDispatch } from "../../lib/store";
import {
  useDeleteProductMutation,
  useGetProductBySellerQuery,
  useGetProductsQuery,
} from "../../lib/features/products/productApiSlice";
import { Spin } from "antd";
import BuyerWrapper from "../../hooks/BuyerWrapper";
import CustomModal from "../../components/Modal/CustomModal";
import AddProduct from "./AddProduct";
import { toast } from "react-toastify";
import useAuthHelper from "../../hooks/auth/authHelper";

export interface ITab {
  isActive: boolean;
  name: string;
}

const AllProducts = () => {
  const [tab, setTab] = useState<ITab[]>([
    { isActive: false, name: "All Products" },
    { isActive: false, name: "My Products" },
    { isActive: false, name: "Add Product" },
  ]);
  const [selectedTab, setSelectedTab] = useState(tab[0]);
  const [products, setProducts] = useState<any>([]);
  const [editData, setEditData] = useState([])
  const { getUserDetails } = useAuthHelper();
  const dispatch = useAppDispatch();
  const {
    data: allProducts,
    isLoading: allProductIsLoading,
    isError: allProductIsErr,
    error: allProdErr,
  } = useGetProductsQuery();
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
    refetch: refectProdBySeller,
  } = useGetProductBySellerQuery(getUserDetails()?.user_id, {
    skip: selectedTab.name !== "My Products",
  });

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
    if (selectedTab.name === "All Products") {
      setProducts(allProducts?.data);
    } else if (selectedTab.name === "My Products") {
      refectProdBySeller();
    } else if (selectedTab.name === "Add Product") {
      setIsOpen(true);
    }
  }, [selectedTab, allProducts?.data, tab]);

  useEffect(() => {
    if (delProdIsErr) {
      toast.error(delProdErr?.data?.data);
    }
    if (delProdSuccess && delProductData?.responseCode === "200") {
      toast(delProductData?.responseDescritpion);
    }
    if (prodBySellerData?.responseCode === "200" && prodBySellerIsSuccess) {
      setProducts(prodBySellerData?.data);
    }
    if (prodBySellerIsErr) {
      toast.error(prodBySellerErr?.data.data);
    }
    if (allProductIsErr) {
      toast.error(allProdErr?.data.data);
    }
  }, [
    products,
    delProdIsErr,
    prodBySellerIsErr,
    prodBySellerData?.data,
    allProductIsErr,
    delProdSuccess,
    prodBySellerIsSuccess,
  ]);

  return (
    <div>
      <SellerWrapper>
        <Tab
          tabContent={tab}
          tab={tab}
          setTab={setTab}
          callback={setSelectedTab}
        />
      </SellerWrapper>
      <Spin
        className="h-full"
        spinning={
          allProductIsLoading || delProductIsLoading || prodBySellerIsLoading
        }
      >
        <Grid>
          {products?.map((res) => (
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
          setSelectedTab={setSelectedTab}
          setTab={setTab}
          tab={tab}
          setIsOpen={setIsOpen}
          editData={editData}
          setEditData={setEditData}
        />
      </CustomModal>
    </div>
  );
};

export default AllProducts;
