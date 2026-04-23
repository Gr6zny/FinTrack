import s from "./index.module.css";

const QuickActions = () => {
  return (
    <div className={s.quickActions}>
      <button className={s.actionBtn}>
        <i className="fas fa-plus-circle"></i>
        <span>Доход</span>
      </button>

      <button className={s.actionBtn}>
        <i className="fas fa-minus-circle"></i>
        <span>Расход</span>
      </button>

      <button className={s.actionBtn}>
        <i className="fas fa-exchange-alt"></i>
        <span>Перевод</span>
      </button>

      <button className={s.actionBtn}>
        <i className="fas fa-calendar-plus"></i>
        <span>Платеж</span>
      </button>
    </div>
  );
};

export default QuickActions;
