import React from "react";
import { ShoppingCart } from "phosphor-react";
import "./similarProduct.css";

export default function SimilarProduct() {
  const CardData = [
    {
      image: "/image7.svg",
      title: "Executive Mesh Pink Seat",
      amount: "$650",
      icon: <ShoppingCart size={20} />,
    },
    {
      image: "/image8.svg",
      title: "Mesh Black Slider",
      amount: "$650",
      icon: <ShoppingCart size={20} />,
    },
    {
      image: "/image9.svg",
      title: "Presidential Mesh Slider",
      amount: "$650",
      icon: <ShoppingCart size={20} />,
    },
  ];
  return (
    <div>
      <div className="similar-product">
        {CardData.map((data, index) => (
          <div key={index} className="product">
            <div className="first-item">
              <img className="img" src={data.image} alt="firstchair" />
            </div>
            <hr className="rule" />
            <div className="bottom-content">
              <div className="bottom-title">
                <span>{data.title}</span>
                {data.icon}
              </div>
              <span>{data.amount}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
