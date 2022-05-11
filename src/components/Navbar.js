import React, { useState } from "react";
import classes from "./Navbar.css";
import { Link } from "react-router-dom";
import { Button } from "./Button";
import Dropdown from "./Dropdown";

function Navbar() {
  const [menuOpened, setMenuOpened] = useState(false);

  const handleClick = () => setMenuOpened(!menuOpened);

  return (
    <>
      <div className="navbar">
        <Link to="/" className="logo">
          Logo
        </Link>
        <div className="menu-icon" onClick={handleClick}>
          <i className={menuOpened ? "fas fa-times" : "fas fa-bars"} />
        </div>
      </div>
    </>
  );
}

export default Navbar;
