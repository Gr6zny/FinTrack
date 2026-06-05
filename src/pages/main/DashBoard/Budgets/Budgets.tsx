import { useEffect } from "react";
import { useBudgets } from "../../../budget/hooks/useBudgets";
import s from "./index.module.css";

function formatAmount(amount: number): string {
  return new Intl.NumberFormat("ru-RU").format(Math.round(amount));
}

const Budgets = () => {
  const { budgets, getBudgets, hasBudgets } = useBudgets();

  useEffect(() => {
    getBudgets();
  }, []);

  if (!hasBudgets) {
    return (
      <div className={s.budgetProgress}>
        <p style={{ color: "var(--gray)", textAlign: "center", padding: "20px 0" }}>
          Нет бюджетов
        </p>
      </div>
    );
  }

  return (
    <div className={s.budgetProgress}>
      {budgets.map((budget) => {
        const percent =
          budget.amount > 0
            ? (budget.spent_amount / budget.amount) * 100
            : 0;

        const usageClass =
          percent > 100
            ? s.highUsage
            : percent > 75
              ? s.mediumUsage
              : s.lowUsage;

        return (
          <div key={budget.id} className={s.budgetItem}>
            <div className={s.budgetHeader}>
              <span className={s.budgetName}>{budget.name}</span>
              <span className={s.budgetAmount}>
                {formatAmount(budget.spent_amount)} /{" "}
                {formatAmount(budget.amount)} ₽
              </span>
            </div>
            <div className={s.progressBar}>
              <div
                className={`${s.progressFill} ${usageClass}`}
                style={{ width: `${Math.min(percent, 100)}%` }}
              ></div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Budgets;
