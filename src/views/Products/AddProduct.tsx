import * as Yup from "yup";
import SubHeader from "../../components/Title/SubHeader";
import { ErrorMessage, Field, Form, Formik } from "formik";
import { LoadingOutlined } from "@ant-design/icons";
import { Spin } from "antd";
import useAuthHelper from "../../hooks/auth/authHelper";
import { useAddProductMutation, useUpdateProductMutation } from "../../lib/features/products/productApiSlice";
import { useCallback, useEffect } from "react";
import { toast } from "react-toastify";
import { ITab } from "./AllProducts";
import { IProductDto } from "../../interfaces/product.interface";


const productAmountArray = [5, 10, 20, 50, 100];

type Props ={
    setIsOpen: (e: boolean)=>boolean;
    setTab: (e: ITab) => object;
    tab: ITab,
    setSelectedTab: (e: ITab) => object;
    editData?: IProductDto;
    setEditData?: (e: any) => void
}

const AddProduct = ({ setIsOpen, setTab, tab, setSelectedTab, editData, setEditData }: Props) => {
  const [
    addProduct,
    {
      isLoading: addProductIsLoading,
      isError: addProdIsErr,
      error: addProdErr,
      isSuccess,
      data: addProdData,
    },
  ] = useAddProductMutation();
  const [
    updateProduct,
    {
      isLoading: updateProdIsLoading,
      isError: updateProdIsErr,
      error: updateProdErr,
      isSuccess: updateProdIsSuccess,
      data: updateProdData,
    },
  ] = useUpdateProductMutation();
  const { getUserDetails } = useAuthHelper();
  const initialValues: IProductDto = {
    productName: editData ? editData?.productName :  "",
    cost: editData ? editData?.cost : 5,
    sellerId: editData ? editData?.sellerId : "",
    amountAvailable: editData ? editData?.amountAvailable : 0,
    product_id: editData ? editData?.product_id : ""
  };

  const ProductValSchema = Yup.object({
    productName: Yup.string().required("Product name is required"),
    cost: Yup.string().required("Cost is required"),
    amountAvailable: Yup.string().required("Product Quantity is required"),
  });
  

  const handleSubmit = useCallback((value,{ resetForm }) => {
    if(editData){
        value.sellerId = getUserDetails()?.user_id;
        updateProduct(value)
    }else{
        value.sellerId = getUserDetails()?.user_id;
        addProduct(value);
    }

    resetForm()
  },[]);

    const handleTabChange = useCallback(() => {
        const updatedTabContent = tab.map(tabItem => ({
            ...tabItem,
            isActive: tabItem.name === "My Products"
        }));
        setIsOpen(false);
        setTab(updatedTabContent);
    },[tab]);

  useEffect(() => {
    if (isSuccess && addProdData?.responseCode === '200') {
        handleTabChange()
      toast(addProdData?.responseDescription);
    }
    if (updateProdIsSuccess && updateProdData?.responseCode === '200') {
        setEditData(null)
        setIsOpen(false);
      toast(updateProdData?.responseDescription);
    }
    if (addProdIsErr) {
      toast.error(addProdErr?.data?.data);
    }
    if (updateProdIsErr) {
      toast.error(updateProdErr?.data?.data);
    }
  }, [isSuccess, addProdIsErr,updateProdIsSuccess, updateProdIsErr]);

  return (
    <div className="w-full flex flex-col justify-center items-center mt-[2rem] mb-[1.4rem]">
      <div className="w-[95%]">
        <SubHeader>New Product</SubHeader>
      </div>
      <Formik
        enableReinitialize
        initialValues={initialValues}
        validationSchema={ProductValSchema}
        onSubmit={handleSubmit}
      >
        {({ submitForm, resetForm }) => (
          <Form className="flex w-[95%] justify-center items-center flex-col gap-5">
            <div className="flex w-full flex-col">
              <label htmlFor="productName" className="ml-1 font-[600]">
                Product Name<span className="text-red-900 pl-1">*</span>
              </label>
              <Field
                type="text"
                id="productName"
                name="productName"
                className="border-[1.5px] h-9 p-2 rounded-lg focus:outline-none"
              />
              <ErrorMessage
                name="productName"
                component="div"
                className="text-red-700"
              />
            </div>
            <div className="flex w-full flex-col">
              <label htmlFor="amountAvailable" className="ml-1 font-[600]">
                Product Quantity<span className="text-red-900 pl-1">*</span>
              </label>
              <Field
                type="number"
                id="amountAvailable"
                name="amountAvailable"
                className="border-[1.5px] h-9 p-2 rounded-lg focus:outline-none"
              />
              <ErrorMessage
                name="amountAvailable"
                component="div"
                className="text-red-700"
              />
            </div>
            <div className="flex w-full flex-col">
              <label htmlFor="status" className="ml-1 font-[600]">
                Cost<span className="text-red-900 pl-1">*</span>
              </label>
              <Field
                type="text"
                id="cost"
                name="cost"
                as="select"
                className="border-[1.5px] h-9 px-2 rounded-lg focus:outline-none"
              >
                {productAmountArray.map((res, index) => (
                  <option key={index} value={res}>
                    {res}
                  </option>
                ))}
              </Field>
              <ErrorMessage
                name="cost"
                component="div"
                className="text-red-700"
              />
            </div>
            <div className="flex flex-row gap-5">
              <button
                className="bg-[#7E30E1] py-[5px] px-[20px] text-white rounded"
                type="submit"
              >
                {addProductIsLoading || updateProdIsLoading ? (
                  <>
                    <Spin
                      className="mr-[10px]"
                      indicator={
                        <LoadingOutlined style={{ fontSize: 20 }} spin />
                      }
                    />
                    {
                        editData ? "Update Product ..." : "Add Product ..."
                    }
                  </>
                ) : (
                  <>
                         {
                        editData ? "Update Product" : "Add Product"
                    }
                  </>
                )}
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default AddProduct;
