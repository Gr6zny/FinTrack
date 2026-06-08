import { useEffect, useState, useCallback } from "react";
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend,
  PieChart, Pie, Cell, ResponsiveContainer,
  AreaChart, Area,
} from "recharts";
import { useReports } from "./hooks/useReports";
import s from "./index.module.css";

const COLORS = [
  "#4361ee", "#7209b7", "#f72585", "#4cc9f0", "#f8961e",
  "#06d6a0", "#118ab2", "#ef476f", "#ffd166", "#073b4c",
  "#8ecae6", "#219ebc", "#ffb703", "#fb8500", "#6c757d",
];

const MONTH_LABELS = [
  "Янв", "Фев", "Мар", "Апр", "Май", "Июн",
  "Июл", "Авг", "Сен", "Окт", "Ноя", "Дек",
];

const CustomTooltip = ({ active, payload, label }: any) => {
  if (!active || !payload?.length) return null;
  return (
    <div style={{
      background: "var(--bg-card)",
      border: "1px solid var(--border-color)",
      borderRadius: 8,
      padding: "10px 14px",
      boxShadow: "var(--shadow-lg)",
    }}>
      <p style={{ fontWeight: 600, marginBottom: 4, color: "var(--text-primary)" }}>{label}</p>
      {payload.map((entry: any, i: number) => (
        <p key={i} style={{ color: entry.color, fontSize: "0.9rem" }}>
          {entry.name}: {entry.value.toLocaleString()} ₽
        </p>
      ))}
    </div>
  );
};

const formatCurrency = (amount: number) =>
  new Intl.NumberFormat("ru-RU").format(Math.round(amount)) + " ₽";

