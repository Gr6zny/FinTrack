import s from "./index.module.css";

const LastTransactions = () => {
  return (
    <>
      <div className={s.transactionsList}>
        {/* Здесь будет список последних транзакций, пока что статический
          пример */}
        <div className={s.transactionItem + " " + s.expenseTransaction}>
          <div className={s.transactionInfo}>
            <div className={s.transactionIcon}>
              <i className="fas fa-utensils"></i>
            </div>
            <div className={s.transactionDetails}>
              <h4>Продукты в Пятерочке</h4>
              <p>Категория: Продукты • 15 мая 2023</p>
            </div>
          </div>
          <div className={s.transactionAmount + " " + s.negative}>-2,450 ₽</div>
        </div>
        <div className={s.transactionItem + " " + s.expenseTransaction}>
          <div className={s.transactionInfo}>
            <div className={s.transactionIcon}>
              <i className="fas fa-utensils"></i>
            </div>
            <div className={s.transactionDetails}>
              <h4>Продукты в Пятерочке</h4>
              <p>Категория: Продукты • 15 мая 2023</p>
            </div>
          </div>
          <div className={s.transactionAmount + " " + s.negative}>-2,450 ₽</div>
        </div>
        <div className={s.transactionItem + " " + s.expenseTransaction}>
          <div className={s.transactionInfo}>
            <div className={s.transactionIcon}>
              <i className="fas fa-utensils"></i>
            </div>
            <div className={s.transactionDetails}>
              <h4>Продукты в Пятерочке</h4>
              <p>Категория: Продукты • 15 мая 2023</p>
            </div>
          </div>
          <div className={s.transactionAmount + " " + s.negative}>-2,450 ₽</div>
        </div>
        {/* Здесь будет список последних транзакций, пока что статический
          пример */}

        <div className={s.viewAll}>
          <button
            className="btn btn-outline"
            style={{ width: "100%", marginTop: "20px" }}
          >
            <i className="fas fa-list"></i> Показать все транзакции
          </button>
        </div>
      </div>
    </>
  );
};

export default LastTransactions;
