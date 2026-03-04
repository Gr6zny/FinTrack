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
              <a href="#" className={`${s.active}`}>
                Главная
              </a>
            </li>
            <li>
              <i className="fas fa-exchange-alt"></i>
              <a href="#">Транзакции</a>
            </li>
            <li>
              <i className="fas fa-wallet"></i>
              <a href="#">Счета</a>
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
