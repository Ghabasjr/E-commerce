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
              <img src="image3.svg" alt="" />
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
              <label>Select payment method</label>
              <input placeholder="Credit/Debit card" />
              <input placeholder="Virtual card" />
              <label>Card details</label>
              <input placeholder="8888 9999 9999 8888" />
              <label htmlFor="expiry date">Expiry Date</label>
              <input placeholder="04/2024" />
              <div className="cvv">
                <label htmlFor="cvv">CVV</label>
                <input placeholder="123" />
              </div>
            </div>
            <div className="sub-total">
              <div className="total1">
                <p>Sub Total</p>
                <p>$650</p>
                <p>Discount</p>
                <p>$0</p>
                <p>Total</p>
                <p>$650</p>
              </div>
              <div className="discount">
                <button>Continue to payment</button>
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
