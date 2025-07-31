import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Products from "./Pages/Products/Products";
import Header from "./Components/Header/Header";
import ProductDetails from "./Pages/ProductDetails/ProductDetails";
import Payment from "./Pages/Payment/Payment";
import Cart from "./Pages/Cart/Cart";
import ContactUs from "./Components/ContactUs/ContactUs";
import AboutUs from "./Components/AboutUs/AboutUs";
import Disclaimer from "./Components/Disclaimer";
import Privacy from "./Components/Privacy";

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
          <Route path="contactus" element={<ContactUs />} />
          <Route path="aboutus" element={<AboutUs />} />
          <Route path="privacy" element={<Privacy />} />
          <Route path="disclaimer" element={<Disclaimer />} />
          <Route path="Payment" element={<Payment />} />
          <Route path="Cart" element={<Cart />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
