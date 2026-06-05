import { createAsyncThunk } from "@reduxjs/toolkit";
import { apiClient } from "../../store/services/api";
import { CreateBudgetData, IBudget } from "./type";

export const fetchBudgets = createAsyncThunk<
  { data: IBudget[]; meta: { pagination: { total: number } } },
  void,
  { rejectValue: string }
>("budget/fetchAll", async (_, { rejectWithValue }) => {
  try {
    const token = localStorage.getItem("jwt");

    const response = await apiClient<{
      data: IBudget[];
      meta: { pagination: { total: number } };
    }>(`budgets?populate=*`, "GET", undefined, {
      Authorization: `Bearer ${token}`,
    });

    return response;
  } catch (error) {
    return rejectWithValue(
      error instanceof Error ? error.message : "Ошибка получения бюджетов",
    );
  }
});

export const fetchBudgetById = createAsyncThunk<
  IBudget,
  number,
  { rejectValue: string }
>("budget/fetchById", async (id, { rejectWithValue }) => {
  try {
    const token = localStorage.getItem("jwt");
    const response = await apiClient<{ data: IBudget }>(
      `budgets/${id}?populate=*`,
      "GET",
      undefined,
      { Authorization: `Bearer ${token}` },
    );
    return response.data;
  } catch (error) {
    return rejectWithValue(
      error instanceof Error ? error.message : "Ошибка получения бюджета",
    );
  }
});

export const createBudget = createAsyncThunk<
  IBudget,
  CreateBudgetData,
  { rejectValue: string }
>("budget/create", async (data, { rejectWithValue }) => {
  try {
    const token = localStorage.getItem("jwt");

    const response = await apiClient<
      { data: IBudget },
      { data: CreateBudgetData }
    >("budgets", "POST", { data }, {
      Authorization: `Bearer ${token}`,
    });
    return response.data;
  } catch (error) {
    return rejectWithValue(
      error instanceof Error ? error.message : "Ошибка создания бюджета",
    );
  }
});

export const updateBudget = createAsyncThunk<
  IBudget,
  { id: number; data: Partial<CreateBudgetData> },
  { rejectValue: string }
>("budget/update", async ({ id, data }, { rejectWithValue }) => {
  try {
    const token = localStorage.getItem("jwt");
    const response = await apiClient<
      { data: IBudget },
      { data: Partial<CreateBudgetData> }
    >(`budgets/${id}`, "PUT", { data }, {
      Authorization: `Bearer ${token}`,
    });
    return response.data;
  } catch (error) {
    return rejectWithValue(
      error instanceof Error ? error.message : "Ошибка обновления бюджета",
    );
  }
});

export const deleteBudget = createAsyncThunk<
  number,
  number,
  { rejectValue: string }
>("budget/delete", async (id, { rejectWithValue }) => {
  try {
    const token = localStorage.getItem("jwt");
    await apiClient(`budgets/${id}`, "DELETE", undefined, {
      Authorization: `Bearer ${token}`,
    });
    return id;
  } catch (error) {
    return rejectWithValue(
      error instanceof Error ? error.message : "Ошибка удаления бюджета",
    );
  }
});
