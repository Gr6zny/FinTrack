import { Outlet, useLocation } from "react-router";
import Footer from "./Footer/Footer";
import s from "./index.module.css";
import HeaderHome from "./Header/HeaderHome/HeaderHome";
import HeaderMain from "./Header/HeaderMain/HeaderMain";

const Layout = () => {
  const url = useLocation();

  const isAuthPage = url.pathname === "/auth";
  const isHomePage = url.pathname === "/";
  const needsPadding = !isAuthPage && !isHomePage;

  return (
    <div>
      {isHomePage && <HeaderHome />}

      {!isHomePage && !isAuthPage && <HeaderMain />}

      <div className={`${s.minH} ${needsPadding ? s.withPadding : ""}`}>
        <Outlet />
      </div>

      <Footer />
    </div>
  );
};

export default Layout;
