import s from "./index.module.css";

const Payments = () => {
  return (
    <div className={s.upcomingPayments}>
      <div className={s.paymentItem}>
        <div className={s.paymentInfo}>
          <div className={s.paymentIcon}>
            <i className="fas fa-home"></i>
          </div>
          <div className={s.paymentDetails}>
            <h4>Аренда квартиры</h4>
            <p>25 мая 2023</p>
          </div>
        </div>
        <div className={s.paymentAmount}>25,000 ₽</div>
      </div>

      <div className={s.paymentItem}>
        <div className={s.paymentInfo}>
          <div className={s.paymentIcon}>
            <i className="fas fa-mobile-alt"></i>
          </div>
          <div className={s.paymentDetails}>
            <h4>Мобильная связь</h4>
            <p>28 мая 2023</p>
          </div>
        </div>
        <div className={s.paymentAmount}>500 ₽</div>
      </div>

      <div className={s.paymentItem}>
        <div className={s.paymentInfo}>
          <div className={s.paymentIcon}>
            <i className="fas fa-tv"></i>
          </div>
          <div className={s.paymentDetails}>
            <h4>Интернет и ТВ</h4>
            <p>30 мая 2023</p>
          </div>
        </div>
        <div className={s.paymentAmount}>1,200 ₽</div>
      </div>
    </div>
  );
};

export default Payments;
