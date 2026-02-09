import React, { useEffect } from "react";
import s from "./HomePage.module.css";

const HomePage: React.FC = () => {
  useEffect(() => {
    // Анимация появления элементов при скролле
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add(s.animateIn);
          }
        });
      },
      { threshold: 0.1 },
    );

    const elements = document.querySelectorAll(`.${s.animate}`);
    elements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  return (
    <div className={s.homePage}>
      {/* Header */}

      {/* Hero Section */}
      <section className={s.hero}>
        <div className={s.container}>
          <div className={s.heroContent}>
            <div className={`${s.heroText} ${s.animate}`}>
              <h1>Контролируйте финансы. Достигайте целей.</h1>
              <p>
                FinTrack — это современная система управления личными финансами,
                которая помогает отслеживать доходы и расходы, планировать
                бюджет и достигать финансовых целей.
              </p>
              <div className={s.heroButtons}>
                <button
                  className={`${s.btn} ${s.btnPrimary}`}
                  id="heroSignupBtn"
                >
                  <i className="fas fa-rocket"></i> Начать сейчас
                </button>
                <button
                  className={`${s.btn} ${s.btnOutline}`}
                  id="learnMoreBtn"
                >
                  <i className="fas fa-play-circle"></i> Узнать больше
                </button>
              </div>
            </div>

            <div className={`${s.heroImage} ${s.animate} ${s.delay1}`}>
              <div className={s.dashboardPreview}>
                <div className={s.previewHeader}>
                  <div className={`${s.previewLine} ${s.short}`}></div>
                  <div className={s.previewLine} style={{ width: "30%" }}></div>
                </div>
                <div className={s.previewCards}>
                  <div className={s.previewCard}>
                    <div
                      className={s.previewLine}
                      style={{ width: "70%" }}
                    ></div>
                    <div className={`${s.previewLine} ${s.short}`}></div>
                  </div>
                  <div className={s.previewCard}>
                    <div
                      className={s.previewLine}
                      style={{ width: "50%" }}
                    ></div>
                    <div className={`${s.previewLine} ${s.short}`}></div>
                  </div>
                  <div className={s.previewCard}>
                    <div
                      className={s.previewLine}
                      style={{ width: "80%" }}
                    ></div>
                    <div className={`${s.previewLine} ${s.short}`}></div>
                  </div>
                  <div className={s.previewCard}>
                    <div
                      className={s.previewLine}
                      style={{ width: "60%" }}
                    ></div>
                    <div className={`${s.previewLine} ${s.short}`}></div>
                  </div>
                </div>
                <div className={s.previewLine}></div>
                <div
                  className={s.previewLine}
                  style={{ marginBottom: "10px" }}
                ></div>
                <div className={`${s.previewLine} ${s.short}`}></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className={s.features} id="features">
        <div className={s.container}>
          <h2 className={`${s.sectionTitle} ${s.animate}`}>
            Полный контроль над вашими финансами
          </h2>
          <p className={`${s.sectionSubtitle} ${s.animate} ${s.delay1}`}>
            FinTrack предлагает все необходимые инструменты для эффективного
            управления личными финансами
          </p>

          <div className={s.featuresGrid}>
            <div className={`${s.featureCard} ${s.animate}`}>
              <div className={`${s.featureIcon} ${s.icon1}`}>
                <i className="fas fa-exchange-alt"></i>
              </div>
              <h3>Учет транзакций</h3>
              <p>
                Отслеживайте все доходы и расходы в одном месте. Категоризируйте
                операции, добавляйте теги и заметки.
              </p>
              <ul className={s.featureList}>
                <li>
                  <i className="fas fa-check" style={{ color: "#28a745" }}></i>{" "}
                  Поддержка всех типов операций
                </li>
                <li>
                  <i className="fas fa-check" style={{ color: "#28a745" }}></i>{" "}
                  Быстрый ввод данных
                </li>
                <li>
                  <i className="fas fa-check" style={{ color: "#28a745" }}></i>{" "}
                  Категории и подкатегории
                </li>
              </ul>
            </div>

            <div className={`${s.featureCard} ${s.animate} ${s.delay1}`}>
              <div className={`${s.featureIcon} ${s.icon2}`}>
                <i className="fas fa-wallet"></i>
              </div>
              <h3>Управление счетами</h3>
              <p>
                Объединяйте все счета в одном интерфейсе: банковские карты,
                наличные, сбережения и инвестиции.
              </p>
              <ul className={s.featureList}>
                <li>
                  <i className="fas fa-check" style={{ color: "#28a745" }}></i>{" "}
                  Поддержка разных валют
                </li>
                <li>
                  <i className="fas fa-check" style={{ color: "#28a745" }}></i>{" "}
                  Кредитные карты и лимиты
                </li>
                <li>
                  <i className="fas fa-check" style={{ color: "#28a745" }}></i>{" "}
                  Автоматический подсчет баланса
                </li>
              </ul>
            </div>

            <div className={`${s.featureCard} ${s.animate} ${s.delay2}`}>
              <div className={`${s.featureIcon} ${s.icon3}`}>
                <i className="fas fa-chart-pie"></i>
              </div>
              <h3>Бюджетирование</h3>
              <p>
                Создавайте бюджеты на категории расходов, отслеживайте их
                выполнение и получайте уведомления.
              </p>
              <ul className={s.featureList}>
                <li>
                  <i className="fas fa-check" style={{ color: "#28a745" }}></i>{" "}
                  Гибкие периоды бюджета
                </li>
                <li>
                  <i className="fas fa-check" style={{ color: "#28a745" }}></i>{" "}
                  Визуализация прогресса
                </li>
                <li>
                  <i className="fas fa-check" style={{ color: "#28a745" }}></i>{" "}
                  Уведомления о превышении
                </li>
              </ul>
            </div>

            <div className={`${s.featureCard} ${s.animate}`}>
              <div className={`${s.featureIcon} ${s.icon4}`}>
                <i className="fas fa-calendar-alt"></i>
              </div>
              <h3>Регулярные платежи</h3>
              <p>
                Настройте автоматическое создание транзакций для регулярных
                платежей и подписок.
              </p>
              <ul className={s.featureList}>
                <li>
                  <i className="fas fa-check" style={{ color: "#28a745" }}></i>{" "}
                  Ежедневные, еженедельные, ежемесячные платежи
                </li>
                <li>
                  <i className="fas fa-check" style={{ color: "#28a745" }}></i>{" "}
                  Гибкое планирование
                </li>
                <li>
                  <i className="fas fa-check" style={{ color: "#28a745" }}></i>{" "}
                  Автоматическое создание
                </li>
              </ul>
            </div>

            <div className={`${s.featureCard} ${s.animate} ${s.delay1}`}>
              <div className={`${s.featureIcon} ${s.icon5}`}>
                <i className="fas fa-chart-bar"></i>
              </div>
              <h3>Детальная аналитика</h3>
              <p>
                Получайте подробные отчеты о ваших финансах с наглядными
                графиками и диаграммами.
              </p>
              <ul className={s.featureList}>
                <li>
                  <i className="fas fa-check" style={{ color: "#28a745" }}></i>{" "}
                  Графики и диаграммы
                </li>
                <li>
                  <i className="fas fa-check" style={{ color: "#28a745" }}></i>{" "}
                  Сравнение периодов
                </li>
                <li>
                  <i className="fas fa-check" style={{ color: "#28a745" }}></i>{" "}
                  Экспорт данных
                </li>
              </ul>
            </div>

            <div className={`${s.featureCard} ${s.animate} ${s.delay2}`}>
              <div className={`${s.featureIcon} ${s.icon6}`}>
                <i className="fas fa-bullseye"></i>
              </div>
              <h3>Финансовые цели</h3>
              <p>
                Ставьте цели по накоплениям и отслеживайте прогресс их
                достижения с помощью визуальных индикаторов.
              </p>
              <ul className={s.featureList}>
                <li>
                  <i className="fas fa-check" style={{ color: "#28a745" }}></i>{" "}
                  Краткосрочные и долгосрочные цели
                </li>
                <li>
                  <i className="fas fa-check" style={{ color: "#28a745" }}></i>{" "}
                  Прогресс в реальном времени
                </li>
                <li>
                  <i className="fas fa-check" style={{ color: "#28a745" }}></i>{" "}
                  Мотивационные уведомления
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className={s.howItWorks} id="how-it-works">
        <div className={s.container}>
          <h2 className={`${s.sectionTitle} ${s.animate}`}>Как это работает</h2>
          <p className={`${s.sectionSubtitle} ${s.animate} ${s.delay1}`}>
            Всего 4 простых шага к полному контролю над вашими финансами
          </p>

          <div className={s.steps}>
            <div className={`${s.step} ${s.animate}`}>
              <div className={s.stepNumber}>1</div>
              <h3>Зарегистрируйтесь</h3>
              <p>
                Создайте учетную запись и укажите основную валюту. Это займет
                менее 2 минут.
              </p>
            </div>

            <div className={`${s.step} ${s.animate} ${s.delay1}`}>
              <div className={s.stepNumber}>2</div>
              <h3>Добавьте счета</h3>
              <p>
                Внесите информацию о своих счетах: банковские карты, наличные,
                сбережения.
              </p>
            </div>

            <div className={`${s.step} ${s.animate} ${s.delay2}`}>
              <div className={s.stepNumber}>3</div>
              <h3>Настройте категории</h3>
              <p>
                Создайте или выберите готовые категории для сортировки ваших
                доходов и расходов.
              </p>
            </div>

            <div className={`${s.step} ${s.animate} ${s.delay3}`}>
              <div className={s.stepNumber}>4</div>
              <h3>Начните учет</h3>
              <p>
                Добавляйте транзакции и наблюдайте за состоянием ваших финансов
                в реальном времени.
              </p>
            </div>
          </div>
        </div>
      </section>
      <section className={s.pricing} id="pricing">
        <div className={s.container}>
          <h2 className={`${s.sectionTitle} ${s.animate}`}>
            Простые и прозрачные тарифы
          </h2>
          <p className={`${s.sectionSubtitle} ${s.animate} ${s.delay1}`}>
            Выберите план, который подходит именно вам. Все планы включают
            основные функции.
          </p>

          <div className={s.pricingCards}>
            <div className={`${s.pricingCard} ${s.animate}`}>
              <h3>Бесплатный</h3>
              <div className={s.price}>
                0 ₽ <span>/ месяц</span>
              </div>
              <p>Для тех, кто только начинает управлять финансами</p>

              <ul className={s.pricingFeatures}>
                <li>
                  <i className="fas fa-check"></i> До 3 счетов
                </li>
                <li>
                  <i className="fas fa-check"></i> До 100 транзакций в месяц
                </li>
                <li>
                  <i className="fas fa-check"></i> Базовые категории
                </li>
                <li>
                  <i className="fas fa-check"></i> Простая аналитика
                </li>
                <li>
                  <i className="fas fa-check"></i> 1 финансовая цель
                </li>
                <li>
                  <i
                    className="fas fa-times"
                    style={{ color: "var(--gray)" }}
                  ></i>
                  <span style={{ color: "var(--gray)" }}>
                    Расширенная аналитика
                  </span>
                </li>
                <li>
                  <i
                    className="fas fa-times"
                    style={{ color: "var(--gray)" }}
                  ></i>
                  <span style={{ color: "var(--gray)" }}>
                    Регулярные платежи
                  </span>
                </li>
              </ul>

              <button
                className={`${s.btn} ${s.btnOutline} ${s.fullWidth}`}
                id="freePlanBtn"
              >
                Начать бесплатно
              </button>
            </div>

            <div
              className={`${s.pricingCard} ${s.popular} ${s.animate} ${s.delay1}`}
            >
              <div className={s.popularBadge}>Самый популярный</div>
              <h3>Профи</h3>
              <div className={s.price}>
                299 ₽ <span>/ месяц</span>
              </div>
              <p>Для активного управления личными финансами</p>

              <ul className={s.pricingFeatures}>
                <li>
                  <i className="fas fa-check"></i> Неограниченное количество
                  счетов
                </li>
                <li>
                  <i className="fas fa-check"></i> Неограниченные транзакции
                </li>
                <li>
                  <i className="fas fa-check"></i> Расширенные категории и теги
                </li>
                <li>
                  <i className="fas fa-check"></i> Детальная аналитика и отчеты
                </li>
                <li>
                  <i className="fas fa-check"></i> До 5 финансовых целей
                </li>
                <li>
                  <i className="fas fa-check"></i> Регулярные платежи
                </li>
                <li>
                  <i className="fas fa-check"></i> Экспорт данных
                </li>
              </ul>

              <button
                className={`${s.btn} ${s.btnPrimary} ${s.fullWidth}`}
                id="proPlanBtn"
              >
                Выбрать Профи
              </button>
            </div>

            <div className={`${s.pricingCard} ${s.animate} ${s.delay2}`}>
              <h3>Премиум</h3>
              <div className={s.price}>
                599 ₽ <span>/ месяц</span>
              </div>
              <p>Для максимального контроля и планирования</p>

              <ul className={s.pricingFeatures}>
                <li>
                  <i className="fas fa-check"></i> Всё из тарифа Профи
                </li>
                <li>
                  <i className="fas fa-check"></i> Автоматическая категоризация
                </li>
                <li>
                  <i className="fas fa-check"></i> Планирование долгосрочных
                  целей
                </li>
                <li>
                  <i className="fas fa-check"></i> Совместные бюджеты
                </li>
                <li>
                  <i className="fas fa-check"></i> Поддержка нескольких валют
                </li>
                <li>
                  <i className="fas fa-check"></i> Приоритетная поддержка
                </li>
                <li>
                  <i className="fas fa-check"></i> Кастомные отчеты
                </li>
              </ul>

              <button
                className={`${s.btn} ${s.btnOutline} ${s.fullWidth}`}
                id="premiumPlanBtn"
              >
                Выбрать Премиум
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className={s.cta} id="cta">
        <div className={s.container}>
          <h2 className={s.animate}>
            Начните контролировать свои финансы уже сегодня
          </h2>
          <p className={`${s.animate} ${s.delay1}`}>
            Присоединяйтесь к более чем 50 000 пользователей, которые уже
            улучшили своё финансовое положение с помощью FinTrack
          </p>
          <button
            className={`${s.btn} ${s.btnLight} ${s.animate} ${s.delay2}`}
            id="ctaSignupBtn"
          >
            <i className="fas fa-rocket"></i> Начать 14-дневный пробный период
          </button>
          <p className={`${s.ctaNote} ${s.animate} ${s.delay3}`}>
            Кредитная карта не требуется. Отменить можно в любой момент.
          </p>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
