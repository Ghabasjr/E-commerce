import React, { useEffect, useState } from "react";
import Navbar from "../../Components/Navbar/Navbar";
import Header from "../../Components/Header/Header";
import { ShoppingCart } from "phosphor-react";
import "./Products.css";
import Footer from "../../Components/Footer/Footer";
import { useNavigate, useRoutes } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
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

function Products() {
  const navigate = useNavigate();
  const { data: productData, error, isLoading }: any = useProducts();
  // const [products, setProduct] = useState<any>(data);

  const handleNavigate = (index: number) => {
    const randomId = uuidv4();
    navigate(`/ProductDetails/${index}/${randomId}`);
  };
  useEffect(() => {
    console.log("DATA", productData);
  }, []);

  return (
    <div>
      <div className="container">
        <Navbar />
        <Header />
      </div>
      <div className="grid-content">
        {isLoading ? (
          <>
            <span>Loading products....................</span>
          </>
        ) : (
          <>
            {productData?.map((data: any, index: number) => (
              <div
                onClick={() => handleNavigate(index)}
                key={index}
                className="products"
              >
                <div className="first-item">
                  <img
                    className="image"
                    width={100}
                    height={100}
                    src={data.image}
                    alt="firstchair"
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
          </>
        )}
      </div>
      <Footer />
    </div>
  );
}

export default Products;
