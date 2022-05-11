import React, { useState } from "react";
import { ChallengesLinks } from "./ChallengesLinks";
import "./ChallengesDropdown.css";
import { Link } from "react-router-dom";

function ChallengesDropdown() {
  const [click, setClick] = useState(false);

  const handleClick = () => setClick(!click);

  return (
    <>
      <ul
        onClick={handleClick}
        className={click ? "dropdown-menu clicked" : "dropdown-menu"}
      >
        {ChallengesLinks.map((link, index) => {
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

export default ChallengesDropdown;
