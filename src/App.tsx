import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Products from "./Pages/Products/Products";
import Header from "./Components/Header/Header";
import ProductDetails from "./Pages/ProductDetails/ProductDetails";
import Payment from "./Pages/Payment/Payment";
import Cart from "./Pages/Cart/Cart";

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Products />} />
          <Route
            path="ProductDetails/:id/:randomId"
            element={<ProductDetails />}
          />
          <Route path="Payment" element={<Payment />} />
          <Route path="Cart" element={<Cart />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
