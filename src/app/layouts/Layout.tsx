import { Outlet, useLocation } from "react-router";
import Footer from "./Footer/Footer";
import s from "./index.module.css";
import HeaderHome from "./Header/HeaderHome";
import HeaderMain from "./Header/HeaderMain";

const Layout = () => {
  const url = useLocation();
  console.log(url.pathname);

  return (
    <div>
      {url.pathname == "/" ? <HeaderHome /> : <HeaderMain />}
      <div className={s.minH}>
        <Outlet></Outlet>
      </div>
      <Footer />
    </div>
  );
};

export default Layout;
