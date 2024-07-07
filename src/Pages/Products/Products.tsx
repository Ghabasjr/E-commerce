import React from "react";
import Navbar from "../../Components/Navbar/Navbar";
import Header from "../../Components/Header/Header";
import { ShoppingCart } from "phosphor-react";
import "./Products.css";
import Footer from "../../Components/Footer/Footer";

function Products() {
  const CardData = [
    {
      image: "/image1.svg",
      title: "Executive Mesh Black",
      amount: "$650",
      icon: <ShoppingCart size={20} />,
    },
    {
      image: "/image2.svg",
      title: "Home Ergonomic",
      amount: "$500",
      icon: <ShoppingCart size={20} />,
    },
    {
      image: "/image3.svg",
      title: "Albus Medium",
      amount: "$650",
      icon: <ShoppingCart size={20} />,
    },
    {
      image: "/image4.svg",
      title: "Executive Mesh High Back",
      amount: "$690",
      icon: <ShoppingCart size={20} />,
    },
    {
      image: "/image5.svg",
      title: "Stylish Presidential",
      amount: "$650",
      icon: <ShoppingCart size={20} />,
    },
    {
      image: "/image6.svg",
      title: "Back Back Mesh",
      amount: "$650",
      icon: <ShoppingCart size={20} />,
    },
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
      <div className="container">
        <Navbar />
        <Header />
      </div>
      <div className="grid-content">
        {CardData.map((data, index) => (
          <div key={index} className="products">
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
      <div>
        <Footer />
      </div>
    </div>
  );
}

export default Products;
