import React, { useEffect, useState } from "react";
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
import { useParams } from "react-router-dom";
import Payment from "../Payment/Payment";
import { useProducts } from "../../../services/ProductService";

export default function ProductDetails() {
  const { id }: any = useParams();
  const productId = parseInt(id, 9);
  const { data, error, isLoading }: any = useProducts();

  const product = data?.find((data: any) => data?.id === productId);

  useEffect(() => {
    console.log("data", data);
  });
  return (
    <div>
      <div className="product">
        <div className="navbar">
          <Navbar />
        </div>
        <div className="details">
          <div className="left-details">
            <CaretCircleLeft className="arrow" size={40} />
            {product ? (
              <img
                className="img-detail"
                width={100}
                height={100}
                src={product?.image}
                alt=""
              />
            ) : (
              <p>Product not found</p>
            )}

            <CaretCircleRight className="arrow" size={40} />
          </div>
          <div className="right-details">
            <h1>{product ? product?.title : ""}</h1>
            <span>{product?.price}</span>
            <p>{product?.description}</p>
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
