import { IAccount, ACCOUNT_TYPES, ACCOUNT_ICONS } from "../type";
import s from "./index.module.css";

interface AccountGridProps {
  accounts: IAccount[];
  onEdit: (account: IAccount) => void;
  onDelete: (id: number) => void;
}

const AccountGrid = ({ accounts, onEdit, onDelete }: AccountGridProps) => {
  if (accounts.length === 0) {
    return (
      <div className={s.emptyState}>
        <i className="fas fa-wallet"></i>
        <h3>Нет счетов</h3>
        <p>Добавьте первый счет, чтобы начать учёт финансов</p>
      </div>
    );
  }

  return (
    <div className={s.grid}>
      {accounts.map((account) => (
        <div key={account.id} className={s.card}>
          <div className={s.cardHeader}>
            <div
              className={s.cardIcon}
              style={{ backgroundColor: account.color }}
            >
              <i className={`fas ${ACCOUNT_ICONS[account.type] || "fa-credit-card"}`}></i>
            </div>
            <div className={s.cardActions}>
              <button
                className={s.actionBtn}
                title="Редактировать"
                onClick={() => onEdit(account)}
              >
                <i className="fas fa-pen"></i>
              </button>
              <button
                className={s.actionBtn}
                title="Удалить"
                onClick={() => onDelete(account.id)}
              >
                <i className="fas fa-trash"></i>
              </button>
            </div>
          </div>

          <div className={s.cardBody}>
            <h3 className={s.accountName}>{account.name}</h3>
            <span className={s.accountType}>
              {ACCOUNT_TYPES[account.type] || account.type}
            </span>
          </div>

          <div className={s.cardFooter}>
            <span className={s.balanceLabel}>Баланс</span>
            <span className={s.balanceValue}>
              {account.balance.toLocaleString()} {account.currency}
            </span>
          </div>

          {!account.is_active && (
            <div className={s.inactiveBadge}>Неактивен</div>
          )}
        </div>
      ))}
    </div>
  );
};

export default AccountGrid;
