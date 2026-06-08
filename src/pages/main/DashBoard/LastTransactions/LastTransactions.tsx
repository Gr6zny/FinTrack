import { useEffect } from "react";
import { useTransactions } from "../../../transaction/hooks/useTransactions";
import s from "./index.module.css";

const typeIcons: Record<string, string> = {
  expense: "fa-shopping-cart",
  income: "fa-arrow-down",
  transfer: "fa-exchange-alt",
};

const typeColors: Record<string, string> = {
  expense: "var(--danger)",
  income: "#28a745",
  transfer: "var(--info)",
};

function formatDate(dateStr: string): string {
  const d = new Date(dateStr);
  return d.toLocaleDateString("ru-RU", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

function formatAmount(amount: number, type: string, currency?: string): string {
  const prefix = type === "expense" ? "-" : type === "income" ? "+" : "";
  return `${prefix}${new Intl.NumberFormat("ru-RU").format(amount)} ${currency || "₽"}`;
}

const LastTransactions = () => {
  const { transactions, loadInitialTransactions } = useTransactions();

  useEffect(() => {
    loadInitialTransactions(5);
  }, []);

  const recentTransactions = transactions.slice(0, 5);

  return (
    <>
      <div className={s.transactionsList}>
        {recentTransactions.length === 0 && (
          <p style={{ color: "var(--gray)", textAlign: "center", padding: "20px 0" }}>
            Нет транзакций
          </p>
        )}

        {recentTransactions.map((tx) => {
          const typeClass =
            tx.type === "expense"
              ? s.expenseTransaction
              : tx.type === "income"
                ? s.incomeTransaction
                : s.transferTransaction;

          const icon = tx.category?.icon
            ? `fas fa-${tx.category.icon}`
            : `fas ${typeIcons[tx.type] || "fa-exchange-alt"}`;

          return (
            <div key={tx.id} className={`${s.transactionItem} ${typeClass}`}>
              <div className={s.transactionInfo}>
                <div
                  className={s.transactionIcon}
                  style={{ backgroundColor: tx.category?.color || typeColors[tx.type] }}
                >
                  <i className={icon}></i>
                </div>
                <div className={s.transactionDetails}>
                  <h4>{tx.description || tx.category?.name || "Без описания"}</h4>
                  <p>
                    {tx.category?.name ? `Категория: ${tx.category.name} • ` : ""}
                    {formatDate(tx.date)}
                  </p>
                </div>
              </div>
              <div
                className={`${s.transactionAmount} ${tx.type === "expense" ? s.negative : tx.type === "income" ? s.positive : ""}`}
              >
                {formatAmount(tx.amount, tx.type, tx.account_from?.currency)}
              </div>
            </div>
          );
        })}

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
