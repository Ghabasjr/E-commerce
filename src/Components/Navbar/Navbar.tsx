import React from "react";
import "./Navbar.css";
import { ShoppingCart } from "phosphor-react";

export default function Navbar() {
  return (
    <div>
      <div className="content">
        <span className="bluespace">BLUESPACE</span>
        <div className="right-item">
          <ul className="list-items">
            <li>
              <span className="cater">Categories</span>
            </li>
            <li>
              <span className="cant">Contact</span>
            </li>
            <li>
              <span className="help">Help</span>
            </li>
          </ul>
          <div className="btn">
            <button className="btn1">
              Carts(0) <ShoppingCart size={14} />
            </button>
            <button className="btn2">Join Bluespace</button>
          </div>
        </div>
      </div>
    </div>
  );
}
