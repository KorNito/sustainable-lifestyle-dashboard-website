import React, { useState } from "react";
import { RewardsLinks } from "./RewardsLinks";
import "./RewardsDropdown.css";
import { Link } from "react-router-dom";

function RewardsDropdown() {
  const [click, setClick] = useState(false);

  const handleClick = () => setClick(!click);

  return (
    <>
      <ul
        onClick={handleClick}
        className={click ? "dropdown-menu clicked" : "dropdown-menu"}
      >
        {RewardsLinks.map((link, index) => {
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

export default RewardsDropdown;
