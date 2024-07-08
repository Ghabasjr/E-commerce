import React from "react";
import "./Header.css";
import { CaretDown, Funnel } from "phosphor-react";
export default function Header() {
  return (
    <div className="office-seats">
      <div className="seats">
        <ul>
          <li>Home\Categories\Office seats</li>
        </ul>
      </div>
      <div className="text">
        <h1 className="h-one">Office Seats Category</h1>
        <p>
          Find the perfect chair for your work space:
          <p>
            Ergonomic, comfortable and design for
            <p>your productivity.</p>
          </p>
        </p>
      </div>
      <div className="button-header">
        <span className="filter">
          <Funnel />
          Filter
        </span>
        <span className="category">
          Subcategory | Ergonomic
          <CaretDown />
        </span>
        <span className="price">
          Price | Under $700 <CaretDown />
        </span>
      </div>
    </div>
  );
}
