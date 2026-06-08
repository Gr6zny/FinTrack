import { useMemo } from "react";
import { useTransactions } from "../hooks/useTransactions";
import s from "./index.module.css";

const TYPE_LABELS: Record<string, string> = {
  expense: "Расход",
  income: "Доход",
  transfer: "Перевод",
};

const TYPE_ICONS: Record<string, string> = {
  expense: "fa-arrow-up",
  income: "fa-arrow-down",
  transfer: "fa-exchange-alt",
};

function formatDate(dateStr: string): string {
  const d = new Date(dateStr);
  return d.toLocaleDateString("ru-RU", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

const Table = () => {
  const { transactions } = useTransactions();

  const sorted = useMemo(
    () =>
      [...transactions].sort(
        (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
      ),
    [transactions],
  );

  return (
    <div className={s.wrapper}>
      <div className={s.header}>
        <span>Описание</span>
        <span>Категория</span>
        <span>Дата</span>
        <span>Сумма</span>
      </div>

      <div className={s.list}>
        {sorted.map((t) => {
          const iconClass = t.category?.icon
            ? `fas fa-${t.category.icon}`
            : `fas ${TYPE_ICONS[t.type]}`;
          const bgColor =
            t.category?.color ||
            (t.type === "income"
              ? "#28a745"
              : t.type === "expense"
                ? "#f72585"
                : "#4895ef");

          return (
            <>
              <div key={`desktop-${t.id}`} className={s.row}>
                <div className={s.info}>
                  <div className={s.icon} style={{ backgroundColor: bgColor }}>
                    <i className={iconClass}></i>
                  </div>
                  <div className={s.details}>
                    <div className={s.description}>
                      {t.description || "Без описания"}
                    </div>
                    <div className={s.meta}>
                      {t.account_from?.name}
                      {t.type === "transfer" && t.account_to?.name
                        ? ` → ${t.account_to.name}`
                        : ""}
                    </div>
                  </div>
                </div>

                <div className={s.category}>
                  <span>{t.category?.name || TYPE_LABELS[t.type]}</span>
                </div>

                <div className={s.date}>{formatDate(t.date)}</div>

                <div
                  className={`${s.amount} ${t.type === "income" ? s.income : t.type === "expense" ? s.expense : s.transfer}`}
                >
                  {t.type === "income" ? "+" : t.type === "expense" ? "−" : ""}
                  {t.amount.toLocaleString()}{" "}
                  {t.account_from?.currency || "₽"}
                </div>
              </div>

              <div key={`mobile-${t.id}`} className={s.mobileCard}>
                <div className={s.icon} style={{ backgroundColor: bgColor }}>
                  <i className={iconClass}></i>
                </div>
                <div className={s.mobileInfo}>
                  <div className={s.mobileDescription}>
                    {t.description || "Без описания"}
                  </div>
                  <div className={s.mobileMeta}>
                    {t.account_from?.name}
                    {t.type === "transfer" && t.account_to?.name
                      ? ` → ${t.account_to.name}`
                      : ""}
                    <span>{t.category?.name || TYPE_LABELS[t.type]}</span>
                  </div>
                </div>
                <div className={s.mobileRight}>
                  <div className={s.mobileDate}>{formatDate(t.date)}</div>
                  <div
                    className={`${s.amount} ${t.type === "income" ? s.income : t.type === "expense" ? s.expense : s.transfer}`}
                  >
                    {t.type === "income" ? "+" : t.type === "expense" ? "−" : ""}
                    {t.amount.toLocaleString()}{" "}
                    {t.account_from?.currency || "₽"}
                  </div>
                </div>
              </div>
            </>
          );
        })}

        {sorted.length === 0 && (
          <div className={s.empty}>
            <div className={s.emptyIcon}>
              <i className="fas fa-receipt"></i>
            </div>
            <p>Нет транзакций</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Table;
