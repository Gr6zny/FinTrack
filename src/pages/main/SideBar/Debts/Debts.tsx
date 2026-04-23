import s from "./index.module.css";

const Debts = () => {
  return (
    <div className={s.emptyState}>
      <i className="fas fa-handshake"></i>
      <p>У вас нет активных долгов</p>
      <button
        className="btn btn-outline btn-small"
        style={{ marginTop: "15px" }}
      >
        <i className="fas fa-plus"></i> Добавить долг
      </button>
    </div>
  );
};

export default Debts;
