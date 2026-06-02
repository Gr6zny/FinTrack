import { useState } from "react";
import Filter from "./Filter/Filter";
import s from "./index.module.css";
import InfoBlock from "./InfoBlock/InfoBlock";
import Table from "./Table/Table";
import TransactionModal from "./TransactionModal/TransactionModal";
import CategoryManageModal from "./CategoryManageModal/CategoryManageModal";
import { useTransactions } from "./hooks/useTransactions";

const Transaction = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [categoryModalOpen, setCategoryModalOpen] = useState(false);
  const [refreshKey, setRefreshKey] = useState(0);
  const { addTransaction } = useTransactions();

  return (
    <div className="container">
      <div className={s.pageHeader}>
        <div>
          <h1 className={s.pageTitle}>Транзакции</h1>
          <p className={s.pageSubtitle}>
            Управляйте всеми вашими финансовыми операциями
          </p>
        </div>
        <div className={s.headerActions}>
          <button className={s.catManageBtn} onClick={() => setCategoryModalOpen(true)}>
            <i className="fas fa-tags"></i>
            <span>Категории</span>
          </button>
          <button className={s.addButton} onClick={() => setModalOpen(true)}>
            <i className="fas fa-plus"></i>
            <span>Добавить транзакцию</span>
          </button>
        </div>
      </div>
      <InfoBlock />
      <Filter />
      <Table key={refreshKey} />

      <TransactionModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        onSave={addTransaction}
      />
      <CategoryManageModal
        isOpen={categoryModalOpen}
        onClose={() => setCategoryModalOpen(false)}
        onChanged={() => setRefreshKey((k) => k + 1)}
      />
    </div>
  );
};

export default Transaction;
