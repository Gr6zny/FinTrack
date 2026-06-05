import { createAsyncThunk } from "@reduxjs/toolkit";
import { apiClient } from "../../store/services/api";
import {
  CreateTransactionData,
  ITransaction,
  TransactionFilters,
} from "./type";

export const fetchTransactions = createAsyncThunk<
  { data: ITransaction[]; meta: { pagination: { total: number } } },
  | { page?: number; pageSize?: number; filters?: TransactionFilters }
  | undefined,
  { rejectValue: string }
>("transaction/fetchAll", async (params, { rejectWithValue }) => {
  try {
    const token = localStorage.getItem("jwt");

    let url = `transactions?`;

    if (params?.filters) {
      const { type, category, account, startDate, endDate } = params.filters;

      if (type && type !== "all") {
        url += `filters[type][$eq]=${type}&`;
      }
      if (category) {
        url += `filters[category][id][$eq]=${category}&`;
      }
      if (account) {
        url += `filters[account_from][id][$eq]=${account}&`;
      }
      if (startDate) {
        url += `filters[date][$gte]=${startDate}&`;
      }
      if (endDate) {
        url += `filters[date][$lte]=${endDate}&`;
      }
    }

    const response = await apiClient<{
      data: ITransaction[];
      meta: { pagination: { total: number } };
    }>(url, "GET", undefined, { Authorization: `Bearer ${token}` });

    console.log(response);

    return response;
  } catch (error) {
    return rejectWithValue(
      error instanceof Error ? error.message : "Ошибка получения транзакций",
    );
  }
});

// Получение одной транзакции
export const fetchTransactionById = createAsyncThunk<
  ITransaction,
  number,
  { rejectValue: string }
>("transaction/fetchById", async (id, { rejectWithValue }) => {
  try {
    const token = localStorage.getItem("jwt");
    const response = await apiClient<{ data: ITransaction }>(
      `transactions/${id}?populate=*`,
      "GET",
      undefined,
      { Authorization: `Bearer ${token}` },
    );
    return response.data;
  } catch (error) {
    return rejectWithValue(
      error instanceof Error ? error.message : "Ошибка получения транзакции",
    );
  }
});

// Создание транзакции
export const createTransaction = createAsyncThunk<
  ITransaction,
  CreateTransactionData,
  { rejectValue: string }
>("transaction/create", async (data, { rejectWithValue }) => {
  try {
    const token = localStorage.getItem("jwt");
    const response = await apiClient<{ data: ITransaction }, { data: CreateTransactionData }>(
      "transactions",
      "POST",
      { data },
      { Authorization: `Bearer ${token}` },
    );
    return response.data;
  } catch (error) {
    return rejectWithValue(
      error instanceof Error ? error.message : "Ошибка создания транзакции",
    );
  }
});

// Обновление транзакции
export const updateTransaction = createAsyncThunk<
  ITransaction,
  { id: number; data: Partial<CreateTransactionData> },
  { rejectValue: string }
>("transaction/update", async ({ id, data }, { rejectWithValue }) => {
  try {
    const token = localStorage.getItem("jwt");
    const response = await apiClient<
      { data: ITransaction },
      { data: Partial<CreateTransactionData> }
    >(
      `transactions/${id}`,
      "PUT",
      { data },
      { Authorization: `Bearer ${token}` },
    );
    return response.data;
  } catch (error) {
    return rejectWithValue(
      error instanceof Error ? error.message : "Ошибка обновления транзакции",
    );
  }
});

// Удаление транзакции
export const deleteTransaction = createAsyncThunk<
  number,
  number,
  { rejectValue: string }
>("transaction/delete", async (id, { rejectWithValue }) => {
  try {
    const token = localStorage.getItem("jwt");
    await apiClient(`transactions/${id}`, "DELETE", undefined, {
      Authorization: `Bearer ${token}`,
    });
    return id;
  } catch (error) {
    return rejectWithValue(
      error instanceof Error ? error.message : "Ошибка удаления транзакции",
    );
  }
});

// Получение статистики по транзакциям
export const fetchTransactionStats = createAsyncThunk<
  {
    totalIncome: number;
    totalExpense: number;
    balance: number;
    categoryStats: Record<string, number>;
  },
  { startDate: string; endDate: string },
  { rejectValue: string }
>("transaction/stats", async ({ startDate, endDate }, { rejectWithValue }) => {
  try {
    const token = localStorage.getItem("jwt");

    const response = await apiClient<{ data: ITransaction[] }>(
      `transactions?filters[date][$gte]=${startDate}&filters[date][$lte]=${endDate}&populate=*`,
      "GET",
      undefined,
      { Authorization: `Bearer ${token}` },
    );

    const transactions = response.data;
    let totalIncome = 0;
    let totalExpense = 0;
    const categoryStats: Record<string, number> = {};

    transactions.forEach((item) => {
      const amount = item.amount;
      const type = item.type;
      const categoryName = item.category?.name || "Без категории";

      if (type === "income") {
        totalIncome += amount;
      } else if (type === "expense") {
        totalExpense += amount;
        categoryStats[categoryName] =
          (categoryStats[categoryName] || 0) + amount;
      }
    });

    return {
      totalIncome,
      totalExpense,
      balance: totalIncome - totalExpense,
      categoryStats,
    };
  } catch (error) {
    return rejectWithValue(
      error instanceof Error ? error.message : "Ошибка получения статистики",
    );
  }
});
