import s from "./index.module.css";

const Header = () => {
  return (
    <header>
      <div className="container">
        <nav className={`${s.navbar}`}>
          <div className={`${s.logo}`}>
            <span>FinTrack</span>
          </div>

          <ul className={`${s.navLinks}`}>
            <li>
              <a href="#" className={`${s.active}`}>
                Главная
              </a>
            </li>
            <li>
              <a href="#">Транзакции</a>
            </li>
            <li>
              <a href="#">Счета</a>
            </li>
            <li>
              <a href="#">Бюджеты</a>
            </li>
            <li>
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

export default Header;
