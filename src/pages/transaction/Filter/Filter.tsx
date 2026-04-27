import s from "./index.module.css";

const Filter = () => {
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
            <select className={s.filterSelect} id="filterType">
              <option value="all">Все операции</option>
              <option value="income">Доходы</option>
              <option value="expense">Расходы</option>
              <option value="transfer">Переводы</option>
            </select>
          </div>
          <div className={s.filterGroup}>
            <label className={s.filterLabel}>Категория</label>
            <select className={s.filterSelect} id="filterCategory">
              <option value="all">Все категории</option>
              <option value="food">Продукты</option>
              <option value="transport">Транспорт</option>
              <option value="entertainment">Развлечения</option>
              <option value="salary">Зарплата</option>
              <option value="utilities">Коммунальные</option>
            </select>
          </div>
          <div className={s.filterGroup}>
            <label className={s.filterLabel}>Счет</label>
            <select className={s.filterSelect} id="filterAccount">
              <option value="all">Все счета</option>
              <option value="tinkoff">Тинькофф Black</option>
              <option value="cash">Наличные</option>
              <option value="sber">Сбербанк</option>
            </select>
          </div>
          <div className={s.filterGroup}>
            <label className={s.filterLabel}>Период</label>
            <select className={s.filterSelect} id="filterPeriod">
              <option value="all">Все время</option>
              <option value="today">Сегодня</option>
              <option value="week">Эта неделя</option>
              <option value="month">Этот месяц</option>
            </select>
          </div>
          <div className={s.resetFilters}>
            <button className={s.resetBtn}>
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
