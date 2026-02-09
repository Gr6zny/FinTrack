import { Outlet } from "react-router";
import Header from "./Header/Header";
import Footer from "./Footer/Footer";
import s from "./index.module.css";
const Layout = () => {
  return (
    <div>
      <Header />
      <div className={s.minH}>
        <Outlet></Outlet>
      </div>
      <Footer />
    </div>
  );
};

export default Layout;
