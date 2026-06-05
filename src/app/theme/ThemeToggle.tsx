import { useTheme } from "./ThemeProvider";
import s from "./ThemeToggle.module.css";

const ThemeToggle = () => {
  const { theme, toggle } = useTheme();

  return (
    <button
      className={s.toggle}
      onClick={toggle}
      aria-label={theme === "light" ? "Тёмная тема" : "Светлая тема"}
      title={theme === "light" ? "Тёмная тема" : "Светлая тема"}
    >
      <i className={`fas ${theme === "light" ? "fa-moon" : "fa-sun"}`}></i>
    </button>
  );
};

export default ThemeToggle;
