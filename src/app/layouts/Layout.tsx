import { Outlet, useLocation } from "react-router";
import Footer from "./Footer/Footer";
import s from "./index.module.css";
import HeaderHome from "./Header/HeaderHome/HeaderHome";
import HeaderMain from "./Header/HeaderMain/HeaderMain";

const Layout = () => {
  const url = useLocation();

  return (
    <div>
      {url.pathname === "/" && <HeaderHome />}

      {url.pathname !== "/" && url.pathname !== "/auth" && <HeaderMain />}

      <div className={s.minH}>
        <Outlet />
      </div>

      <Footer />
    </div>
  );
};

export default Layout;
