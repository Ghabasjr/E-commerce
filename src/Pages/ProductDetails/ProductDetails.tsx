import React from "react";
import Navbar from "../../Components/Navbar/Navbar";
import {
  CaretCircleLeft,
  CaretCircleRight,
  NumberSquareOne,
  CaretUp,
  CaretDown,
  ShoppingCart,
} from "phosphor-react";
import "./ProductDetails.css";
import Footer from "../../Components/Footer/Footer";
import SimilarProduct from "../../Components/SimilarProduct/SimilarProduct";

export default function ProductDetails() {
  return (
    <div>
      <div className="product">
        <div className="navbar">
          <Navbar />
        </div>
        <div className="details">
          <div className="left-details">
            <CaretCircleLeft size={20} />
            <img src="image1.svg" alt="" />
            <CaretCircleRight size={20} />
          </div>
          <div className="right-details">
            <h1>Albus Medium</h1>
            <span>$650</span>
            <p>
              Comfort and functionality combined. This chair promotes the back
              health an beutify the office enviroment
            </p>
            <span className="span1">Available</span>
            <div className="span">
              <div className="span-icon">
                <span>Quantity</span>
                <NumberSquareOne size={20} />
                <CaretUp size={20} />
                <CaretDown size={20} />
                <button className="btin">
                  <span className="add-cart">
                    Add to cart <ShoppingCart />
                  </span>
                </button>
              </div>
            </div>
          </div>
        </div>
        <hr />
        <div className="similar">
          <h1>Similar to this product</h1>
        </div>
        <div className="similarproduct">
          <SimilarProduct />
        </div>
      </div>
      <div>
        <Footer />
      </div>
    </div>
  );
}
