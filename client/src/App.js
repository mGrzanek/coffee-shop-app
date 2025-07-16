import { useEffect } from "react";
import { useDispatch } from 'react-redux'
import { Routes, Route } from "react-router-dom";
import NavBar from "./components/views/NavBar/NavBar";
import Hero from "./components/views/Hero/Hero";
import MainContainer from "./components/common/MainContainer/MainContainer";
import Home from "./components/pages/Home/Home";
import PrivateRoute from "./components/common/PrivateRoute/PrivateRoute";
import Product from "./components/pages/Product/Product";
import SearchPhrase from "./components/pages/SearchPhrase/SearchPhrase";
import Cart from "./components/pages/Cart/Cart";
import OrderForm from "./components/pages/OrderForm.js/OrderForm";
import OrderSummary from "./components/features/OrderSummary/OrderSummary";
import ProductVarieties from "./components/pages/ProductVarieties/ProductVarieties";
import JoinForm from "./components/features/JoinForm/JoinForm";
import LoginForm from "./components/features/LoginForm/LoginForm";
import Logout from "./components/Logout/Logout";
import UserFavorites from "./components/pages/UserFavorites/UserFavorites";
import UserOrders from "./components/views/UserOrders/UserOrders";
import UserSettings from "./components/pages/UserSettings/UserSettings";
import UserAddressForm from "./components/pages/UserAddressForm/UserAddressForm";
import UserUpdatePassword from "./components/pages/UserUpdatePassword/UserUpdatePassword";
import Footer from "./components/views/Footer/Footer";
import NotFound from "./components/pages/NotFound/NotFound";
import { fetchProducts } from "./redux/productsReducer";
import { fetchUser } from "./redux/userReducer";
import { getCartProductsThunk } from "./redux/cartProductsReducer";
import { getDeliveriesThunk } from "./redux/deliveryReducer";
import { getClientThunk } from "./redux/clientReducer";

const App = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchProducts());
    dispatch(getCartProductsThunk());
    dispatch(getDeliveriesThunk());
    dispatch(getClientThunk());
    dispatch(fetchUser());
  }, [dispatch]);
  return (
    <>
      <Hero />
      <NavBar />
      <MainContainer>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/products/:id" element={<Product />} />
          <Route path="/products/varieties/:variety" element={<ProductVarieties />} />
          <Route path="/products/search/:searchPhrase" element={<SearchPhrase />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/order/form" element={<OrderForm />} />
          <Route path="/order/summary" element={<OrderSummary />} />
          <Route path="/register" element={<JoinForm />} />
          <Route path='/login' element={<LoginForm />} />
          <Route path='/logout' element={<PrivateRoute><Logout /></PrivateRoute>} />
          <Route path='/user/favorites' element={<PrivateRoute><UserFavorites /></PrivateRoute>} />
          <Route path='/user/orders' element={<PrivateRoute><UserOrders /></PrivateRoute>} />
          <Route path='/user/settings' element={<PrivateRoute><UserSettings /></PrivateRoute>} />
          <Route path='/user/settings/data' element={<PrivateRoute><UserAddressForm /></PrivateRoute>} />
          <Route path='/user/settings/password' element={<PrivateRoute><UserUpdatePassword /></PrivateRoute>} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </MainContainer>
      <Footer />
    </>
  );
}

export default App;
