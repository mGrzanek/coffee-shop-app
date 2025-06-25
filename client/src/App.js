import { useEffect } from "react";
import { useDispatch } from 'react-redux'
import { Routes, Route } from "react-router-dom";
import NavBar from "./components/views/NavBar/NavBar";
import Hero from "./components/views/Hero/Hero";
import MainContainer from "./components/common/MainContainer/MainContainer";
import Home from "./components/pages/Home/Home";
import Product from "./components/pages/Product/Product";
import Cart from "./components/pages/Cart/Cart";
import OrderForm from "./components/pages/OrderForm.js/OrderForm";
import NotFound from "./components/pages/NotFound/NotFound";
import { fetchProducts } from "./redux/productsReducer";

const App = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);
  return (
    <>
      <Hero />
      <NavBar />
      <MainContainer>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/products/:id" element={<Product />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/order-form" element={<OrderForm />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </MainContainer>
    </>
  );
}

export default App;
