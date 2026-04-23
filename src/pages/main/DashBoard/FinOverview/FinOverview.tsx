import React from "react";
import styles from "./index.module.css";

interface SummaryCard {
  title: string;
  value: string;
  change: string;
  icon: string;
  isPositive: boolean;
  iconBgColor: string;
  iconColor: string;
}

const cards: SummaryCard[] = [
  {
    title: "Общий баланс",
    value: "245,850 ₽",
    change: "+5.2% с прошлого месяца",
    icon: "fa-wallet",
    isPositive: true,
    iconBgColor: "rgba(67, 97, 238, 0.15)",
    iconColor: "#4361ee",
  },
  {
    title: "Доходы (месяц)",
    value: "85,400 ₽",
    change: "+12% с прошлого месяца",
    icon: "fa-money-bill-wave",
    isPositive: true,
    iconBgColor: "rgba(76, 201, 240, 0.15)",
    iconColor: "#4cc9f0",
  },
  {
    title: "Расходы (месяц)",
    value: "54,200 ₽",
    change: "-8% с прошлого месяца",
    icon: "fa-shopping-cart",
    isPositive: false,
    iconBgColor: "rgba(247, 37, 133, 0.15)",
    iconColor: "#f72585",
  },
  {
    title: "Бюджет / Цель накоплений",
    value: "31,200 / 150,000 ₽",
    change: "20.8% от цели",
    icon: "fa-piggy-bank",
    isPositive: true,
    iconBgColor: "rgba(248, 150, 30, 0.15)",
    iconColor: "#f8961e",
  },
];

export const FinOverview: React.FC = () => {
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
