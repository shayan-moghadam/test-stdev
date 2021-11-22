import { useLocation } from "react-router-dom";
import Navbar from "./Header/Navbar";
import Footer from "./Footer/Footer";
import "./LayoutStyles.scss";

export default function Layout(props) {
  const { children } = props;
  const location = useLocation();
  const isShowHeaderAndFooter = !["/pageNotFound", "/login"].includes(
    location?.pathname
  );
  // Change Theme Nav Base On Page
  let isColoredNav = ["/profile", "/write"].includes(location?.pathname);
  if (location?.pathname.includes("/post")) isColoredNav = true;

  return (
    <div className="layout d-flex flex-column flex-wrap">
      {isShowHeaderAndFooter ? (
        <Navbar
          navTheme={isColoredNav ? "navbar-colored" : "navbar-transparent"}
        />
      ) : (
        <></>
      )}
      {children}
      {isShowHeaderAndFooter ? <Footer /> : <></>}
    </div>
  );
}
