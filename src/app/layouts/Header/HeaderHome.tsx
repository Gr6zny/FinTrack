import s from "./home.module.css";

const HeaderHome = () => {
  const handleScrollToSection = (
    e: React.MouseEvent<HTMLAnchorElement>,
    sectionId: string,
  ) => {
    e.preventDefault();
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };
  return (
    <header className={s.header}>
      <div className={s.container}>
        <nav className={s.navbar}>
          <a href="#" className={s.logo}>
            <i className="fas fa-chart-line"></i>
            <span>FinTrack</span>
          </a>

          <ul className={s.navLinks}>
            <li>
              <a
                href="#features"
                onClick={(e) => handleScrollToSection(e, "features")}
              >
                Возможности
              </a>
            </li>
            <li>
              <a
                href="#how-it-works"
                onClick={(e) => handleScrollToSection(e, "how-it-works")}
              >
                Как работает
              </a>
            </li>
            <li>
              <a
                href="#pricing"
                onClick={(e) => handleScrollToSection(e, "pricing")}
              >
                Тарифы
              </a>
            </li>
            <li>
              <a href="#faq">FAQ</a>
            </li>
          </ul>

          <div className={s.navActions}>
            <button className={`${s.btn} ${s.btnOutline}`} id="loginBtn">
              Войти
            </button>
            <button className={`${s.btn} ${s.btnPrimary}`} id="signupBtn">
              Начать бесплатно
            </button>
          </div>
        </nav>
      </div>
    </header>
  );
};

export default HeaderHome;