const Report = () => {
  const {
    loading,
    monthlyData,
    categoryExpenses,
    totalIncome,
    totalExpense,
    netBalance,
    loadReport,
  } = useReports();

  const currentYear = new Date().getFullYear();
  const [year, setYear] = useState(currentYear);

  useEffect(() => {
    loadReport(year);
  }, [year, loadReport]);

  const handlePrevYear = useCallback(() => setYear((y) => y - 1), []);
  const handleNextYear = useCallback(() => setYear((y) => y + 1), []);

  const savingsRate = totalIncome > 0
    ? ((totalIncome - totalExpense) / totalIncome * 100)
    : 0;

  const pieData = categoryExpenses.slice(0, 10);

  const balanceData = monthlyData.map((d, i) => ({
    label: MONTH_LABELS[i],
    income: d.income,
    expense: d.expense,
    balance: d.balance,
  }));

  const topCategories = categoryExpenses.slice(0, 8);

  return (
    <div className="container">
      <div className={s.pageHeader}>
        <div>
          <h1 className={s.pageTitle}>Отчёты</h1>
          <p className={s.pageSubtitle}>
            Анализ доходов и расходов за {year} год
          </p>
        </div>
        <div className={s.yearSelector}>
          <div className={s.yearNav}>
            <button className={s.yearBtn} onClick={handlePrevYear}>
              <i className="fas fa-chevron-left"></i>
            </button>
            <span className={s.yearLabel}>{year}</span>
            <button
              className={s.yearBtn}
              onClick={handleNextYear}
              disabled={year >= currentYear}
            >
              <i className="fas fa-chevron-right"></i>
            </button>
          </div>
        </div>
      </div>

      {loading ? (
        <div className={s.loadingState}>
          <i className="fas fa-spinner fa-spin"></i>
          <span>Загрузка отчёта...</span>
        </div>
      ) : monthlyData.length === 0 ? (
        <div className={s.noData}>
          <i className="fas fa-chart-bar"></i>
          <h3>Нет данных за {year} год</h3>
          <p>Добавьте транзакции, чтобы увидеть отчёты</p>
        </div>
      ) : (
        <>
          <div className={s.statsCards}>
            <div className={s.statCard}>
              <div
                className={s.statIcon}
                style={{ background: "rgba(67, 97, 238, 0.1)", color: "#4361ee" }}
              >
                <i className="fas fa-wallet"></i>
              </div>
              <div className={s.statLabel}>Чистый баланс</div>
              <div className={s.statValue}>{formatCurrency(netBalance)}</div>
              <div className={s.statSub}>По всем счетам</div>
            </div>

            <div className={s.statCard}>
              <div
                className={s.statIcon}
                style={{ background: "rgba(76, 201, 240, 0.15)", color: "#4cc9f0" }}
              >
                <i className="fas fa-arrow-down"></i>
              </div>
              <div className={s.statLabel}>Всего доходов</div>
              <div className={s.statValue}>{formatCurrency(totalIncome)}</div>
              <div className={s.statSub}>За {year} год</div>
            </div>

            <div className={s.statCard}>
              <div
                className={s.statIcon}
                style={{ background: "rgba(247, 37, 133, 0.1)", color: "#f72585" }}
              >
                <i className="fas fa-arrow-up"></i>
              </div>
              <div className={s.statLabel}>Всего расходов</div>
              <div className={s.statValue}>{formatCurrency(totalExpense)}</div>
              <div className={s.statSub}>За {year} год</div>
            </div>

            <div className={s.statCard}>
              <div
                className={s.statIcon}
                style={{ background: "rgba(6, 214, 160, 0.15)", color: "#06d6a0" }}
              >
                <i className="fas fa-piggy-bank"></i>
              </div>
              <div className={s.statLabel}>Сбережения</div>
              <div className={s.statValue}>{formatCurrency(totalIncome - totalExpense)}</div>
              <div className={s.statSub}>
                {savingsRate >= 0 ? "+" : ""}{savingsRate.toFixed(1)}% от доходов
              </div>
            </div>
          </div>

          <div className={s.chartsGrid}>
            <div className={`${s.chartCard} ${s.chartCardFull}`}>
              <div className={s.chartTitle}>
                <i className="fas fa-chart-line"></i>
                Доходы и расходы по месяцам
              </div>
              <div className={s.chartContainer}>
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={balanceData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="var(--border-color)" />
                    <XAxis
                      dataKey="label"
                      tick={{ fill: "var(--text-secondary)", fontSize: 12 }}
                      axisLine={{ stroke: "var(--border-color)" }}
                    />
                    <YAxis
                      tick={{ fill: "var(--text-secondary)", fontSize: 12 }}
                      axisLine={{ stroke: "var(--border-color)" }}
                      tickFormatter={(v) => `${(v / 1000).toFixed(0)}k`}
                    />
                    <Tooltip content={<CustomTooltip />} />
                    <Legend />
                    <Bar
                      dataKey="income"
                      name="Доходы"
                      fill="#4cc9f0"
                      radius={[4, 4, 0, 0]}
                    />
                    <Bar
                      dataKey="expense"
                      name="Расходы"
                      fill="#f72585"
                      radius={[4, 4, 0, 0]}
                    />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>

            <div className={s.chartCard}>
              <div className={s.chartTitle}>
                <i className="fas fa-chart-pie"></i>
                Расходы по категориям
              </div>
              <div className={s.chartContainer}>
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={pieData}
                      dataKey="value"
                      nameKey="name"
                      cx="50%"
                      cy="50%"
                      outerRadius={100}
                      innerRadius={50}
                      label={({ name, percent }: any) =>
                        `${name || ""} ${((percent || 0) * 100).toFixed(0)}%`
                      }
                      labelLine={false}
                    >
                      {pieData.map((_, i) => (
                        <Cell
                          key={i}
                          fill={COLORS[i % COLORS.length]}
                        />
                      ))}
                    </Pie>
                    <Tooltip content={<CustomTooltip />} />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </div>

            <div className={s.chartCard}>
              <div className={s.chartTitle}>
                <i className="fas fa-chart-area"></i>
                Динамика баланса
              </div>
              <div className={s.chartContainer}>
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={balanceData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="var(--border-color)" />
                    <XAxis
                      dataKey="label"
                      tick={{ fill: "var(--text-secondary)", fontSize: 12 }}
                      axisLine={{ stroke: "var(--border-color)" }}
                    />
                    <YAxis
                      tick={{ fill: "var(--text-secondary)", fontSize: 12 }}
                      axisLine={{ stroke: "var(--border-color)" }}
                      tickFormatter={(v) => `${(v / 1000).toFixed(0)}k`}
                    />
                    <Tooltip content={<CustomTooltip />} />
                    <Area
                      type="monotone"
                      dataKey="balance"
                      name="Баланс"
                      stroke="#4361ee"
                      fill="#4361ee"
                      fillOpacity={0.15}
                      strokeWidth={2}
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </div>

            <div className={`${s.chartCard} ${s.chartCardFull}`}>
              <div className={s.chartTitle}>
                <i className="fas fa-ranking-star"></i>
                Топ категорий расходов
              </div>
              <div className={s.chartContainer}>
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={topCategories}
                    layout="vertical"
                    margin={{ top: 5, right: 30, left: 100, bottom: 5 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" stroke="var(--border-color)" />
                    <XAxis
                      type="number"
                      tick={{ fill: "var(--text-secondary)", fontSize: 12 }}
                      axisLine={{ stroke: "var(--border-color)" }}
                      tickFormatter={(v) => `${(v / 1000).toFixed(0)}k`}
                    />
                    <YAxis
                      type="category"
                      dataKey="name"
                      tick={{ fill: "var(--text-secondary)", fontSize: 12 }}
                      axisLine={{ stroke: "var(--border-color)" }}
                      width={90}
                    />
                    <Tooltip content={<CustomTooltip />} />
                    <Bar
                      dataKey="value"
                      name="Сумма"
                      radius={[0, 4, 4, 0]}
                    >
                      {topCategories.map((_, i) => (
                        <Cell key={i} fill={COLORS[i % COLORS.length]} />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Report;
