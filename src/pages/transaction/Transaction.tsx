import { useState, useEffect } from "react";
import { useSearchParams } from "react-router";
import Filter from "./Filter/Filter";
import s from "./index.module.css";
import InfoBlock from "./InfoBlock/InfoBlock";
import Table from "./Table/Table";
import TransactionModal from "./TransactionModal/TransactionModal";
import CategoryManageModal from "./CategoryManageModal/CategoryManageModal";
import { useTransactions } from "./hooks/useTransactions";
import type { ITransaction } from "./type";

const VALID_TYPES: ITransaction["type"][] = ["expense", "income", "transfer"];

const Transaction = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [modalOpen, setModalOpen] = useState(false);
  const [modalType, setModalType] = useState<ITransaction["type"] | undefined>();
  const [categoryModalOpen, setCategoryModalOpen] = useState(false);
  const [refreshKey, setRefreshKey] = useState(0);
  const { addTransaction, loadInitialTransactions } = useTransactions();

  useEffect(() => {
    loadInitialTransactions(20);
  }, []);

  useEffect(() => {
    const typeParam = searchParams.get("type");
    if (typeParam && VALID_TYPES.includes(typeParam as ITransaction["type"])) {
      setModalType(typeParam as ITransaction["type"]);
      setModalOpen(true);
      setSearchParams({}, { replace: true });
    }
  }, []);

  const handleOpenModal = (type?: ITransaction["type"]) => {
    setModalType(type);
    setModalOpen(true);
  };

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
          <button className={s.addButton} onClick={() => handleOpenModal()}>
            <i className="fas fa-plus"></i>
            <span>Добавить транзакцию</span>
          </button>
        </div>
      </div>
      <InfoBlock />
      <Filter />
      <Table />

      <TransactionModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        onSave={addTransaction}
        initialType={modalType}
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
