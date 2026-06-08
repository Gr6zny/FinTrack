import { useAppSelector } from "../../../store/services/useAppSelector";
import s from "./index.module.css";

function groupByCurrency(
  transactions: { amount: number; type: string; account_from?: { currency: string } }[],
  type: "income" | "expense",
): Record<string, number> {
  return transactions
    .filter((t) => t.type === type)
    .reduce<Record<string, number>>((acc, t) => {
      const cur = t.account_from?.currency || "RUB";
      acc[cur] = (acc[cur] || 0) + t.amount;
      return acc;
    }, {});
}

function calcBalance(
  incomeByCur: Record<string, number>,
  expenseByCur: Record<string, number>,
): Record<string, number> {
  const allCurs = new Set([...Object.keys(incomeByCur), ...Object.keys(expenseByCur)]);
  const result: Record<string, number> = {};
  for (const cur of allCurs) {
    result[cur] = (incomeByCur[cur] || 0) - (expenseByCur[cur] || 0);
  }
  return result;
}

const InfoBlock = () => {
  const { transactions, totalCount } = useAppSelector((state) => state.transaction);

  const incomeByCur = groupByCurrency(transactions, "income");
  const expenseByCur = groupByCurrency(transactions, "expense");
  const balanceByCur = calcBalance(incomeByCur, expenseByCur);

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
            {Object.entries(incomeByCur).length === 0 ? (
              <span className={s.statValue}>0 ₽</span>
            ) : (
              Object.entries(incomeByCur).map(([cur, val]) => (
                <span key={cur} className={s.currencyRow}>+{fmt(val)} {cur}</span>
              ))
            )}
          </div>
        </div>
        <div className={`${s.statCard} ${s.expenseCard}`}>
          <div className={s.statIcon}>
            <i className="fas fa-arrow-up"></i>
          </div>
          <div className={s.statInfo}>
            <span className={s.statLabel}>Расходы</span>
            {Object.entries(expenseByCur).length === 0 ? (
              <span className={s.statValue}>0 ₽</span>
            ) : (
              Object.entries(expenseByCur).map(([cur, val]) => (
                <span key={cur} className={s.currencyRow}>-{fmt(val)} {cur}</span>
              ))
            )}
          </div>
        </div>
        <div className={`${s.statCard} ${s.balanceCard}`}>
          <div className={s.statIcon}>
            <i className="fas fa-wallet"></i>
          </div>
          <div className={s.statInfo}>
            <span className={s.statLabel}>Баланс</span>
            {Object.entries(balanceByCur).length === 0 ? (
              <span className={s.statValue}>0 ₽</span>
            ) : (
              Object.entries(balanceByCur).map(([cur, val]) => (
                <span key={cur} className={`${s.currencyRow} ${val >= 0 ? s.positive : s.negative}`}>
                  {val >= 0 ? "+" : ""}{fmt(val)} {cur}
                </span>
              ))
            )}
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
