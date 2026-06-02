import { Link } from "react-router";
import s from "./main.module.css";

const HeaderMain = () => {
  return (
    <header>
      <div className="container">
        <nav className={`${s.navbar}`}>
          <div className={`${s.logo}`}>
            <Link to="/">
              <span>FinTrack</span>
            </Link>
          </div>

          <ul className={`${s.navLinks}`}>
            <li>
              <i className="fas fa-home"></i>
              <Link to="/main">
                <span>Главная</span>
              </Link>
            </li>
            <li>
              <i className="fas fa-exchange-alt"></i>
              <Link to="/transaction">
                <span>Транзакции</span>
              </Link>
            </li>
            <li>
              <i className="fas fa-wallet"></i>
              <Link to="/account">
                <span>Счета</span>
              </Link>
            </li>
            <li>
              <i className="fas fa-chart-pie"></i>
              <a href="#">Бюджеты</a>
            </li>
            <li>
              <i className="fas fa-chart-bar"></i>
              <a href="#">Отчеты</a>
            </li>
          </ul>

          <div className={`${s.userProfile}`}>
            <div className={`${s.avatar}`}>ИИ</div>
            <div>
              <div>Иван Иванов</div>
              <div>Основная валюта: RUB</div>
            </div>
          </div>
        </nav>
      </div>
    </header>
  );
};

export default HeaderMain;
