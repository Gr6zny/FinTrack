import s from "./index.module.css";

const InfoBlock = () => {
  return (
    <div>
      <div className={s.statsCards}>
        <div className={`${s.statCard} ${s.incomeCard}`}>
          <div className={s.statIcon}>
            <i className="fas fa-arrow-down"></i>
          </div>
          <div className={s.statInfo}>
            <span className={s.statLabel}>Доходы</span>
            <span className={s.statValue}>+85,400 ₽</span>
          </div>
        </div>
        <div className={`${s.statCard} ${s.expenseCard}`}>
          <div className={s.statIcon}>
            <i className="fas fa-arrow-down"></i>
          </div>
          <div className={s.statInfo}>
            <span className={s.statLabel}>Расходы</span>
            <span className={s.statValue}>- 85,400 ₽</span>
          </div>
        </div>
        <div className={`${s.statCard} ${s.balanceCard}`}>
          <div className={s.statIcon}>
            <i className="fas fa-wallet"></i>
          </div>
          <div className={s.statInfo}>
            <span className={s.statLabel}>Баланс</span>
            <span className={s.statValue}>+85,400 ₽</span>
          </div>
        </div>
        <div className={`${s.statCard} ${s.countCard}`}>
          <div className={s.statIcon}>
            <i className="fas fa-list"></i>
          </div>
          <div className={s.statInfo}>
            <span className={s.statLabel}>Всего операций</span>
            <span className={s.statValue}>+24</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InfoBlock;
