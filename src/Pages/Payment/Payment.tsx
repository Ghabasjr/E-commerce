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
                <span>quantity 1</span>
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
              <span>8888 9999 9999 8888</span>
              <label htmlFor="expiry date">Expiry Date</label>
              <div className="cvv">
                <span>04/2024</span>
                <label htmlFor="cvv">CVV</label>
                <span>123</span>
              </div>
            </div>
            <div className="sub-total">
              <div className="total1">
                <span>Sub Total</span>
                <span>$650</span>
                <span>Discount</span>
                <span>$0</span>
                <span>Total</span>
                <p>$650</p>
              </div>
              <div className="discount">
                <button>Continue to payment</button>
              </div>
              <div className="total"></div>
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
