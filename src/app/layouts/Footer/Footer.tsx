import s from "./index.module.css";

const Footer = () => {
  return (
    <footer>
      <div className="container">
        <div className={s.footerContent}>
          <div className={s.logo}>
            <span>FinTrack</span>
          </div>
          <div className={s.copyright}>
            © 2023 FinTrack. Все права защищены.
          </div>
          <div className={s.footerLinks}>
            <button className="btn btn-outline"></button>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
