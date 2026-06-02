import { useEffect } from "react";
import { useAccounts } from "../../../account/hooks/useAccounts";
import { ACCOUNT_ICONS } from "../../../account/type";
import s from "./index.module.css";

const Accounts = () => {
  const { accounts, getAccounts } = useAccounts();

  useEffect(() => {
    getAccounts();
  }, []);

  if (accounts.length === 0) {
    return (
      <div className={s.accountsList}>
        <p style={{ color: "var(--gray)", textAlign: "center", padding: "10px 0" }}>
          Нет счетов
        </p>
      </div>
    );
  }

  return (
    <div className={s.accountsList}>
      {accounts.slice(0, 5).map((account) => (
        <div key={account.id} className={s.accountItem}>
          <div className={s.accountInfo}>
            <div
              className={s.accountIcon}
              style={{ backgroundColor: account.color }}
            >
              <i className={`fas ${ACCOUNT_ICONS[account.type] || "fa-credit-card"}`}></i>
            </div>
            <div className={s.accountDetails}>
              <h4>{account.name}</h4>
              <p>{account.type === "card" ? "•••• " + account.id.toString().slice(-4) : account.type === "cash" ? "Наличные деньги" : "Накопительный счет"}</p>
            </div>
          </div>
          <div className={s.accountBalance}>
            {account.balance.toLocaleString()} {account.currency}
          </div>
        </div>
      ))}
    </div>
  );
};

export default Accounts;
