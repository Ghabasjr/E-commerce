import React from "react";
import SimilarProduct from "../../Components/SimilarProduct/SimilarProduct";
import Navbar from "../../Components/Navbar/Navbar";
import Footer from "../../Components/Footer/Footer";
import "./Cart.css";
import { CaretDown, CaretUp, NumberSquareOne } from "phosphor-react";

export default function Cart() {
  return (
    <div>
      <div className="cart">
        <Navbar />
        <div className="cart-container">
          <div className="left-cart">
            <img src="image1.svg" alt="" />
            <div className="left-quantity">
              <span>Quantity</span>
              <NumberSquareOne />
              <CaretUp size={20} />
              <CaretDown size={20} />
              <button>Remove</button>
            </div>
          </div>
          <div className="right-cart">
            <h2>Cart summary</h2>
            <p>Complete your purchase by providing your card details</p>
            <div className="last">
              <span>Subtotal</span>
              <span>$650</span>
              <p>Discount</p>
              <p>0</p>
              <p>Total</p>
              <p>$650</p>
            </div>
            <button className="cart-summary1">Checkout</button>
          </div>
        </div>
        <SimilarProduct />
        <Footer />
      </div>
    </div>
  );
}
