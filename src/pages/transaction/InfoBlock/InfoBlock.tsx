import { useAppSelector } from "../../../store/services/useAppSelector";
import s from "./index.module.css";

const InfoBlock = () => {
  const { transactions, totalCount } = useAppSelector((state) => state.transaction);

  let totalIncome = 0;
  let totalExpense = 0;
  for (const t of transactions) {
    if (t.type === "income") totalIncome += t.amount;
    else if (t.type === "expense") totalExpense += t.amount;
  }
  const balance = totalIncome - totalExpense;

  const fmt = (n: number) => n.toLocaleString("ru-RU");

  return (
    <div>
      <div className={s.statsCards}>
        <div className={`${s.statCard} ${s.incomeCard}`}>
          <div className={s.statIcon}>
            <i className="fas fa-arrow-down"></i>
          </div>
          <div className={s.statInfo}>
            <span className={s.statLabel}>Доходы</span>
            <span className={s.statValue}>+{fmt(totalIncome)} ₽</span>
          </div>
        </div>
        <div className={`${s.statCard} ${s.expenseCard}`}>
          <div className={s.statIcon}>
            <i className="fas fa-arrow-up"></i>
          </div>
          <div className={s.statInfo}>
            <span className={s.statLabel}>Расходы</span>
            <span className={`${s.statValue} ${s.negative}`}>-{fmt(totalExpense)} ₽</span>
          </div>
        </div>
        <div className={`${s.statCard} ${s.balanceCard}`}>
          <div className={s.statIcon}>
            <i className="fas fa-wallet"></i>
          </div>
          <div className={s.statInfo}>
            <span className={s.statLabel}>Баланс</span>
            <span className={`${s.statValue} ${balance >= 0 ? s.positive : s.negative}`}>
              {balance >= 0 ? "+" : ""}{fmt(balance)} ₽
            </span>
          </div>
        </div>
        <div className={`${s.statCard} ${s.countCard}`}>
          <div className={s.statIcon}>
            <i className="fas fa-list"></i>
          </div>
          <div className={s.statInfo}>
            <span className={s.statLabel}>Всего операций</span>
            <span className={s.statValue}>{totalCount}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InfoBlock;
