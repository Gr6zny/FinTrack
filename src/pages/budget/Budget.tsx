import { useEffect, useState } from "react";
import { useBudgets } from "./hooks/useBudgets";
import BudgetStats from "./BudgetStats/BudgetStats";
import BudgetList from "./BudgetList/BudgetList";
import BudgetModal from "./BudgetModal/BudgetModal";
import { IBudget } from "./type";
import s from "./index.module.css";

const Budget = () => {
  const {
    budgets,
    loading,
    getBudgets,
    addBudget,
    editBudget,
    removeBudget,
  } = useBudgets();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingBudget, setEditingBudget] = useState<IBudget | null>(null);

  useEffect(() => {
    getBudgets();
  }, []);

  const handleOpenAdd = () => {
    setEditingBudget(null);
    setIsModalOpen(true);
  };

  const handleOpenEdit = (budget: IBudget) => {
    setEditingBudget(budget);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingBudget(null);
  };

  const handleSave = async (data: {
    name: string;
    period: "weekly" | "monthly" | "quarterly" | "yearly" | "custom";
    start_date: string;
    end_date: string;
    amount: number;
    notifications: boolean;
    threshold_percent: number;
    categories: number[];
  }) => {
    if (editingBudget) {
      await editBudget(editingBudget.id, data);
    } else {
      await addBudget(data);
    }
    handleCloseModal();
  };

  const handleDelete = async (id: number) => {
    if (window.confirm("Вы уверены, что хотите удалить этот бюджет?")) {
      await removeBudget(id);
    }
  };

  return (
    <div className="container">
      <div className={s.pageHeader}>
        <div>
          <h1 className={s.pageTitle}>Бюджеты</h1>
          <p className={s.pageSubtitle}>
            Планируйте и контролируйте свои расходы по категориям
          </p>
        </div>
        <button className={s.addButton} onClick={handleOpenAdd}>
          <i className="fas fa-plus"></i>
          <span>Создать бюджет</span>
        </button>
      </div>

      <BudgetStats budgets={budgets} />

      {loading ? (
        <div className={s.loadingState}>
          <i className="fas fa-spinner fa-spin"></i>
          <span>Загрузка бюджетов...</span>
        </div>
      ) : (
        <BudgetList
          budgets={budgets}
          onEdit={handleOpenEdit}
          onDelete={handleDelete}
        />
      )}

      <BudgetModal
        isOpen={isModalOpen}
        budget={editingBudget}
        onClose={handleCloseModal}
        onSave={handleSave}
      />
    </div>
  );
};

export default Budget;
