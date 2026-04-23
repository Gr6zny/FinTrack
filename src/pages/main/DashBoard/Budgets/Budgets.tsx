import s from "./index.module.css";

const Budgets = () => {
  return (
    <div className={s.budgetProgress}>
      <div className={s.budgetItem}>
        <div className={s.budgetHeader}>
          <span className={s.budgetName}>Продукты</span>
          <span className={s.budgetAmount}>12,500 / 15,000 ₽</span>
        </div>
        <div className={s.progressBar}>
          <div
            className={s.progressFill + " " + s.mediumUsage}
            style={{ width: "83%" }}
          ></div>
        </div>
      </div>

      <div className={s.budgetItem}>
        <div className={s.budgetHeader}>
          <span className={s.budgetName}>Транспорт</span>
          <span className={s.budgetAmount}>8,300 / 10,000 ₽</span>
        </div>
        <div className={s.progressBar}>
          <div
            className={s.progressFill + " " + s.mediumUsage}
            style={{ width: "83%" }}
          ></div>
        </div>
      </div>

      <div className={s.budgetItem}>
        <div className={s.budgetHeader}>
          <span className={s.budgetName}>Развлечения</span>
          <span className={s.budgetAmount}>4,500 / 6,000 ₽</span>
        </div>
        <div className={s.progressBar}>
          <div
            className={s.progressFill + " " + s.lowUsage}
            style={{ width: "75%" }}
          ></div>
        </div>
      </div>

      <div className={s.budgetItem}>
        <div className={s.budgetHeader}>
          <span className={s.budgetName}>Рестораны и кафе</span>
          <span className={s.budgetAmount}>9,800 / 8,000 ₽</span>
        </div>
        <div className={s.progressBar}>
          <div
            className={s.progressFill + " " + s.highUsage}
            style={{ width: "122%" }}
          ></div>
        </div>
      </div>
    </div>
  );
};

export default Budgets;
