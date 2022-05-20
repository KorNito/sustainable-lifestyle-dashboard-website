import React, { useState } from "react";
import { PlacesLinks } from "./PlacesLinks";
import "./PlacesDropdown.css";
import { Link } from "react-router-dom";

function PlacesDropdown() {
  const [click, setClick] = useState(false);

  const handleClick = () => setClick(!click);

  return (
    <>
      <ul
        onClick={handleClick}
        className={click ? "dropdown-menu clicked" : "dropdown-menu"}
      >
        {PlacesLinks.map((link, index) => {
          return (
            <li key={index}>
              <Link
                className={link.className}
                to={link.path}
                onClick={() => setClick(false)}
              >
                {link.title}
              </Link>
            </li>
          );
        })}
      </ul>
    </>
  );
}

export default PlacesDropdown;
