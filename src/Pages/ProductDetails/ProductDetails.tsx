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
import { useParams } from "react-router-dom";

export default function ProductDetails() {
  const { id }: any = useParams();
  const productId = parseInt(id, 10);

  const CardData = [
    {
      id: 0,
      image: "/image1.svg",
      title: "Executive Mesh Black",
      amount: "$650",
    },
    {
      id: 1,
      image: "/image2.svg",
      title: "Home Ergonomic",
      amount: "$500",
    },
    {
      id: 2,
      image: "/image3.svg",
      title: "Albus Medium",
      amount: "$650",
    },
    {
      id: 3,
      image: "/image4.svg",
      title: "Executive Mesh High Back",
      amount: "$690",
    },
    {
      id: 4,
      image: "/image5.svg",
      title: "Stylish Presidential",
      amount: "$650",
    },
    {
      id: 5,
      image: "/image6.svg",
      title: "Back Back Mesh",
      amount: "$650",
    },
    {
      id: 6,
      image: "/image7.svg",
      title: "Executive Mesh Pink Seat",
      amount: "$650",
    },
    {
      id: 7,
      image: "/image8.svg",
      title: "Mesh Black Slider",
      amount: "$650",
    },
    {
      id: 8,
      image: "/image9.svg",
      title: "Presidential Mesh Slider",
      amount: "$650",
    },
  ];
  const product = CardData.find((data) => data.id === productId);

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
              <img className="img-detail" src={product.image} alt="" />
            ) : (
              <p>Product not found</p>
            )}
            <CaretCircleRight className="arrow" size={40} />
          </div>
          <div className="right-details">
            <h1>{product ? product.title : ""}</h1>
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
