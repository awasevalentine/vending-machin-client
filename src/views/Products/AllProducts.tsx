import { useCallback, useEffect } from "react";
import Card from "../../components/Card/Card";
import Grid from "../../components/Grid/Grid";
import { setItems } from "../../lib/features/products/cartSlice";
import { useAppDispatch } from "../../lib/store";
import {
  useGetProductsQuery,
} from "../../lib/features/products/productApiSlice";
import { Spin } from "antd";
import BuyerWrapper from "../../hooks/BuyerWrapper";
import { toast } from "react-toastify";


const AllProducts = () => {
  const dispatch = useAppDispatch();
  const {
    data: allProducts,
    isLoading: allProductIsLoading,
    isError: allProductIsErr,
    error: allProdErr,
  } = useGetProductsQuery();

  const handleProductSelect = useCallback((item) => {
    dispatch(setItems(item));
    toast.success("Product added to cart!")
  }, []);


  useEffect(() => {
    if (allProductIsErr) {
      toast.error(allProdErr?.data.data);
    }
  }, [allProductIsErr]);

  return (
    <>
      <Spin
        className="h-full"
        spinning={allProductIsLoading}>
        <Grid>
          {allProducts?.data?.map((res) => (
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
                </div>
              </Card>
            </div>
          ))}
        </Grid>
      </Spin>
    </>
  );
};

export default AllProducts;
