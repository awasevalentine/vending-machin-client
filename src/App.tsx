import { BrowserRouter, Routes, Route } from "react-router-dom";
import 'react-toastify/dist/ReactToastify.css';
import { useSelector } from "react-redux";
import DefaultLayout from "./components/Layout/DefaultLayout";
import { RootState, useAppDispatch } from "./lib/store";
import AllProducts from "./views/Products/AllProducts";
import CustomModal from "./components/Modal/CustomModal";
import { setCloseAuthModal } from "./lib/features/globalSlice";
import SignupAndSignIn from "./views/auth/Register";
import CartView from "./components/CartView/CartView";

function App() {
  const dispatch = useAppDispatch()
  const isOpen = useSelector((state: RootState)=> state.globalReducer.openAuthModal)

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<DefaultLayout />}>
            <Route path="/" element={<AllProducts />} />
            <Route path="/cart" element={<CartView />} />
          </Route>
        </Routes>
      </BrowserRouter>
      <CustomModal
        isOpen={isOpen}
        onCancel={() => {
          dispatch(setCloseAuthModal(false));
        }}
      >
        <SignupAndSignIn />
      </CustomModal>
    </>
  );
}

export default App;
