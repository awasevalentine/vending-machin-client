import { BrowserRouter, Routes, Route } from "react-router-dom";
import 'react-toastify/dist/ReactToastify.css';
import { useSelector } from "react-redux";
import { RootState, useAppDispatch } from "./lib/store";
import CustomModal from "./components/Modal/CustomModal";
import { setCloseAuthModal } from "./lib/features/globalSlice";
import SignupAndSignIn from "./views/auth/Register";
import CartView from "./components/CartView/CartView";
import { Suspense, lazy } from "react";
import ProductLayout from "./components/Layout/ProductLayout";
import DefaultLayout from "./components/Layout/DefaultLayout";

const AllProduct = lazy(() => import("./views/Products/AllProducts"));
const MyProduct = lazy(() => import("./views/Products/MyProduct"));

function App() {
  const dispatch = useAppDispatch()
  const isOpen = useSelector((state: RootState)=> state.globalReducer.openAuthModal)

  return (
    <div>
      <BrowserRouter>
      <Suspense fallback={<>Loading</>}>
        <Routes>
          <Route path="/" element={<ProductLayout />}>
            <Route path="/" element={<AllProduct />} />
            <Route path="/my-products" element={<MyProduct />} />
          </Route>
          <Route path="/" element={<DefaultLayout />} >
          <Route path="/cart" element={<CartView />} />
          </Route>
        </Routes>
      </Suspense>
      </BrowserRouter>
      <CustomModal
        isOpen={isOpen}
        onCancel={() => {
          dispatch(setCloseAuthModal(false));
        }}
      >
        <SignupAndSignIn />
      </CustomModal>
    </div>
  );
}

export default App;
