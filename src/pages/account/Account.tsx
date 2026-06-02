import { useEffect, useState } from "react";
import { useAccounts } from "./hooks/useAccounts";
import AccountStats from "./AccountStats/AccountStats";
import AccountGrid from "./AccountGrid/AccountGrid";
import AccountModal from "./AccountModal/AccountModal";
import { IAccount } from "./type";
import s from "./index.module.css";

const Account = () => {
  const {
    accounts,
    loading,
    getAccounts,
    addAccount,
    editAccount,
    removeAccount,
  } = useAccounts();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingAccount, setEditingAccount] = useState<IAccount | null>(null);

  useEffect(() => {
    getAccounts();
  }, []);

  const handleOpenAdd = () => {
    setEditingAccount(null);
    setIsModalOpen(true);
  };

  const handleOpenEdit = (account: IAccount) => {
    setEditingAccount(account);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingAccount(null);
  };

  const handleSave = async (data: {
    name: string;
    type: "card" | "cash" | "savings" | "deposit";
    balance: number;
    currency: string;
    iconName: string;
    color: string;
    isActive: boolean;
  }) => {
    if (editingAccount) {
      await editAccount(editingAccount.id, data);
    } else {
      await addAccount(data);
    }
    handleCloseModal();
  };

  const handleDelete = async (id: number) => {
    if (window.confirm("Вы уверены, что хотите удалить этот счет?")) {
      await removeAccount(id);
    }
  };

  return (
    <div className="container">
      <div className={s.pageHeader}>
        <div>
          <h1 className={s.pageTitle}>Счета</h1>
          <p className={s.pageSubtitle}>
            Управляйте всеми вашими финансовыми счетами
          </p>
        </div>
        <button className={s.addButton} onClick={handleOpenAdd}>
          <i className="fas fa-plus"></i>
          <span>Добавить счет</span>
        </button>
      </div>

      <AccountStats accounts={accounts} />

      {loading ? (
        <div className={s.loadingState}>
          <i className="fas fa-spinner fa-spin"></i>
          <span>Загрузка счетов...</span>
        </div>
      ) : (
        <AccountGrid
          accounts={accounts}
          onEdit={handleOpenEdit}
          onDelete={handleDelete}
        />
      )}

      <AccountModal
        isOpen={isModalOpen}
        account={editingAccount}
        onClose={handleCloseModal}
        onSave={handleSave}
      />
    </div>
  );
};

export default Account;
