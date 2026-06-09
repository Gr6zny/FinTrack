import { useState } from "react";
import { Link } from "react-router";
import s from "./home.module.css";
import { useAppSelector } from "../../../../store/services/useAppSelector";

const HeaderHome = () => {
  const { jwt } = useAppSelector((state) => state.user);
  const [menuOpen, setMenuOpen] = useState(false);

  const handleScrollToSection = (
    e: React.MouseEvent<HTMLAnchorElement>,
    sectionId: string,
  ) => {
    e.preventDefault();
    setMenuOpen(false);
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

          <button
            className={`${s.burger} ${menuOpen ? s.burgerOpen : ""}`}
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Меню"
          >
            <span></span>
            <span></span>
            <span></span>
          </button>

          <ul className={`${s.navLinks} ${menuOpen ? s.navLinksOpen : ""}`}>
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
              <a href="#faq" onClick={() => setMenuOpen(false)}>FAQ</a>
            </li>
            <li className={s.mobileNavActions} style={{ marginTop: "auto", paddingTop: 20 }}>
              <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                {jwt ? (
                  <Link to="/main" onClick={() => setMenuOpen(false)}>
                    <button className={`${s.btn} ${s.btnPrimary}`} style={{ width: "100%" }}>Дашборд</button>
                  </Link>
                ) : (
                  <Link to="/auth" onClick={() => setMenuOpen(false)}>
                    <button className={`${s.btn} ${s.btnOutline}`} style={{ width: "100%" }}>Войти</button>
                  </Link>
                )}
                <button className={`${s.btn} ${s.btnPrimary}`} style={{ width: "100%" }} id="signupBtn">
                  Начать бесплатно
                </button>
              </div>
            </li>
          </ul>

          <div className={s.navActions}>
            {jwt ? (
              <Link to="/main">
                <button className={`${s.btn} ${s.btnPrimary}`}>Дашборд</button>
              </Link>
            ) : (
              <Link to="/auth">
                <button className={`${s.btn} ${s.btnOutline}`} id="loginBtn">
                  Войти
                </button>
              </Link>
            )}
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
