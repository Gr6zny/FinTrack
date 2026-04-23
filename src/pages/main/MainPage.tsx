import React from "react";
import s from "./index.module.css";
import { FinOverview } from "./DashBoard/FinOverview/FinOverview";

const MainPage: React.FC = () => {
  return (
    <div className="container">
      <div className={s.mainContent}>
        <div className="mainColumn">
          <FinOverview></FinOverview>
        </div>
        <div className={s.sidebar}></div>
      </div>
    </div>
  );
};

export default MainPage;
