import s from "./index.module.css";

const LastTransactions = () => {
  return (
    <div>
      <div className="dashboard-section recent-transactions">
        <div className="section-header">
          <h2 className="section-title">Последние транзакции</h2>
        </div>

        <div className="card">
          <div className="transactions-list"></div>
        </div>
      </div>
    </div>
  );
};

export default LastTransactions;
