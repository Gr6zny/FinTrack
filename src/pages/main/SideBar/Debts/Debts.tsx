import { useEffect } from "react";
import { useDebts } from "./hooks/useDebts";
import s from "./index.module.css";

function formatDate(dateStr: string): string {
  const d = new Date(dateStr);
  return d.toLocaleDateString("ru-RU", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

function formatAmount(amount: number, currency: string): string {
  return `${new Intl.NumberFormat("ru-RU").format(Math.round(amount))} ${currency}`;
}

const Debts = () => {
  const { debts, getDebts, hasDebts } = useDebts();

  useEffect(() => {
    getDebts();
  }, []);

  if (!hasDebts) {
    return (
      <div className={s.emptyState}>
        <i className="fas fa-handshake"></i>
        <p>У вас нет активных долгов</p>
        <button
          className="btn btn-outline btn-small"
          style={{ marginTop: "15px" }}
        >
          <i className="fas fa-plus"></i> Добавить долг
        </button>
      </div>
    );
  }

  return (
    <div className={s.debtsList}>
      {debts.map((debt) => (
        <div key={debt.id} className={s.debtItem}>
          <div className={s.debtInfo}>
            <div
              className={`${s.debtIcon} ${debt.type === "i_owe" ? s.debtOwe : s.debtOweMe}`}
            >
              <i
                className={`fas ${debt.type === "i_owe" ? "fa-arrow-up" : "fa-arrow-down"}`}
              ></i>
            </div>
            <div className={s.debtDetails}>
              <h4>{debt.title}</h4>
              <p>{debt.type === "i_owe" ? `Я должен ${debt.person}` : `${debt.person} должен мне`}</p>
              {debt.due_date && <p className={s.debtDue}>до {formatDate(debt.due_date)}</p>}
            </div>
          </div>
          <div
            className={`${s.debtAmount} ${debt.type === "i_owe" ? s.debtNegative : s.debtPositive}`}
          >
            {debt.type === "i_owe" ? "-" : "+"}
            {formatAmount(debt.amount, debt.currency)}
          </div>
        </div>
      ))}
    </div>
  );
};

export default Debts;
