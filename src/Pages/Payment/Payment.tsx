import React from "react";
import Header from "../../Components/Header/Header";
import Navbar from "../../Components/Navbar/Navbar";
import Footer from "../../Components/Footer/Footer";
import { Circle } from "phosphor-react";
import "./Payment.css";

export default function Payment() {
  return (
    <div>
      <div className="payment">
        <Navbar />
        <div className="payment-all">
          <div className="left-payment">
            <span>Home \ Cart \ Checkout</span>
            <div className="payment-pic">
              <img src="image1.svg" alt="" />
              <div className="payment-text">
                <h1>Executive mesh black - $650</h1>
                <p>
                  Comfort and functionality combined. This chair promotes the
                  back health an beutify the office enviroment{" "}
                </p>
                <span>quqntity 1</span>
              </div>
            </div>
          </div>
          <div className="right-payment">
            <div className="payment-text2">
              <h1>Payment Details</h1>
              <p>Complete your purchase by providing your card details</p>
            </div>
            <div className="payment-details">
              <label>Email</label>
              <input type="text" placeholder="Nigeria" />
              <h2>Select payment method</h2>
              <span>Credit/debit card</span>

              <span>Virtual account </span>
              <Circle />
              <label>Card details</label>
              <input type="number" placeholder="8888 9999 9999 8888" />
              <label htmlFor="expiry date">Expiry Date</label>
              <input type="number" placeholder="05/2024" />
              <label htmlFor="cvv">CVV</label>
              <input type="number" placeholder="123" />
            </div>
            <div className="sub-total">
              <div className="total1">
                <span>Sub Total</span>
                <span>$650</span>
              </div>
              <div className="discount">
                <span>Discount</span>
                <span>$0</span>
              </div>
              <div className="total">
                <span>Total</span>
                <span>$650</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div>
        <Footer />
      </div>
    </div>
  );
}
