import s from "./index.module.css";

const transactions = [
  {
    id: 1,
    amount: 2450,
    type: "expense",
    category: "food",
    categoryName: "Продукты",
    icon: "fa-utensils",
    account: "tinkoff",
    accountName: "Тинькофф Black",
    date: "2024-03-15",
    description: "Продукты в Пятерочке",
  },
  {
    id: 2,
    amount: 75000,
    type: "income",
    category: "salary",
    categoryName: "Зарплата",
    icon: "fa-briefcase",
    account: "tinkoff",
    accountName: "Тинькофф Black",
    date: "2024-03-10",
    description: "Зарплата за март",
  },
  {
    id: 3,
    amount: 4300,
    type: "expense",
    category: "transport",
    categoryName: "Транспорт",
    icon: "fa-car",
    account: "cash",
    accountName: "Наличные",
    date: "2024-03-08",
    description: "Заправка автомобиля",
  },
  {
    id: 4,
    amount: 799,
    type: "expense",
    category: "entertainment",
    categoryName: "Развлечения",
    icon: "fa-film",
    account: "tinkoff",
    accountName: "Тинькофф Black",
    date: "2024-03-05",
    description: "Подписка на Netflix",
  },
  {
    id: 5,
    amount: 15000,
    type: "transfer",
    category: "other",
    categoryName: "Другое",
    icon: "fa-exchange-alt",
    account: "tinkoff",
    accountName: "Тинькофф Black",
    date: "2024-03-01",
    description: "Перевод на сбережения",
  },
  {
    id: 6,
    amount: 3200,
    type: "expense",
    category: "utilities",
    categoryName: "Коммунальные",
    icon: "fa-home",
    account: "sber",
    accountName: "Сбербанк",
    date: "2024-03-12",
    description: "Квартплата",
  },
  {
    id: 7,
    amount: 5000,
    type: "expense",
    category: "food",
    categoryName: "Продукты",
    icon: "fa-utensils",
    account: "tinkoff",
    accountName: "Тинькофф Black",
    date: "2024-03-14",
    description: "Закупка продуктов",
  },
];

const Table = () => {
  function getIconColor(type: string) {
    if (type === "income") return "#28a745";
    if (type === "expense") return "#f72585";
    return "#4895ef";
  }

  return (
    <div>
      <div className={s.transactionsSection}>
        <div className={s.transactionsHeader}>
          <span>Описание</span>
          <span>Категория</span>
          <span>Дата</span>
          <span>Сумма</span>
        </div>

        <div id="transactionsList">
          {transactions.map((t) => (
            <div key={t.id} className={s.transactionItem}>
              <div className={s.transactionInfo}>
                <div
                  className={s.transactionIcon}
                  style={{ backgroundColor: getIconColor(t.type) }}
                >
                  <i className={`fas ${t.icon}`}></i>
                </div>

                <div className={s.transactionDetails}>
                  <h4>{t.description}</h4>
                  <p>{t.accountName}</p>
                </div>
              </div>

              <div className={s.transactionCategory}>
                <i className={`fas ${t.icon}`}></i>
                <span>{t.categoryName}</span>
              </div>

              <div className={s.transactionDate}>{t.date}</div>

              <div
                className={
                  s.transactionAmount +
                  " " +
                  (t.type === "income"
                    ? s.income
                    : t.type === "expense"
                      ? s.expense
                      : s.transfer)
                }
              >
                {t.type === "income" ? "+" : "-"}
                {t.amount.toLocaleString()} ₽
              </div>
            </div>
          ))}

          {transactions.length === 0 && (
            <div className={s.emptyState}>Нет транзакций</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Table;
