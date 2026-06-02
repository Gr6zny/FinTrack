import { IAccount } from "../type";
import s from "./index.module.css";

interface AccountStatsProps {
  accounts: IAccount[];
}

const AccountStats = ({ accounts }: AccountStatsProps) => {
  const totalBalance = accounts.reduce((sum, a) => sum + a.balance, 0);
  const activeCount = accounts.filter((a) => a.is_active).length;
  const cardCount = accounts.filter((a) => a.type === "bank_card" || a.type === "credit_card").length;
  const savingsCount = accounts.filter((a) => a.type === "savings" || a.type === "investment").length;

  return (
    <div className={s.statsCards}>
      <div className={`${s.statCard} ${s.balanceCard}`}>
        <div className={s.statIcon}>
          <i className="fas fa-wallet"></i>
        </div>
        <div className={s.statInfo}>
          <span className={s.statLabel}>Общий баланс</span>
          <span className={s.statValue}>
            {totalBalance.toLocaleString()} ₽
          </span>
        </div>
      </div>

      <div className={`${s.statCard} ${s.countCard}`}>
        <div className={s.statIcon}>
          <i className="fas fa-credit-card"></i>
        </div>
        <div className={s.statInfo}>
          <span className={s.statLabel}>Активных счетов</span>
          <span className={s.statValue}>{activeCount}</span>
        </div>
      </div>

      <div className={`${s.statCard} ${s.cardCard}`}>
        <div className={s.statIcon}>
          <i className="fas fa-id-card"></i>
        </div>
        <div className={s.statInfo}>
          <span className={s.statLabel}>Карты</span>
          <span className={s.statValue}>{cardCount}</span>
        </div>
      </div>

      <div className={`${s.statCard} ${s.savingsCard}`}>
        <div className={s.statIcon}>
          <i className="fas fa-piggy-bank"></i>
        </div>
        <div className={s.statInfo}>
          <span className={s.statLabel}>Сбережения</span>
          <span className={s.statValue}>{savingsCount}</span>
        </div>
      </div>
    </div>
  );
};

export default AccountStats;
