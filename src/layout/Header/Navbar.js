import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./NavbarStyles.scss";
import FilterDramaIcon from "@mui/icons-material/FilterDrama";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import { history } from "../../utils";

export default function Navbar({ navTheme }) {
  // Change Navbar Style On Scroll
  const [navbarClassName, setNavbarClassName] = useState(navTheme);
  useEffect(() => {
    document.addEventListener("scroll", () => {
      const navbarClassName =
        window.scrollY < 200 ? navTheme : "navbar-colored";
      setNavbarClassName(navbarClassName);
    });
    return () => document.removeEventListener("scroll", null);
  }, [navTheme]);
  // Change Navbar Style With Props
  useEffect(() => {
    setNavbarClassName(navTheme);
  }, [navTheme]);

  // Log Out
  const logOutHandler = () => {
    localStorage.removeItem("Auth");
    history.replace("/login");
    window.location.reload();
  };

  return (
    <nav
      className={`navbar ${navbarClassName} navbar-expand-lg navbar-light fixed-top font-openSans`}
      key={navbarClassName}
    >
      {/* Logo */}
      <Link className="navbar-brand flex-center" to="/">
        <FilterDramaIcon className="navbar-icon" /> Brand
      </Link>
      <button
        className="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarNav"
        aria-controls="navbarNav"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon"></span>
      </button>
      {/* Menu */}
      <div className="collapse navbar-collapse" id="navbarNav">
        <ul className="navbar-nav mx-auto">
          <Link className="nav-item nav-link" to="/">
            Home
          </Link>
          <Link className="nav-item nav-link" to="/">
            Posts
          </Link>
          <Link className="nav-item nav-link" to="/write">
            Write
          </Link>
        </ul>
        {/* User Profile */}
        <Link
          className="nav-item nav-link ml-auto mr-2 nav-link-profile"
          to="/profile"
        >
          <AccountCircleIcon className="icon-profile" />
        </Link>
        {/* Log Out */}
        <button
          className="nav-item logout-btn ml-auto"
          onClick={() => logOutHandler()}
        >
          <ExitToAppIcon className="icon-profile" />
        </button>
      </div>
    </nav>
  );
}
