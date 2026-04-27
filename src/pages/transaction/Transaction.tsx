import Filter from "./Filter/Filter";
import s from "./index.module.css";
import InfoBlock from "./InfoBlock/InfoBlock";
import Table from "./Table/Table";

const Transaction = () => {
  return (
    <div className="container">
      <div className={s.pageHeader}>
        <div>
          <h1 className={s.pageTitle}>Транзакции</h1>
          <p className={s.pageSubtitle}>
            Управляйте всеми вашими финансовыми операциями
          </p>
        </div>
        <button className={s.addButton}>
          <i className="fas fa-plus"></i>
          <span>Добавить транзакцию</span>
        </button>
      </div>
      <InfoBlock />
      <Filter />
      <Table />
    </div>
  );
};

export default Transaction;
