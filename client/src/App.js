import { Routes, Route } from "react-router-dom";
import Home from "./components/pages/Home/Home";
import Product from "./components/pages/Product/Product";
import Cart from "./components/pages/Cart/Cart";
import OrderForm from "./components/pages/OrderForm.js/OrderForm";

const App = () => {
  return (
    <div className="App">
      <h1>Hello world!</h1>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/products/:id" element={<Product />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/order-form" element={<OrderForm />} />
      </Routes>
    </div>
  );
}

export default App;
