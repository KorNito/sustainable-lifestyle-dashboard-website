import React, { useState, useContext } from "react";
import { Outlet, Link } from "react-router-dom";
import "./Navbar.css";
import ChallengesDropdown from "./ChallengesDropdown";
import RewardsDropdown from "./RewardsDropdown";
import PlacesDropdown from "./PlacesDropDown";
import CustomChallengesDropdown from "./CustomChallengesDropdown";
import { UserContext } from "../context/UserContext";
import { getAuth, signOut } from "firebase/auth";

function Navbar() {
  const [click, setClick] = useState(false);
  const [challengesDropdown, setChallengesDropdown] = useState(false);
  const [rewardsDropdown, setRewardsDropdown] = useState(false);
  const [placesDropdown, setPlacesDropdown] = useState(false);
  const [customChallengesDropdown, setCustomChallengesDropdown] =
    useState(false);

  const auth = getAuth();

  const { currentUser, setCurrentUser } = useContext(UserContext);

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

  const onMousePlacesEnter = () => {
    if (window.innerWidth < 960) {
      setPlacesDropdown(false);
    } else {
      setPlacesDropdown(true);
    }
  };

  const onMousePlacesLeave = () => {
    if (window.innerWidth < 960) {
      setPlacesDropdown(false);
    } else {
      setPlacesDropdown(false);
    }
  };

  const onMouseCustomChallengesEnter = () => {
    if (window.innerWidth < 960) {
      setCustomChallengesDropdown(false);
    } else {
      setCustomChallengesDropdown(true);
    }
  };

  const onMouseCustomChallengesLeave = () => {
    if (window.innerWidth < 960) {
      setCustomChallengesDropdown(false);
    } else {
      setCustomChallengesDropdown(false);
    }
  };

  const logout = () => {
    signOut(auth);
    setCurrentUser();
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
              to="/view-challenges"
              className="nav-links"
              onClick={closeMobileMenu}
            >
              Challenges <i className="fas fa-caret-down" />
            </Link>
            {challengesDropdown && <ChallengesDropdown />}
          </li>

          <li
            className="nav-item"
            onMouseEnter={onMouseCustomChallengesEnter}
            onMouseLeave={onMouseCustomChallengesLeave}
          >
            <Link
              to="/view-custom-challenges"
              className="nav-links"
              onClick={closeMobileMenu}
            >
              Custom challenges <i className="fas fa-caret-down" />
            </Link>
            {customChallengesDropdown && <CustomChallengesDropdown />}
          </li>

          <li
            className="nav-item"
            onMouseEnter={onMouseRewardsEnter}
            onMouseLeave={onMouseRewardsLeave}
          >
            <Link
              to="/view-rewards"
              className="nav-links"
              onClick={closeMobileMenu}
            >
              Rewards <i className="fas fa-caret-down" />
            </Link>
            {rewardsDropdown && <RewardsDropdown />}
          </li>
          <li
            className="nav-item"
            onMouseEnter={onMousePlacesEnter}
            onMouseLeave={onMousePlacesLeave}
          >
            <Link
              to="/view-places"
              className="nav-links"
              onClick={closeMobileMenu}
            >
              Places <i className="fas fa-caret-down" />
            </Link>
            {placesDropdown && <PlacesDropdown />}
          </li>
        </ul>
        <button onClick={logout}>Logout</button>
      </nav>
      <Outlet />
    </>
  );
}

export default Navbar;
