import React from "react";
import "./Footer.css";

export default function Footer() {

  const handleContactClick = () => {
    window.location.href = "/contactus";
  };

  const handlePrivacyClick = () => {
    window.location.href = "/privacy";
  };

  const handleDisclaimerClick = () => {
    window.location.href = "/disclaimer";
  };
  return (
    <div>
      <div className="footer">
        <span className="footer-blues">BLUESPACE</span>
        <div className="blue-footer">
          <div className="footer-list">
            <ul>
              <li>Categories</li>
              <li onClick={handleContactClick} className="tact">Contact</li>
              <li onClick={handlePrivacyClick} className="elp">Privacy Policy</li>
              <li onClick={handleDisclaimerClick} className="tact">Disclaimer</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
