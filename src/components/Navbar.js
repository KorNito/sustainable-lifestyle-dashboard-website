import React, { useState } from "react";
import { Outlet, Link } from "react-router-dom";
import "./Navbar.css";
import ChallengesDropdown from "./ChallengesDropdown";
import RewardsDropdown from "./RewardsDropdown";

function Navbar() {
  const [click, setClick] = useState(false);
  const [challengesDropdown, setChallengesDropdown] = useState(false);
  const [rewardsDropdown, setRewardsDropdown] = useState(false);

  const handleClick = () => setClick(!click);
  const closeMobileMenu = () => setClick(false);

  const onMouseChallengesEnter = () => {
    if (window.innerWidth < 960) {
      setChallengesDropdown(false);
    } else {
      setChallengesDropdown(true);
    }
  };

  const onMouseChallengesLeave = () => {
    if (window.innerWidth < 960) {
      setChallengesDropdown(false);
    } else {
      setChallengesDropdown(false);
    }
  };

  const onMouseRewardsEnter = () => {
    if (window.innerWidth < 960) {
      setRewardsDropdown(false);
    } else {
      setRewardsDropdown(true);
    }
  };

  const onMouseRewardsLeave = () => {
    if (window.innerWidth < 960) {
      setRewardsDropdown(false);
    } else {
      setRewardsDropdown(false);
    }
  };

  return (
    <>
      <nav className="navbar">
        <Link to="/" className="navbar-logo" onClick={closeMobileMenu}>
          Sustainable lifestyle dashboard
        </Link>
        <div className="menu-icon" onClick={handleClick}>
          <i className={click ? "fas fa-times" : "fas fa-bars"} />
        </div>
        <ul className={click ? "nav-menu active" : "nav-menu"}>
          <li className="nav-item">
            <Link to="/" className="nav-links" onClick={closeMobileMenu}>
              Home
            </Link>
          </li>
          <li
            className="nav-item"
            onMouseEnter={onMouseChallengesEnter}
            onMouseLeave={onMouseChallengesLeave}
          >
            <Link
              to="/challenges"
              className="nav-links"
              onClick={closeMobileMenu}
            >
              Challenges <i className="fas fa-caret-down" />
            </Link>
            {challengesDropdown && <ChallengesDropdown />}
          </li>
          <li
            className="nav-item"
            onMouseEnter={onMouseRewardsEnter}
            onMouseLeave={onMouseRewardsLeave}
          >
            <Link to="/rewards" className="nav-links" onClick={closeMobileMenu}>
              Rewards <i className="fas fa-caret-down" />
            </Link>
            {rewardsDropdown && <RewardsDropdown />}
          </li>
        </ul>
      </nav>
      <Outlet />
    </>
  );
}

export default Navbar;
