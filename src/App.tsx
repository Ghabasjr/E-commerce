import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Products from "./Pages/Products/Products";
import Header from "./Components/Header/Header";
import ProductDetails from "./Pages/ProductDetails/ProductDetails";
import Payment from "./Pages/Payment/Payment";

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Products />} />
          <Route path="ProductDetails" element={<ProductDetails />} />
          <Route path="Payment" element={<Payment />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
