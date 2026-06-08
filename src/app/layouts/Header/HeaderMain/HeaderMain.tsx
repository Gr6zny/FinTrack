import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router";
import s from "./main.module.css";
import ThemeToggle from "../../../theme/ThemeToggle";

interface UserInfo {
  username?: string;
  email?: string;
  id?: number;
}

const navItems = [
  { path: "/main", icon: "fa-home", label: "Главная" },
  { path: "/transaction", icon: "fa-exchange-alt", label: "Транзакции" },
  { path: "/account", icon: "fa-wallet", label: "Счета" },
  { path: "/budget", icon: "fa-chart-pie", label: "Бюджеты" },
  { path: "/report", icon: "fa-chart-simple", label: "Отчёты" },
];

const CURRENCY_LABELS: Record<string, string> = {
  RUB: "RUB",
  USD: "USD",
  EUR: "EUR",
  GBP: "GBP",
  CNY: "CNY",
};

const HeaderMain = () => {
  const location = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);
  const [user, setUser] = useState<UserInfo | null>(null);
  const [currency, setCurrency] = useState("RUB");

  useEffect(() => {
    const userStr = localStorage.getItem("user");
    if (userStr) {
      try {
        setUser(JSON.parse(userStr));
      } catch {
        setUser(null);
      }
    }
    setCurrency(localStorage.getItem("currency") || "RUB");

    const handleStorage = () => {
      setCurrency(localStorage.getItem("currency") || "RUB");
    };
    window.addEventListener("storage", handleStorage);
    return () => window.removeEventListener("storage", handleStorage);
  }, []);

  const initials = user?.username
    ? user.username.slice(0, 2).toUpperCase()
    : "??";

  const isActive = (path: string) => location.pathname === path;

  return (
    <header>
      <div className="container">
        <nav className={s.navbar}>
          <Link to="/main" className={s.logo}>
            <i className="fas fa-chart-line"></i>
            <span>FinTrack</span>
          </Link>

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
            {navItems.map((item) => (
              <li key={item.path}>
                <Link
                  to={item.path}
                  className={isActive(item.path) ? s.active : ""}
                  onClick={() => setMenuOpen(false)}
                >
                  <i className={`fas ${item.icon}`}></i>
                  <span>{item.label}</span>
                </Link>
              </li>
            ))}
          </ul>

          <ThemeToggle />

          <Link to="/profile" className={s.userProfile}>
            <div className={s.avatar}>{initials}</div>
            <div className={s.userInfo}>
              <div className={s.userName}>{user?.username || "Пользователь"}</div>
              <div className={s.userMeta}>Основная валюта: {CURRENCY_LABELS[currency] || currency}</div>
            </div>
          </Link>
        </nav>
      </div>
    </header>
  );
};

export default HeaderMain;
