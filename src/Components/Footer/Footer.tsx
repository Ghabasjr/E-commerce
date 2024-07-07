import React from "react";
import "./Footer.css";

export default function Footer() {
  return (
    <div>
      <div className="footer">
        <span className="footer-blues">BLUESPACE</span>
        <div className="blue-footer">
          <div className="footer-list">
            <ul>
              <li>Categories</li>
              <li className="tact">Contact</li>
              <li className="elp">Help</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
