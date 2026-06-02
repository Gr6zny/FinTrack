import { useState, useEffect } from "react";
import { IAccount, ACCOUNT_TYPES, ACCOUNT_CURRENCIES, ACCOUNT_ICONS } from "../type";
import s from "./index.module.css";

interface AccountModalProps {
  isOpen: boolean;
  account: IAccount | null;
  onClose: () => void;
  onSave: (data: {
    name: string;
    type: "cash" | "bank_card" | "credit_card" | "digital" | "savings" | "investment";
    balance: number;
    currency: string;
    icon: string;
    color: string;
    is_active: boolean;
  }) => void;
}

const TYPE_COLORS: Record<string, string> = {
  cash: "#28a745",
  bank_card: "#4361ee",
  credit_card: "#f72585",
  digital: "#4cc9f0",
  savings: "#f8961e",
  investment: "#3a0ca3",
};

const AccountModal = ({ isOpen, account, onClose, onSave }: AccountModalProps) => {
  const [name, setName] = useState("");
  const [type, setType] = useState<"cash" | "bank_card" | "credit_card" | "digital" | "savings" | "investment">("bank_card");
  const [balance, setBalance] = useState<number>(0);
  const [currency, setCurrency] = useState("RUB");
  const [color, setColor] = useState(TYPE_COLORS.bank_card);
  const [icon, setIcon] = useState(ACCOUNT_ICONS.bank_card);
  const [is_active, setIsActive] = useState(true);

  useEffect(() => {
    if (account) {
      setName(account.name);
      setType(account.type);
      setBalance(account.balance);
      setCurrency(account.currency);
      setColor(account.color);
      setIcon(account.icon);
      setIsActive(account.is_active);
    } else {
      setName("");
      setType("bank_card");
      setBalance(0);
      setCurrency("RUB");
      setColor(TYPE_COLORS.bank_card);
      setIcon(ACCOUNT_ICONS.bank_card);
      setIsActive(true);
    }
  }, [account, isOpen]);

  const handleTypeChange = (newType: "cash" | "bank_card" | "credit_card" | "digital" | "savings" | "investment") => {
    setType(newType);
    setColor(TYPE_COLORS[newType]);
    setIcon(ACCOUNT_ICONS[newType]);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave({ name, type, balance, currency, icon, color, is_active });
  };

  if (!isOpen) return null;

  return (
    <div className={s.overlay} onClick={onClose}>
      <div className={s.modal} onClick={(e) => e.stopPropagation()}>
        <div className={s.modalHeader}>
          <h2>{account ? "Редактировать счет" : "Добавить счет"}</h2>
          <button className={s.closeBtn} onClick={onClose}>
            <i className="fas fa-times"></i>
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          <div className={s.formBody}>
            <div className={s.field}>
              <label className={s.label}>Название счета</label>
              <input
                className={s.input}
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Например: Тинькофф Black"
                required
              />
            </div>

            <div className={s.field}>
              <label className={s.label}>Тип счета</label>
              <div className={s.typeGrid}>
                {Object.entries(ACCOUNT_TYPES).map(([key, label]) => (
                  <button
                    key={key}
                    type="button"
                    className={`${s.typeBtn} ${type === key ? s.typeBtnActive : ""}`}
                    style={{
                      borderColor: type === key ? TYPE_COLORS[key] : undefined,
                      backgroundColor: type === key ? `${TYPE_COLORS[key]}15` : undefined,
                    }}
                    onClick={() => handleTypeChange(key as "cash" | "bank_card" | "credit_card" | "digital" | "savings" | "investment")}
                  >
                    <i
                      className={`fas ${ACCOUNT_ICONS[key]}`}
                      style={{ color: TYPE_COLORS[key] }}
                    ></i>
                    <span>{label}</span>
                  </button>
                ))}
              </div>
            </div>

            <div className={s.row}>
              <div className={s.field}>
                <label className={s.label}>Баланс</label>
                <input
                  className={s.input}
                  type="number"
                  value={balance}
                  onChange={(e) => setBalance(Number(e.target.value))}
                  placeholder="0"
                  required
                />
              </div>

              <div className={s.field}>
                <label className={s.label}>Валюта</label>
                <select
                  className={s.input}
                  value={currency}
                  onChange={(e) => setCurrency(e.target.value)}
                >
                  {ACCOUNT_CURRENCIES.map((c) => (
                    <option key={c} value={c}>{c}</option>
                  ))}
                </select>
              </div>
            </div>

            <div className={s.field}>
              <label className={s.label}>
                <input
                  type="checkbox"
                  checked={is_active}
                  onChange={(e) => setIsActive(e.target.checked)}
                  className={s.checkbox}
                />
                <span>Счет активен</span>
              </label>
            </div>
          </div>

          <div className={s.modalFooter}>
            <button type="button" className={s.cancelBtn} onClick={onClose}>
              Отмена
            </button>
            <button type="submit" className={s.saveBtn}>
              {account ? "Сохранить" : "Добавить"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AccountModal;
