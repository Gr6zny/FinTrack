import { useState, useEffect } from "react";
import { apiClient } from "../../../store/services/api";
import s from "./index.module.css";

interface CategoryItem {
  id: number;
  documentId: string;
  name: string;
  type: "expense" | "income";
  icon?: string;
  color?: string;
  is_system?: boolean;
}

interface CategoryManageModalProps {
  isOpen: boolean;
  onClose: () => void;
  onChanged: () => void;
}

const EMPTY_FORM = { name: "", type: "expense" as const, icon: "", color: "#4361ee" };
const TYPE_LABELS: Record<string, string> = { expense: "Расход", income: "Доход" };

const CategoryManageModal = ({ isOpen, onClose, onChanged }: CategoryManageModalProps) => {
  const [categories, setCategories] = useState<CategoryItem[]>([]);
  const [form, setForm] = useState(EMPTY_FORM);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!isOpen) return;
    setForm(EMPTY_FORM);
    setEditingId(null);
    setError("");
    loadCategories();
  }, [isOpen]);

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

  const resetForm = () => {
    setForm(EMPTY_FORM);
    setEditingId(null);
    setError("");
  };

  const handleEdit = (cat: CategoryItem) => {
    setForm({ name: cat.name, type: cat.type, icon: cat.icon || "", color: cat.color || "#4361ee" });
    setEditingId(cat.id);
    setError("");
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    if (!form.name.trim()) {
      setError("Введите название категории");
      return;
    }
    setSaving(true);
    try {
      const token = localStorage.getItem("jwt");
      const body = { name: form.name.trim(), type: form.type, icon: form.icon || undefined, color: form.color || undefined };

      if (editingId) {
        await apiClient(`categories/${editingId}`, "PUT", { data: body }, {
          Authorization: `Bearer ${token}`,
        });
      } else {
        await apiClient("categories", "POST", { data: body }, {
          Authorization: `Bearer ${token}`,
        });
      }

      resetForm();
      await loadCategories();
      onChanged();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Ошибка сохранения");
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id: number) => {
    if (!window.confirm("Удалить эту категорию?")) return;
    try {
      const token = localStorage.getItem("jwt");
      await apiClient(`categories/${id}`, "DELETE", undefined, {
        Authorization: `Bearer ${token}`,
      });
      await loadCategories();
      onChanged();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Ошибка удаления");
    }
  };

  if (!isOpen) return null;

  const expenseCats = categories.filter((c) => c.type === "expense");
  const incomeCats = categories.filter((c) => c.type === "income");

  return (
    <div className={s.overlay} onClick={onClose}>
      <div className={s.modal} onClick={(e) => e.stopPropagation()}>
        <div className={s.modalHeader}>
          <h2>Управление категориями</h2>
          <button className={s.closeBtn} onClick={onClose}>
            <i className="fas fa-times"></i>
          </button>
        </div>

        <div className={s.formBody}>
          <form onSubmit={handleSave} className={s.addForm}>
            <div className={s.addFormRow}>
              <input
                className={s.input}
                type="text"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                placeholder="Название категории"
                required
              />
              <select
                className={s.input}
                value={form.type}
                onChange={(e) => setForm({ ...form, type: e.target.value as "expense" | "income" })}
              >
                <option value="expense">Расход</option>
                <option value="income">Доход</option>
              </select>
              <input
                className={s.input}
                type="text"
                value={form.icon}
                onChange={(e) => setForm({ ...form, icon: e.target.value })}
                placeholder="fa-* (опционально)"
              />
              <input
                className={s.colorInput}
                type="color"
                value={form.color}
                onChange={(e) => setForm({ ...form, color: e.target.value })}
              />
              <button type="submit" className={s.saveBtn} disabled={saving}>
                {saving ? "..." : editingId ? "Изменить" : "Добавить"}
              </button>
              {editingId && (
                <button type="button" className={s.cancelBtn} onClick={resetForm}>
                  Отмена
                </button>
              )}
            </div>
            {error && <div className={s.error}>{error}</div>}
          </form>

          <div className={s.categoryGroups}>
            <div className={s.group}>
              <h3 className={s.groupTitle}>
                <span className={s.badgeExpense}></span>
                Расходы
              </h3>
              {expenseCats.length === 0 ? (
                <p className={s.emptyText}>Нет категорий расходов</p>
              ) : (
                <div className={s.categoryList}>
                  {expenseCats.map((cat) => (
                    <div key={cat.id} className={s.categoryItem}>
                      <span className={s.catIcon} style={{ backgroundColor: cat.color || "#e63946" }}>
                        <i className={`fas ${cat.icon || "fa-tag"}`}></i>
                      </span>
                      <span className={s.catName}>{cat.name}</span>
                      <div className={s.catActions}>
                        <button className={s.actionBtn} title="Редактировать" onClick={() => handleEdit(cat)}>
                          <i className="fas fa-pen"></i>
                        </button>
                        <button className={s.actionBtn} title="Удалить" onClick={() => handleDelete(cat.id)}>
                          <i className="fas fa-trash"></i>
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div className={s.group}>
              <h3 className={s.groupTitle}>
                <span className={s.badgeIncome}></span>
                Доходы
              </h3>
              {incomeCats.length === 0 ? (
                <p className={s.emptyText}>Нет категорий доходов</p>
              ) : (
                <div className={s.categoryList}>
                  {incomeCats.map((cat) => (
                    <div key={cat.id} className={s.categoryItem}>
                      <span className={s.catIcon} style={{ backgroundColor: cat.color || "#28a745" }}>
                        <i className={`fas ${cat.icon || "fa-tag"}`}></i>
                      </span>
                      <span className={s.catName}>{cat.name}</span>
                      <div className={s.catActions}>
                        <button className={s.actionBtn} title="Редактировать" onClick={() => handleEdit(cat)}>
                          <i className="fas fa-pen"></i>
                        </button>
                        <button className={s.actionBtn} title="Удалить" onClick={() => handleDelete(cat.id)}>
                          <i className="fas fa-trash"></i>
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CategoryManageModal;
