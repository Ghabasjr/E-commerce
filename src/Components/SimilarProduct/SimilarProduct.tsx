import React, { useEffect } from "react";
import { ShoppingCart } from "phosphor-react";
import "./similarProduct.css";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import { useProducts } from "../../../services/ProductService";

interface ProductType {
  category: string;
  description: string;
  id: number;
  title: string;
  price: number;
  image: string;
  rating: {
    rate: number;
    count: number;
  };
}

export default function SimilarProduct() {
  const navigate = useNavigate();
  const { id }: any = useParams();
  const productId = parseInt(id, 10);
  const { data: productData, error, isLoading }: any = useProducts();

  const CardData = [
    {
      id: 0,
      image: "/image7.svg",
      title: "Executive Mesh Pink Seat",
      amount: "$650",
      icon: <ShoppingCart size={20} />,
    },
    {
      id: 1,
      image: "/image8.svg",
      title: "Mesh Black Slider",
      amount: "$650",
      icon: <ShoppingCart size={20} />,
    },
    {
      id: 2,
      image: "/image9.svg",
      title: "Presidential Mesh Slider",
      amount: "$650",
      icon: <ShoppingCart size={20} />,
    },
  ];
  const product = CardData.find((data) => data.id === productId);
  const handleNavigate = (index: Number) => {
    navigate(`/similarProduct/${index}`);
  };
  useEffect(() => {
    console.log("DATA", productData);
  }, []);
  return (
    <div>
      <div className="similar-product">
        {productData?.map((data, index) => (
          <div key={index} className="product">
            <div
              className="first-item"
              onClick={() => handleNavigate(index)}
              key={index}
            >
              <img
                className="img"
                src={data.image}
                alt="firstchair"
                width={100}
                height={100}
              />
            </div>
            <hr className="rule" />
            <div className="bottom-content">
              <div className="bottom-title">
                <span>{data.title}</span>
                {data.icon}
              </div>
              <span>{data.price}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
