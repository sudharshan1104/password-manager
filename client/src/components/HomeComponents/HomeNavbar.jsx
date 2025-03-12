import "../../styles/Navbar/HomeNavbar.css";
import { FaTimes, FaBars } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useState } from "react";

const HomeNavbar = () => {
  const [showNav, setShowNav] = useState("hide");
  const [bars, setBars] = useState(true);

  const toggleNav = () => {
    if (showNav === "hide") {
      setShowNav("show");
      setBars(false);
    } else {
      setShowNav("hide");
      setBars(true);
    }
  };

  return (
    <>
      <nav className="nav">
        <div className="nav__links nav__brand">
          <Link to="/">CredPass</Link>
          <span onClick={() => toggleNav()}>
            {bars === true ? <FaBars /> : <FaTimes />}
          </span>
        </div>
        <div className={`nav__links ${showNav}`}>
          <ul>
            <li onClick={() => toggleNav()}>
              <Link to="/login">LOGIN</Link>
            </li>
            <li onClick={() => toggleNav()}>
              <Link to="/signup">REGISTER</Link>
            </li>
          </ul>
        </div>
      </nav>
    </>
  );
};

export default HomeNavbar;
