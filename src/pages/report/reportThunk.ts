import { createAsyncThunk } from "@reduxjs/toolkit";
import { apiClient } from "../../store/services/api";
import { ITransaction } from "../transaction/type";
import { IAccount } from "../account/type";
import { MonthlyData, CategoryExpense } from "./type";

export const fetchReportData = createAsyncThunk<
  {
    monthlyData: MonthlyData[];
    categoryExpenses: CategoryExpense[];
    totalIncome: number;
    totalExpense: number;
    netBalance: number;
  },
  { year: number },
  { rejectValue: string }
>("report/fetchData", async ({ year }, { rejectWithValue }) => {
  try {
    const token = localStorage.getItem("jwt");

    const startDate = `${year}-01-01`;
    const endDate = `${year}-12-31`;

    const [transactionsRes, accountsRes] = await Promise.all([
      apiClient<{ data: ITransaction[] }>(
        `transactions?filters[date][$gte]=${startDate}&filters[date][$lte]=${endDate}&populate=*&pagination[pageSize]=1000`,
        "GET",
        undefined,
        { Authorization: `Bearer ${token}` },
      ),
      apiClient<{ data: IAccount[] }>(
        `accounts`,
        "GET",
        undefined,
        { Authorization: `Bearer ${token}` },
      ),
    ]);

    const transactions = transactionsRes.data;
    const accounts = accountsRes.data;

    const monthlyData: MonthlyData[] = [];
    const categoryMap: Record<string, { value: number; color: string; icon: string }> = {};
    let totalIncome = 0;
    let totalExpense = 0;

    for (let m = 0; m < 12; m++) {
      const monthStr = String(m + 1).padStart(2, "0");
      const monthTransactions = transactions.filter((t) => {
        const d = new Date(t.date);
        return d.getMonth() === m;
      });

      const income = monthTransactions
        .filter((t) => t.type === "income")
        .reduce((sum, t) => sum + t.amount, 0);
      const expense = monthTransactions
        .filter((t) => t.type === "expense")
        .reduce((sum, t) => sum + t.amount, 0);

      monthlyData.push({
        month: monthStr,
        income,
        expense,
        balance: income - expense,
      });

      totalIncome += income;
      totalExpense += expense;
    }

    transactions
      .filter((t) => t.type === "expense")
      .forEach((t) => {
        const name = t.category?.name || "Без категории";
        const color = t.category?.color || "#6c757d";
        const icon = t.category?.icon || "fa-question";
        if (!categoryMap[name]) {
          categoryMap[name] = { value: 0, color, icon };
        }
        categoryMap[name].value += t.amount;
      });

    const categoryExpenses: CategoryExpense[] = Object.entries(categoryMap)
      .map(([name, data]) => ({ name, ...data }))
      .sort((a, b) => b.value - a.value);

    const accountBalance = accounts.reduce((sum, a) => sum + a.balance, 0);

    return {
      monthlyData,
      categoryExpenses,
      totalIncome,
      totalExpense,
      netBalance: accountBalance,
    };
  } catch (error) {
    return rejectWithValue(
      error instanceof Error ? error.message : "Ошибка получения отчёта",
    );
  }
});
