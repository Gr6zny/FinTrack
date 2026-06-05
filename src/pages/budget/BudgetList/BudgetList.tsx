import { IBudget, PERIOD_LABELS } from "../type";
import s from "./index.module.css";

interface BudgetListProps {
  budgets: IBudget[];
  onEdit: (budget: IBudget) => void;
  onDelete: (id: number) => void;
}

function getUsageClass(percent: number): string {
  if (percent > 100) return s.highUsage;
  if (percent > 75) return s.mediumUsage;
  return s.lowUsage;
}

const BudgetList = ({ budgets, onEdit, onDelete }: BudgetListProps) => {
  if (budgets.length === 0) {
    return (
      <div className={s.emptyState}>
        <i className="fas fa-piggy-bank"></i>
        <h3>Нет бюджетов</h3>
        <p>Создайте первый бюджет, чтобы контролировать свои расходы</p>
      </div>
    );
  }

  return (
    <div className={s.grid}>
      {budgets.map((budget) => {
        const percent =
          budget.amount > 0
            ? (budget.spent_amount / budget.amount) * 100
            : 0;

        return (
          <div key={budget.id} className={s.card}>
            <div className={s.cardHeader}>
              <div>
                <h3 className={s.budgetName}>{budget.name}</h3>
                <span className={s.budgetPeriod}>
                  {PERIOD_LABELS[budget.period] || budget.period}
                </span>
              </div>
              <div className={s.cardActions}>
                <button
                  className={s.actionBtn}
                  title="Редактировать"
                  onClick={() => onEdit(budget)}
                >
                  <i className="fas fa-pen"></i>
                </button>
                <button
                  className={s.actionBtn}
                  title="Удалить"
                  onClick={() => onDelete(budget.id)}
                >
                  <i className="fas fa-trash"></i>
                </button>
              </div>
            </div>

            <div className={s.progressSection}>
              <div className={s.progressBar}>
                <div
                  className={`${s.progressFill} ${getUsageClass(percent)}`}
                  style={{ width: `${Math.min(percent, 100)}%` }}
                ></div>
              </div>
              <div className={s.amountRow}>
                <span className={s.spentAmount}>
                  {(budget.spent_amount ?? 0).toLocaleString()} ₽
                </span>
                <span className={s.totalAmount}>
                  / {budget.amount.toLocaleString()} ₽
                </span>
              </div>
            </div>

            <div className={s.cardFooter}>
              <div className={s.footerRow}>
                <span className={s.footerLabel}>Использовано</span>
                <span
                  className={`${s.footerPercent} ${percent > 75 ? s.percentDanger : percent > 50 ? s.percentWarn : ""}`}
                >
                  {percent.toFixed(0)}%
                </span>
              </div>
              {budget.categories && budget.categories.length > 0 && (
                <div className={s.categoriesRow}>
                  {budget.categories.map((cat) => (
                    <span
                      key={cat.id}
                      className={s.categoryTag}
                      style={{ backgroundColor: cat.color ? `${cat.color}20` : "#eef2ff", color: cat.color || "var(--primary)" }}
                    >
                      {cat.icon && <i className={`fas fa-${cat.icon}`}></i>}
                      {cat.name}
                    </span>
                  ))}
                </div>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default BudgetList;
