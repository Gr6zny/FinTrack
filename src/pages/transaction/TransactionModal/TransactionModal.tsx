import { useState, useEffect, useRef } from "react";
import { apiClient } from "../../../store/services/api";
import { useAppDispatch } from "../../../store/useAppDispatch";
import { useAppSelector } from "../../../store/services/useAppSelector";
import { fetchAccounts } from "../../account/accountThunk";
import { CreateTransactionData, ITransaction } from "../type";
import s from "./index.module.css";

interface TransactionModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (data: CreateTransactionData) => Promise<ITransaction | null>;
  initialType?: ITransaction["type"];
}

interface CategoryOption {
  id: number;
  documentId: string;
  name: string;
  type: "expense" | "income";
  icon?: string;
  color?: string;
}

const TYPE_OPTIONS: { value: ITransaction["type"]; label: string; icon: string; color: string }[] = [
  { value: "expense", label: "Расход", icon: "fa-arrow-up", color: "#f72585" },
  { value: "income", label: "Доход", icon: "fa-arrow-down", color: "#28a745" },
  { value: "transfer", label: "Перевод", icon: "fa-exchange-alt", color: "#4895ef" },
];

const TransactionModal = ({ isOpen, onClose, onSave, initialType }: TransactionModalProps) => {
  const dispatch = useAppDispatch();
  const { accounts } = useAppSelector((state) => state.account);
  const accountsFetched = useRef(false);

  const [type, setType] = useState<ITransaction["type"]>("expense");
  const [amount, setAmount] = useState("");
  const [date, setDate] = useState(new Date().toISOString().split("T")[0]);
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [accountFrom, setAccountFrom] = useState("");
  const [accountTo, setAccountTo] = useState("");
  const [location, setLocation] = useState("");
  const [categories, setCategories] = useState<CategoryOption[]>([]);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!isOpen) return;
    setType(initialType || "expense");
    setAmount("");
    setDate(new Date().toISOString().split("T")[0]);
    setDescription("");
    setCategory("");
    setAccountFrom("");
    setAccountTo("");
    setLocation("");
    setError("");
    setSaving(false);
    if (!accountsFetched.current || accounts.length === 0) {
      dispatch(fetchAccounts());
      accountsFetched.current = true;
    }
    (async () => {
      try {
        const token = localStorage.getItem("jwt");
        const res = await apiClient<{ data: CategoryOption[] }>(
          "categories",
          "GET",
          undefined,
          token ? { Authorization: `Bearer ${token}` } : undefined,
        );
        setCategories(res.data);
      } catch {
        setCategories([]);
      }
    })();
  }, [isOpen]);

  const filteredCategories = categories.filter((c) => c.type === type);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    if (!amount || isNaN(Number(amount)) || Number(amount) <= 0) {
      setError("Введите корректную сумму");
      return;
    }
    if (type !== "transfer" && !category) {
      setError("Выберите категорию");
      return;
    }
    if (!accountFrom) {
      setError("Выберите счёт");
      return;
    }
    if (type === "transfer" && !accountTo) {
      setError("Выберите счёт получателя");
      return;
    }
    setSaving(true);
    const data: CreateTransactionData = {
      amount: Number(amount),
      type,
      date,
      description: description || undefined,
      category: category ? Number(category) : undefined,
      account_from: Number(accountFrom),
      account_to: accountTo ? Number(accountTo) : undefined,
      location: location || undefined,
    };
    const result = await onSave(data);
    setSaving(false);
    if (result) {
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div className={s.overlay} onClick={onClose}>
      <div className={s.modal} onClick={(e) => e.stopPropagation()}>
        <div className={s.modalHeader}>
          <h2>Добавить транзакцию</h2>
          <button className={s.closeBtn} onClick={onClose}>
            <i className="fas fa-times"></i>
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          <div className={s.formBody}>
            <div className={s.field}>
              <label className={s.label}>Тип</label>
              <div className={s.typeGrid}>
                {TYPE_OPTIONS.map((opt) => (
                  <button
                    key={opt.value}
                    type="button"
                    className={`${s.typeBtn} ${type === opt.value ? s.typeBtnActive : ""}`}
                    style={{
                      borderColor: type === opt.value ? opt.color : undefined,
                      backgroundColor: type === opt.value ? `${opt.color}15` : "white",
                    }}
                    onClick={() => setType(opt.value)}
                  >
                    <i className={`fas ${opt.icon}`} style={{ color: opt.color }}></i>
                    <span>{opt.label}</span>
                  </button>
                ))}
              </div>
            </div>

            <div className={s.row}>
              <div className={s.field}>
                <label className={s.label}>Сумма</label>
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

              <div className={s.field}>
                <label className={s.label}>Дата</label>
                <input
                  className={s.input}
                  type="date"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  required
                />
              </div>
            </div>

            {type !== "transfer" && (
              <div className={s.field}>
                <label className={s.label}>Категория</label>
                <select
                  className={s.input}
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                >
                  <option value="">— Выберите категорию —</option>
                  {filteredCategories.map((c) => (
                    <option key={c.id} value={c.id}>
                      {c.name}
                    </option>
                  ))}
                </select>
              </div>
            )}

            <div className={s.field}>
              <label className={s.label}>
                {type === "transfer" ? "Счёт отправителя" : "Счёт"}
              </label>
              <select
                className={s.input}
                value={accountFrom}
                onChange={(e) => setAccountFrom(e.target.value)}
              >
                <option value="">— Выберите счёт —</option>
                {accounts.map((a) => (
                  <option key={a.id} value={a.id}>
                    {a.name} ({a.balance.toLocaleString()} {a.currency})
                  </option>
                ))}
              </select>
            </div>

            {type === "transfer" && (
              <div className={s.field}>
                <label className={s.label}>Счёт получателя</label>
                <select
                  className={s.input}
                  value={accountTo}
                  onChange={(e) => setAccountTo(e.target.value)}
                >
                  <option value="">— Выберите счёт —</option>
                  {accounts
                    .filter((a) => a.id !== Number(accountFrom))
                    .map((a) => (
                      <option key={a.id} value={a.id}>
                        {a.name} ({a.balance.toLocaleString()} {a.currency})
                      </option>
                    ))}
                </select>
              </div>
            )}

            <div className={s.field}>
              <label className={s.label}>Описание</label>
              <textarea
                className={`${s.input} ${s.textarea}`}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Дополнительная информация о транзакции"
                rows={3}
              />
            </div>

            <div className={s.field}>
              <label className={s.label}>Место</label>
              <input
                className={s.input}
                type="text"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                placeholder="Например: Пятёрочка, АЗС"
              />
            </div>

            {error && <div className={s.error}>{error}</div>}
          </div>

          <div className={s.modalFooter}>
            <button type="button" className={s.cancelBtn} onClick={onClose} disabled={saving}>
              Отмена
            </button>
            <button type="submit" className={s.saveBtn} disabled={saving}>
              {saving ? "Сохранение..." : "Добавить"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default TransactionModal;
