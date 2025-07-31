import React from "react";
import "./Navbar.css";
import { ShoppingCart } from "phosphor-react";

export default function Navbar() {

  const handleContactClick = () => {
    window.location.href = "/contactus";
  }

  const handleAboutClick = () => {
    window.location.href = "/aboutus";
  }

  const handleHomeClick = () => {
    window.location.href = "/";
  }
  return (
    <div>
      <div className="content">
        <span onClick={handleHomeClick} className="bluespace">BLUESPACE</span>
        <div className="right-item">
          <ul className="list-items">
            <li>
              <span onClick={handleAboutClick} className="cater">About Us</span>
            </li>
            <li>
              <span onClick={handleContactClick} className="cant">Contact</span>
            </li>
            <li>
              <span className="help">Privacy Policy</span>
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
