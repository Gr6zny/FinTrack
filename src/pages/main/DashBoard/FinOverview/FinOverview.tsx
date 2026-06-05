import React, { useEffect, useState } from "react";
import styles from "./index.module.css";
import { useAccounts } from "../../../account/hooks/useAccounts";
import { useTransactions } from "../../../transaction/hooks/useTransactions";
import { useBudgets } from "../../../budget/hooks/useBudgets";

interface SummaryCard {
  title: string;
  value: string;
  change: string;
  icon: string;
  isPositive: boolean;
  iconBgColor: string;
  iconColor: string;
}

function formatCurrency(amount: number): string {
  return new Intl.NumberFormat("ru-RU").format(Math.round(amount)) + " ₽";
}

function getMonthBounds() {
  const now = new Date();
  const start = new Date(now.getFullYear(), now.getMonth(), 1).toISOString().slice(0, 10);
  const end = new Date(now.getFullYear(), now.getMonth() + 1, 0).toISOString().slice(0, 10);
  return { start, end };
}

export const FinOverview: React.FC = () => {
  const { accounts, getAccounts } = useAccounts();
  const { getStats } = useTransactions();
  const { budgets, getBudgets } = useBudgets();

  const [totalIncome, setTotalIncome] = useState(0);
  const [totalExpense, setTotalExpense] = useState(0);
  const [prevIncome, setPrevIncome] = useState(0);
  const [prevExpense, setPrevExpense] = useState(0);

  useEffect(() => {
    getAccounts();
    getBudgets();

    const { start, end } = getMonthBounds();

    const prevStart = new Date();
    prevStart.setMonth(prevStart.getMonth() - 1);
    const prevMonthStart = new Date(prevStart.getFullYear(), prevStart.getMonth(), 1).toISOString().slice(0, 10);
    const prevMonthEnd = new Date(prevStart.getFullYear(), prevStart.getMonth() + 1, 0).toISOString().slice(0, 10);

    getStats(start, end).then((stats) => {
      if (stats) {
        setTotalIncome(stats.totalIncome);
        setTotalExpense(stats.totalExpense);
      }
    });

    getStats(prevMonthStart, prevMonthEnd).then((stats) => {
      if (stats) {
        setPrevIncome(stats.totalIncome);
        setPrevExpense(stats.totalExpense);
      }
    });
  }, []);

  const totalBalance = accounts.reduce((sum, acc) => sum + acc.balance, 0);

  const incomeChange = prevIncome > 0 ? ((totalIncome - prevIncome) / prevIncome) * 100 : 0;
  const expenseChange = prevExpense > 0 ? ((totalExpense - prevExpense) / prevExpense) * 100 : 0;

  const goalAmount = budgets.reduce((sum, b) => sum + b.amount, 0);
  const goalSpent = budgets.reduce((sum, b) => sum + b.spent_amount, 0);
  const goalPercent = goalAmount > 0 ? (goalSpent / goalAmount) * 100 : 0;

  const cards: SummaryCard[] = [
    {
      title: "Общий баланс",
      value: formatCurrency(totalBalance),
      change: `По всем счетам`,
      icon: "fa-wallet",
      isPositive: totalBalance >= 0,
      iconBgColor: "rgba(67, 97, 238, 0.15)",
      iconColor: "#4361ee",
    },
    {
      title: "Доходы (месяц)",
      value: formatCurrency(totalIncome),
      change: `${incomeChange >= 0 ? "+" : ""}${incomeChange.toFixed(1)}% с прошлого месяца`,
      icon: "fa-money-bill-wave",
      isPositive: incomeChange >= 0,
      iconBgColor: "rgba(76, 201, 240, 0.15)",
      iconColor: "#4cc9f0",
    },
    {
      title: "Расходы (месяц)",
      value: formatCurrency(totalExpense),
      change: `${expenseChange >= 0 ? "+" : ""}${expenseChange.toFixed(1)}% с прошлого месяца`,
      icon: "fa-shopping-cart",
      isPositive: expenseChange <= 0,
      iconBgColor: "rgba(247, 37, 133, 0.15)",
      iconColor: "#f72585",
    },
    {
      title: "Бюджет / Цель накоплений",
      value: `${formatCurrency(goalSpent)} / ${formatCurrency(goalAmount)}`,
      change: `${goalPercent.toFixed(1)}% от цели`,
      icon: "fa-piggy-bank",
      isPositive: goalPercent <= 100,
      iconBgColor: "rgba(248, 150, 30, 0.15)",
      iconColor: "#f8961e",
    },
  ];

  return (
    <div className={styles.summaryCards}>
      {cards.map((card, index) => (
        <div key={index} className={`${styles.card} ${styles.summaryCard}`}>
          <div
            className={styles.cardIcon}
            style={{ backgroundColor: card.iconBgColor, color: card.iconColor }}
          >
            <i className={`fas ${card.icon}`}></i>
          </div>
          <div className={styles.cardTitle}>{card.title}</div>
          <div className={styles.cardValue}>{card.value}</div>
          <div
            className={`${styles.cardChange} ${card.isPositive ? styles.positive : styles.negative}`}
          >
            <i
              className={`fas ${card.isPositive ? "fa-arrow-up" : "fa-arrow-down"}`}
            ></i>
            <span>{card.change}</span>
          </div>
        </div>
      ))}
    </div>
  );
};
