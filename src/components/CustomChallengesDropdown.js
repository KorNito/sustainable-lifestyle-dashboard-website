import React, { useState } from "react";
import { CustomChallengesLinks } from "./CustomChallengesLinks";
import { Link } from "react-router-dom";

function CustomChallengesDropdown() {
  const [click, setClick] = useState(false);

  const handleClick = () => setClick(!click);

  return (
    <>
      <ul
        onClick={handleClick}
        className={click ? "dropdown-menu clicked" : "dropdown-menu"}
      >
        {CustomChallengesLinks.map((link, index) => {
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

export default CustomChallengesDropdown;
