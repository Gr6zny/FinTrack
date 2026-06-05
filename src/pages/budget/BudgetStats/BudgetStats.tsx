import { IBudget } from "../type";
import s from "./index.module.css";

interface BudgetStatsProps {
  budgets: IBudget[];
}

const BudgetStats = ({ budgets }: BudgetStatsProps) => {
  const totalBudget = budgets.reduce((sum, b) => sum + b.amount, 0);
  const totalSpent = budgets.reduce((sum, b) => sum + b.spent_amount, 0);
  const usagePercent = totalBudget > 0 ? (totalSpent / totalBudget) * 100 : 0;

  const atRisk = budgets.filter(
    (b) => b.amount > 0 && b.spent_amount / b.amount > 0.75,
  ).length;

  const onTrack = budgets.filter(
    (b) => b.amount > 0 && b.spent_amount / b.amount <= 0.75,
  ).length;

  return (
    <div className={s.statsCards}>
      <div className={`${s.statCard} ${s.totalCard}`}>
        <div className={s.statIcon}>
          <i className="fas fa-coins"></i>
        </div>
        <div className={s.statInfo}>
          <span className={s.statLabel}>Общий бюджет</span>
          <span className={s.statValue}>
            {totalBudget.toLocaleString()} ₽
          </span>
        </div>
      </div>

      <div className={`${s.statCard} ${s.spentCard}`}>
        <div className={s.statIcon}>
          <i className="fas fa-credit-card"></i>
        </div>
        <div className={s.statInfo}>
          <span className={s.statLabel}>Потрачено</span>
          <span className={s.statValue}>
            {totalSpent.toLocaleString()} ₽
          </span>
          <span className={s.statSub}>
            {usagePercent.toFixed(1)}% от бюджета
          </span>
        </div>
      </div>

      <div className={`${s.statCard} ${s.riskCard}`}>
        <div className={s.statIcon}>
          <i className="fas fa-exclamation-triangle"></i>
        </div>
        <div className={s.statInfo}>
          <span className={s.statLabel}>Под риском</span>
          <span className={`${s.statValue} ${s.riskValue}`}>{atRisk}</span>
          <span className={s.statSub}>бюджетов &gt;75%</span>
        </div>
      </div>

      <div className={`${s.statCard} ${s.okCard}`}>
        <div className={s.statIcon}>
          <i className="fas fa-check-circle"></i>
        </div>
        <div className={s.statInfo}>
          <span className={s.statLabel}>В порядке</span>
          <span className={`${s.statValue} ${s.okValue}`}>{onTrack}</span>
          <span className={s.statSub}>бюджетов</span>
        </div>
      </div>
    </div>
  );
};

export default BudgetStats;
