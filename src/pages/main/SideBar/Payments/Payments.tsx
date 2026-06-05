import { useEffect } from "react";
import { usePayments } from "./hooks/usePayments";
import s from "./index.module.css";

function formatDate(dateStr: string): string {
  const d = new Date(dateStr);
  return d.toLocaleDateString("ru-RU", {
    day: "numeric",
    month: "long",
  });
}

function formatAmount(amount: number): string {
  return `${new Intl.NumberFormat("ru-RU").format(Math.round(amount))} ₽`;
}

const frequencyIcons: Record<string, string> = {
  daily: "fa-calendar-day",
  weekly: "fa-calendar-week",
  monthly: "fa-calendar-alt",
  quarterly: "fa-calendar",
  yearly: "fa-calendar",
};

const Payments = () => {
  const { payments, getPayments, hasPayments } = usePayments();

  useEffect(() => {
    getPayments();
  }, []);

  if (!hasPayments) {
    return (
      <div className={s.upcomingPayments}>
        <p style={{ color: "var(--gray)", textAlign: "center", padding: "20px 0" }}>
          Нет предстоящих платежей
        </p>
      </div>
    );
  }

  const activePayments = payments.filter((p) => p.type === "expense").slice(0, 5);

  return (
    <div className={s.upcomingPayments}>
      {activePayments.map((payment) => (
        <div key={payment.id} className={s.paymentItem}>
          <div className={s.paymentInfo}>
            <div className={s.paymentIcon}>
              <i
                className={`fas ${payment.category?.icon ? `fa-${payment.category.icon}` : frequencyIcons[payment.frequency] || "fa-calendar-alt"}`}
              ></i>
            </div>
            <div className={s.paymentDetails}>
              <h4>{payment.name}</h4>
              <p>{payment.frequency === "monthly" ? "Ежемесячно" : payment.frequency}</p>
            </div>
          </div>
          <div className={s.paymentAmount}>{formatAmount(payment.amount)}</div>
        </div>
      ))}
    </div>
  );
};

export default Payments;
