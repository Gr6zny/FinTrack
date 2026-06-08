import { useState, useEffect } from "react";
import { useTransactions } from "../hooks/useTransactions";
import { useAccounts } from "../../account/hooks/useAccounts";
import { apiClient } from "../../../store/services/api";
import type { TransactionFilters } from "../type";
import s from "./index.module.css";

interface CategoryItem {
  id: number;
  documentId: string;
  name: string;
  type: "expense" | "income";
  icon?: string;
  color?: string;
}

function getPeriodDates(period: string): Partial<TransactionFilters> {
  const now = new Date();
  switch (period) {
    case "today": {
      const s = now.toISOString().slice(0, 10);
      return { startDate: s, endDate: s };
    }
    case "week": {
      const day = now.getDay();
      const diff = day === 0 ? 6 : day - 1;
      const start = new Date(now);
      start.setDate(now.getDate() - diff);
      const end = new Date(start);
      end.setDate(start.getDate() + 6);
      return {
        startDate: start.toISOString().slice(0, 10),
        endDate: end.toISOString().slice(0, 10),
      };
    }
    case "month": {
      const start = new Date(now.getFullYear(), now.getMonth(), 1);
      const end = new Date(now.getFullYear(), now.getMonth() + 1, 0);
      return {
        startDate: start.toISOString().slice(0, 10),
        endDate: end.toISOString().slice(0, 10),
      };
    }
    default:
      return {};
  }
}

const Filter = () => {
  const { filters, applyFilters, clearFilters, getTransactions } =
    useTransactions();
  const { accounts, getAccounts } = useAccounts();
  const [categories, setCategories] = useState<CategoryItem[]>([]);
  const [period, setPeriod] = useState("all");

  useEffect(() => {
    getAccounts();
    loadCategories();
  }, []);

  const loadCategories = async () => {
    try {
      const token = localStorage.getItem("jwt");
      const res = await apiClient<{ data: CategoryItem[] }>(
        "categories",
        "GET",
        undefined,
        token ? { Authorization: `Bearer ${token}` } : undefined,
      );
      setCategories(res.data);
    } catch {
      setCategories([]);
    }
  };

  const handleChange = (patch: Partial<TransactionFilters>) => {
    const next = { ...filters, ...patch };
    applyFilters(next);
    getTransactions(1, 20, next);
  };

  const handlePeriodChange = (value: string) => {
    setPeriod(value);
    const dates = getPeriodDates(value);
    handleChange(dates);
  };

  const handleReset = () => {
    setPeriod("all");
    clearFilters();
    getTransactions(1, 20, { type: "all" });
  };

  return (
    <div className={s.filterWrapper}>
      <div className={s.filtersSection}>
        <div className={s.filtersTitle}>
          <i className="fas fa-filter"></i>
          <span>Фильтры</span>
        </div>
        <div className={s.filtersGrid}>
          <div className={s.filterGroup}>
            <label className={s.filterLabel}>Тип операции</label>
            <select
              className={s.filterSelect}
              value={filters.type || "all"}
              onChange={(e) =>
                handleChange({
                  type: e.target.value as TransactionFilters["type"],
                })
              }
            >
              <option value="all">Все операции</option>
              <option value="income">Доходы</option>
              <option value="expense">Расходы</option>
              <option value="transfer">Переводы</option>
            </select>
          </div>

          <div className={s.filterGroup}>
            <label className={s.filterLabel}>Категория</label>
            <select
              className={s.filterSelect}
              value={filters.category ?? "all"}
              onChange={(e) =>
                handleChange({
                  category:
                    e.target.value === "all"
                      ? undefined
                      : Number(e.target.value),
                })
              }
            >
              <option value="all">Все категории</option>
              {categories.map((cat) => (
                <option key={cat.id} value={cat.id}>
                  {cat.name}
                </option>
              ))}
            </select>
          </div>

          <div className={s.filterGroup}>
            <label className={s.filterLabel}>Счет</label>
            <select
              className={s.filterSelect}
              value={filters.account ?? "all"}
              onChange={(e) =>
                handleChange({
                  account:
                    e.target.value === "all"
                      ? undefined
                      : Number(e.target.value),
                })
              }
            >
              <option value="all">Все счета</option>
              {accounts.map((acc) => (
                <option key={acc.id} value={acc.id}>
                  {acc.name}
                </option>
              ))}
            </select>
          </div>

          <div className={s.filterGroup}>
            <label className={s.filterLabel}>Период</label>
            <select
              className={s.filterSelect}
              value={period}
              onChange={(e) => handlePeriodChange(e.target.value)}
            >
              <option value="all">Все время</option>
              <option value="today">Сегодня</option>
              <option value="week">Эта неделя</option>
              <option value="month">Этот месяц</option>
            </select>
          </div>

          <div className={s.resetFilters}>
            <button className={s.resetBtn} onClick={handleReset}>
              <i className="fas fa-undo-alt"></i>
              <span>Сбросить</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Filter;
