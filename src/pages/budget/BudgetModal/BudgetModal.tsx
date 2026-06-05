import { useState, useEffect } from "react";
import { apiClient } from "../../../store/services/api";
import { IBudget, PERIOD_LABELS } from "../type";
import s from "./index.module.css";

interface CategoryOption {
  id: number;
  documentId: string;
  name: string;
  type: "expense" | "income";
  icon?: string;
  color?: string;
}

interface BudgetModalProps {
  isOpen: boolean;
  budget: IBudget | null;
  onClose: () => void;
  onSave: (data: {
    name: string;
    period: "weekly" | "monthly" | "quarterly" | "yearly" | "custom";
    start_date: string;
    end_date: string;
    amount: number;
    notifications: boolean;
    threshold_percent: number;
    categories: number[];
  }) => void;
}

const today = () => new Date().toISOString().slice(0, 10);

const endOfMonth = () => {
  const now = new Date();
  const last = new Date(now.getFullYear(), now.getMonth() + 1, 0);
  return last.toISOString().slice(0, 10);
};

const BudgetModal = ({ isOpen, budget, onClose, onSave }: BudgetModalProps) => {
  const [name, setName] = useState("");
  const [period, setPeriod] = useState<"weekly" | "monthly" | "quarterly" | "yearly" | "custom">("monthly");
  const [startDate, setStartDate] = useState(today());
  const [endDate, setEndDate] = useState(endOfMonth());
  const [amount, setAmount] = useState("");
  const [notifications, setNotifications] = useState(true);
  const [threshold, setThreshold] = useState(80);
  const [selectedCategories, setSelectedCategories] = useState<number[]>([]);
  const [categories, setCategories] = useState<CategoryOption[]>([]);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (!isOpen) return;
    (async () => {
      try {
        const token = localStorage.getItem("jwt");
        const res = await apiClient<{ data: CategoryOption[] }>(
          "categories",
          "GET",
          undefined,
          token ? { Authorization: `Bearer ${token}` } : undefined,
        );
        setCategories(res.data.filter((c) => c.type === "expense"));
      } catch {
        setCategories([]);
      }
    })();
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) return;
    if (budget) {
      setName(budget.name);
      setPeriod(budget.period);
      setStartDate(budget.start_date);
      setEndDate(budget.end_date);
      setAmount(String(budget.amount));
      setNotifications(budget.notifications);
      setThreshold(budget.threshold_percent);
      setSelectedCategories(budget.categories?.map((c) => c.id) || []);
    } else {
      setName("");
      setPeriod("monthly");
      setStartDate(today());
      setEndDate(endOfMonth());
      setAmount("");
      setNotifications(true);
      setThreshold(80);
      setSelectedCategories([]);
    }
  }, [budget, isOpen]);

  const handlePeriodChange = (newPeriod: "weekly" | "monthly" | "quarterly" | "yearly" | "custom") => {
    setPeriod(newPeriod);
    if (newPeriod !== "custom") {
      const now = new Date();
      let start = new Date();
      let end = new Date();

      switch (newPeriod) {
        case "weekly":
          start = new Date(now);
          start.setDate(now.getDate() - now.getDay() + 1);
          end = new Date(start);
          end.setDate(start.getDate() + 6);
          break;
        case "monthly":
          start = new Date(now.getFullYear(), now.getMonth(), 1);
          end = new Date(now.getFullYear(), now.getMonth() + 1, 0);
          break;
        case "quarterly":
          const q = Math.floor(now.getMonth() / 3);
          start = new Date(now.getFullYear(), q * 3, 1);
          end = new Date(now.getFullYear(), q * 3 + 3, 0);
          break;
        case "yearly":
          start = new Date(now.getFullYear(), 0, 1);
          end = new Date(now.getFullYear(), 11, 31);
          break;
      }
      setStartDate(start.toISOString().slice(0, 10));
      setEndDate(end.toISOString().slice(0, 10));
    }
  };

  const toggleCategory = (catId: number) => {
    setSelectedCategories((prev) =>
      prev.includes(catId)
        ? prev.filter((id) => id !== catId)
        : [...prev, catId],
    );
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !amount || isNaN(Number(amount)) || Number(amount) <= 0) return;
    setSaving(true);
    await onSave({
      name: name.trim(),
      period,
      start_date: startDate,
      end_date: endDate,
      amount: Number(amount),
      notifications,
      threshold_percent: threshold,
      categories: selectedCategories,
    });
    setSaving(false);
  };

  if (!isOpen) return null;

  return (
    <div className={s.overlay} onClick={onClose}>
      <div className={s.modal} onClick={(e) => e.stopPropagation()}>
        <div className={s.modalHeader}>
          <h2>{budget ? "Редактировать бюджет" : "Создать бюджет"}</h2>
          <button className={s.closeBtn} onClick={onClose}>
            <i className="fas fa-times"></i>
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          <div className={s.formBody}>
            <div className={s.field}>
              <label className={s.label}>Название бюджета</label>
              <input
                className={s.input}
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Например: Продукты на месяц"
                required
              />
            </div>

            <div className={s.field}>
              <label className={s.label}>Период</label>
              <div className={s.periodGrid}>
                {Object.entries(PERIOD_LABELS).map(([key, label]) => (
                  <button
                    key={key}
                    type="button"
                    className={`${s.periodBtn} ${period === key ? s.periodBtnActive : ""}`}
                    onClick={() => handlePeriodChange(key as "weekly" | "monthly" | "quarterly" | "yearly" | "custom")}
                  >
                    {label}
                  </button>
                ))}
              </div>
            </div>

            <div className={s.row}>
              <div className={s.field}>
                <label className={s.label}>Дата начала</label>
                <input
                  className={s.input}
                  type="date"
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                  required
                />
              </div>
              <div className={s.field}>
                <label className={s.label}>Дата окончания</label>
                <input
                  className={s.input}
                  type="date"
                  value={endDate}
                  onChange={(e) => setEndDate(e.target.value)}
                  required
                />
              </div>
            </div>

            <div className={s.field}>
              <label className={s.label}>Сумма бюджета</label>
              <input
                className={s.input}
                type="number"
                step="0.01"
                min="0"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                placeholder="0.00"
                required
              />
            </div>

            {categories.length > 0 && (
              <div className={s.field}>
                <label className={s.label}>Категории</label>
                <div className={s.catGrid}>
                  {categories.map((cat) => (
                    <button
                      key={cat.id}
                      type="button"
                      className={`${s.catBtn} ${selectedCategories.includes(cat.id) ? s.catBtnActive : ""}`}
                      style={{
                        borderColor: selectedCategories.includes(cat.id) ? cat.color || "var(--primary)" : undefined,
                        backgroundColor: selectedCategories.includes(cat.id) ? `${cat.color || "var(--primary)"}15` : undefined,
                      }}
                      onClick={() => toggleCategory(cat.id)}
                    >
                      {cat.icon && <i className={`fas fa-${cat.icon}`} style={{ color: cat.color }}></i>}
                      <span>{cat.name}</span>
                    </button>
                  ))}
                </div>
              </div>
            )}

            <div className={s.field}>
              <label className={s.label}>
                Порог уведомления: {threshold}%
              </label>
              <input
                className={s.input}
                type="range"
                min="50"
                max="100"
                value={threshold}
                onChange={(e) => setThreshold(Number(e.target.value))}
              />
              <div className={s.rangeLabels}>
                <span>50%</span>
                <span>100%</span>
              </div>
            </div>

            <div className={s.fieldRow}>
              <label className={s.checkboxLabel}>
                <input
                  type="checkbox"
                  checked={notifications}
                  onChange={(e) => setNotifications(e.target.checked)}
                  className={s.checkbox}
                />
                <span>Уведомлять при превышении порога</span>
              </label>
            </div>
          </div>

          <div className={s.modalFooter}>
            <button type="button" className={s.cancelBtn} onClick={onClose} disabled={saving}>
              Отмена
            </button>
            <button type="submit" className={s.saveBtn} disabled={saving}>
              {saving ? "Сохранение..." : budget ? "Сохранить" : "Создать"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default BudgetModal;
