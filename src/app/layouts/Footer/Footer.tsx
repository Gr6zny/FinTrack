import s from "./index.module.css";

const Footer = () => {
  return (
    <footer className={s.footer}>
      <div className="container">
        <div className={s.container}>
          <div className={s.footerContent}>
            <div className={s.footerColumn}>
              <h4>FinTrack</h4>
              <p className={s.footerDescription}>
                Современная система управления личными финансами для тех, кто
                ценит своё время и деньги.
              </p>
              <div className={s.socialLinks}>
                <a href="#">
                  <i className="fab fa-vk"></i>
                </a>
                <a href="#">
                  <i className="fab fa-telegram"></i>
                </a>
                <a href="#">
                  <i className="fab fa-youtube"></i>
                </a>
                <a href="#">
                  <i className="fab fa-github"></i>
                </a>
              </div>
            </div>

            <div className={s.footerColumn}>
              <h4>Продукт</h4>
              <ul className={s.footerLinks}>
                <li>
                  <a href="#features">Возможности</a>
                </li>
                <li>
                  <a href="#how-it-works">Как работает</a>
                </li>
                <li>
                  <a href="#pricing">Тарифы</a>
                </li>
                <li>
                  <a href="#">Обновления</a>
                </li>
                <li>
                  <a href="#">Безопасность</a>
                </li>
              </ul>
            </div>

            <div className={s.footerColumn}>
              <h4>Поддержка</h4>
              <ul className={s.footerLinks}>
                <li>
                  <a href="#">Центр помощи</a>
                </li>
                <li>
                  <a href="#">Документация</a>
                </li>
                <li>
                  <a href="#">Контакты</a>
                </li>
                <li>
                  <a href="#">Сообщество</a>
                </li>
                <li>
                  <a href="#">Статус системы</a>
                </li>
              </ul>
            </div>

            <div className={s.footerColumn}>
              <h4>Компания</h4>
              <ul className={s.footerLinks}>
                <li>
                  <a href="#">О нас</a>
                </li>
                <li>
                  <a href="#">Блог</a>
                </li>
                <li>
                  <a href="#">Карьера</a>
                </li>
                <li>
                  <a href="#">Партнёры</a>
                </li>
                <li>
                  <a href="#">Политика конфиденциальности</a>
                </li>
              </ul>
            </div>
          </div>

          <div className={s.copyright}>
            © {new Date().getFullYear()} FinTrack. Все права защищены.
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
